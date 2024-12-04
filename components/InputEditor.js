"use client";
import React, {useState, useRef, useEffect, useMemo} from 'react';
import Error from "@/components/Error";
import imagesApi from "@/lib/api/imagesApi";
import dynamic from "next/dynamic";
import 'react-quill/dist/quill.snow.css'; // 기본 스타일

// dynamic : react-quill 내부 코드중에 csr 기반 코드가 있어서 ssr에서 에러나지 않도록 csr로만 동작하라는 의미로 dynamic이란걸 써줘야한다고함
const ReactQuill = dynamic(
    async () => {
        const { default: RQ } = await import("react-quill")

        // 컴포넌트에다 ref props를 전달할 수 없어서 forwardedRef라는거 써줘야한다함
        return ({ forwardedRef, ...props }) => <RQ ref={forwardedRef} {...props} />
    },
    {
        ssr: false,
    }
)

const InputEditor = ({form, setForm, name = "description"}) => {

    const [isFirstRender, setIsFirstRender] = useState(true);
    const quillRef = useRef(null);
    const inputRef = useRef(null);

    const changeImg = (event) => {
        const file = event.target.files[0];

        imagesApi.store({
            file: file,
        }, (response) => {
            const range = quillRef.current.getEditor().getSelection();
            quillRef.current.getEditor().insertEmbed(range.index, 'image', response.data);
        })
    };

    const modules = useMemo(
            () => ({
                toolbar: {
                    container: [
                        ["bold", "italic", "underline", "strike", "blockquote"],
                        [{ size: ["small", false, "large", "huge"] }, { color: [] }],
                        [
                            { list: "ordered" },
                            { list: "bullet" },
                            { indent: "-1" },
                            { indent: "+1" },
                            { align: [] },
                        ],
                        ["image"],
                    ],
                    handlers: {
                        image: () => {inputRef.current.click()},
                    },
                },
            }),
            []
    );

    const onChange = (data) => {
        if(isFirstRender)
            return setTimeout(function(){
                setForm({...form, [name] : data})

                setIsFirstRender(false);
            }, 100);

        setForm({...form, [name] : data})
    }

    return (
            <>
                <ReactQuill
                        forwardedRef={quillRef}
                        value={form[name]}
                        onChange={onChange}
                        modules={modules}
                        theme="snow"
                />

                <input type="file" accept="image/*" ref={inputRef} onChange={changeImg} style={{ opacity: 0 }} />
            </>
    );
};

export default InputEditor;
