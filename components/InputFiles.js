import React, { useState, useRef, useEffect } from 'react';

const InputFiles = ({
  defaultValue = [], // 초기값
  required = true, // 필수 여부
  multiple = false, // 여러 개 파일 첨부 가능 여부
  id = 'files', // label for와 input id에 들어갈 값
  onlyShow = false, // 보여주기용 여부 (보여주기용은 삭제나 첨부를 못 하고 파일명만 나열됨)
  canRemove = true, // 삭제 가능 여부
  max = 10, // 최대 개수
  onChange, // 파일 변경 시 호출할 함수
  onRemove, // 파일 삭제 시 호출할 함수
}) => {
  const [files, setFiles] = useState([]); // 새로 추가된 파일
  const [defaultFiles, setDefaultFiles] = useState(defaultValue); // 초기값 파일
  const [removeIds, setRemoveIds] = useState([]); // 삭제할 파일의 ID 목록
  const inputRef = useRef(null);

  // 파일 변경 시 처리
  const change = (event) => {
    const selectedFiles = Array.from(event.target.files);

    let newFiles;
    if (!multiple) {
      // 여러 개 파일을 허용하지 않을 때는 기존 파일을 초기화하고 새 파일로 설정
      newFiles = selectedFiles.map((file) => ({
        name: file.name,
        file,
        url: URL.createObjectURL(file),
      }));
      setFiles(newFiles); // 새 파일로 상태 업데이트
      onChange(newFiles); // 부모 컴포넌트로 전달
    } else {
      // 여러 개 파일을 허용할 때는 기존 파일에 새로 추가
      newFiles = selectedFiles.map((file) => ({
        name: file.name,
        file,
        url: URL.createObjectURL(file),
      }));
      const updatedFiles = [...files, ...newFiles]; // 기존 파일에 새 파일 추가
      setFiles(updatedFiles);
      onChange([...defaultFiles, ...updatedFiles]); // 전체 파일 목록 전달
    }
  };

  // 파일 삭제 시 처리
  const remove = (file, index) => {
    if (file.id) {
      // 서버에 저장된 파일일 경우
      const updatedDefaultFiles = [...defaultFiles];
      updatedDefaultFiles.splice(index, 1); // 파일 제거
      setDefaultFiles(updatedDefaultFiles); // 상태 업데이트

      const updatedRemoveIds = [...removeIds, file.id]; // 삭제할 파일 ID 목록에 추가
      setRemoveIds(updatedRemoveIds);
      onRemove(updatedRemoveIds); // 부모 컴포넌트로 삭제된 파일 ID 전달
    } else {
      // 새로 추가된 파일일 경우
      const updatedFiles = [...files];
      updatedFiles.splice(index, 1); // 파일 제거
      setFiles(updatedFiles);
      onChange([...defaultFiles, ...updatedFiles]); // 전체 파일 목록 전달
    }
  };

  // defaultValue가 변경될 때 defaultFiles를 업데이트
  useEffect(() => {
    setDefaultFiles(defaultValue);
  }, [defaultValue]);

  return (
    <div className="m-input-files type01">
      {!onlyShow && (
        <div className="m-input">
          <input
            type="file"
            id={id}
            ref={inputRef}
            onChange={change}
            multiple={multiple}
            style={{ display: 'none' }}
          />
          <label htmlFor={id} className="m-btn">
            <i className="xi-plus" />
            파일 등록
          </label>
        </div>
      )}

      {/* 파일이 없을 때 표시할 메시지 */}
      {(defaultFiles.length === 0 && files.length === 0) && (
        <p className="m-noFile">파일을 첨부해주세요.</p>
      )}

      {/* 파일 목록을 표시 */}
      {(defaultFiles.length > 0 || files.length > 0) && (
        <div className="m-files-wrap">
          <div className="m-files">
            {defaultFiles.map((file, index) => (
              <div className="m-file-wrap" key={`default-${index}`}>
                <div className="m-file">
                  <span>{file.name}</span>
                  {!onlyShow && canRemove && (
                    <button
                      className="m-btn-remove"
                      onClick={() => remove(file, index)}
                      type="button"
                    >
                      <i className="xi-trash-o" />
                    </button>
                  )}
                </div>
              </div>
            ))}

            {files.map((file, index) => (
              <div className="m-file-wrap" key={`uploaded-${index}`}>
                <div className="m-file">
                  <span>{file.name}</span>
                  {!onlyShow && canRemove && (
                    <button
                      className="m-btn-remove"
                      onClick={() => remove(file, index)}
                      type="button"
                    >
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
  );
};

export default InputFiles;
