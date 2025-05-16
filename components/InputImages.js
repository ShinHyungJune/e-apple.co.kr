import React, {useState, useRef, useEffect} from 'react';

const InputImages = ({
                         comment=null,
                         defaultValue = [], // 초기값
                         required = true, // 필수여부
                         multiple = false, // 여러개 파일첨부 가능여부
                         id = 'imgs', // label for와 input id에 들어갈 값
                         onlyShow = false, // 보여주기용 여부 (보여주기용은 삭제나 첨부를 못하고 이미지만 나열됨)
                         canRemove = true, // 삭제가능여부
                         max = 10, // 최대개수
                         maxWidth = 1920, // 최대넓이 (1920px가 넘는 이미지가 들어오면 리사이징됨)
                         onChange, // 파일변경 원할 시 할일
                         onRemove, // 파일삭제처리 원할 시 할일
                     }) => {

    const [files, setFiles] = useState([]);
    const [countCall, setCountCall] = useState(0);
    const [defaultFiles, setDefaultFiles] = useState(defaultValue);
    const [removeIds, setRemoveIds] = useState([]);
    const inputRef = useRef(null);
    const [target, setTarget] = useState(null);

    const change = (event) => {

        const selectedFiles = Array.from(event.target.files);

        event.target.value = null;

        let newFiles = [...files];

        // 파일첨부 최대개수 검사
        if (max && selectedFiles.length > max) {
            alert(`최대 ${max}개의 파일만 업로드할 수 있습니다.`);
            return;
        }

        const readers = [];
        const images = [];

        let countResize = 0;

        // 여러개 첨부 허용한게 아니라면 파일 첨부할 때마다 기존 목록 초기화
        if(!multiple)
            setDefaultFiles([]);

        selectedFiles.forEach((file, index) => {

            const reader = new FileReader();
            const image = new Image();

            readers.push(reader);
            images.push(image);

            readers[index].readAsDataURL(file);

            readers[index].onload = (readerEvent) => {
                images[index].onload = () => {
                    const result = resizeImage(image);

                    // 여러개 첨부 허용한게 아니라면 파일 첨부할 때마다 기존 목록 초기화
                    if(!multiple)
                        newFiles = [{
                            name: result.name,
                            file: result,
                            url: URL.createObjectURL(result),
                        }];

                    if(multiple)
                        newFiles = [...newFiles, {
                            name: result.name,
                            file: result,
                            url: URL.createObjectURL(result),
                        }];

                    countResize++;

                    if (countResize === selectedFiles.length) {
                        setFiles(newFiles);

                        onChange(newFiles);
                    }

                    return result;
                };
                image.src = readerEvent.target.result;
            };
        });
    };
    const remove = (file, index) => {
        if (file.id) {
            defaultFiles.splice(index, 1);
            setDefaultFiles(defaultFiles);

            removeIds.push(file.id);
            setRemoveIds(removeIds);

            return onRemove(removeIds);
        }

        files.splice(index, 1);
        setFiles(files);
        onChange(files);
    };

    const resizeImage = (image) => {
        let width = image.width;
        let height = image.height;

        if (width > maxWidth) {
            height = (maxWidth / width) * height;
            width = maxWidth;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        canvas.getContext('2d').drawImage(image, 0, 0, width, height);

        const dataUrl = canvas.toDataURL('image/png');
        return dataURLToBlob(dataUrl);
    };

    const dataURLToBlob = (dataURI) => {
        const byteString = atob(dataURI.split(',')[1]);
        const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);

        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        return new Blob([ab], { type: mimeString });
    };

    useEffect(() => {
        // 왜인지 모르겠는데 자꾸 onRemove 일어나면 defaultValue가 갱신된걸로 인식해서 defaultFile 삭제가 안됨. 일단 임시방편처리
        setCountCall(countCall + 1);

        if(countCall <= 2)
            setDefaultFiles([...defaultValue]);
    }, [defaultValue]);


    return (
        <>
            <div className="m-input-images type01">
                {!onlyShow && (
                    <div className="m-input">
                        <input
                            type="file"
                            id={id}
                            ref={inputRef}
                            onChange={change}
                            accept="image/*"
                            multiple={multiple}
                            style={{ display: 'none' }}
                        />
                        <label htmlFor={id} className="m-btn">
                            <i className="xi-plus" />
                            사진 등록
                        </label>

                        <p className="m-comment">{comment}</p>
                    </div>
                )}

                {(defaultFiles.length > 0 || files.length > 0) && (
                    <div className="m-files-wrap">
                        <div className="m-files">
                            {defaultFiles.map((file, index) => (
                                <div className="m-file-wrap" key={`default-${index}`}>
                                    <div className="m-file" style={{ backgroundImage: `url(${file?.url})`}} onClick={() => setTarget(file)}
                                    >
                                        {!onlyShow && canRemove && (
                                            <button className="m-btn-remove" onClick={(e) => {e.stopPropagation(); remove(file, index)}} type="button">
                                                <i className="xi-trash-o" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {files.map((file, index) => (
                                <div className="m-file-wrap" key={`uploaded-${index}`}>
                                    <div className="m-file" style={{ backgroundImage: `url(${file.url})` }} onClick={() => setTarget(file)}>
                                        {!onlyShow && canRemove && (
                                            <button className="m-btn-remove" onClick={(e) => {e.stopPropagation(); remove(file, index)}} type="button">
                                                <i className="xi-trash-o" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {target &&
                <div className="m-input-image-detail">
                    <div className="m-input-image-detail-base" onClick={() => setTarget(null)}></div>
                    <div className="m-input-image-detail-inner">
                        <button className="m-input-image-detail-btn" onClick={() => setTarget(null)}>
                            <i className="xi-close"></i>
                        </button>

                        <img src={target.url} alt="" style={{width:'auto', height:'auto'}}/>
                    </div>
                </div>
            }
        </>
    );
};

export default InputImages;