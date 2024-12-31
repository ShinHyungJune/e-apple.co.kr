import { useEffect, useState } from "react";

export default function Pagination({ meta, form, setForm }) {
    const [pages, setPages] = useState([]);
    const [currentSection, setCurrentSection] = useState(0); // 페이지 섹션 관리

    // 페이지 섹션을 설정하는 함수 (한 섹션당 10개 페이지)
    function setPagesSections() {
        const unit = 10;
        const sections = [];
        let items = [];

        for (let i = 1; i <= meta.last_page; i++) {
            items.push(i);
            if (items.length >= unit || i === meta.last_page) {
                sections.push(items);
                items = [];
            }
        }
        setPages(sections);
    }

    useEffect(() => {
        setPagesSections();
    }, [meta]);

    function pageClass(page) {
        return meta.current_page === page ? "m-page active" : "m-page";
    }

    function paginate(page) {
        setForm({
            ...form,
            page: page,
        });

        document.querySelector("html").scrollTop = 0;
    }

    function first() {
        paginate(1);
        setCurrentSection(0); // 첫 페이지 섹션으로 이동
    }

    function prev() {
        if (meta.current_page > 1) {
            paginate(meta.current_page - 1);
            if (meta.current_page % 10 === 1) {
                setCurrentSection(currentSection - 1); // 이전 섹션으로 이동
            }
        }
    }

    function next() {
        if (meta.current_page < meta.last_page) {
            paginate(meta.current_page + 1);
            if (meta.current_page % 10 === 0) {
                setCurrentSection(currentSection + 1); // 다음 섹션으로 이동
            }
        }
    }

    function last() {
        paginate(meta.last_page);
        setCurrentSection(pages.length - 1); // 마지막 섹션으로 이동
    }

    return (
        <div className="m-pagination type02">
            <div className="m-pages">
                <div className="m-page-wrap">
                    <button type="button" className="m-page" onClick={first}>
                        <i className="xi-angle-left"></i>
                        <i className="xi-angle-left"></i>
                    </button>
                </div>

                <div className="m-page-wrap">
                    <button type="button" className="m-page" onClick={prev}>
                        <i className="xi-angle-left"></i>
                    </button>
                </div>

                {/* 현재 섹션의 페이지들만 표시 */}
                {pages[currentSection]?.map((page) => (
                    <div className="m-page-wrap" key={page}>
                        <button
                            type="button"
                            className={pageClass(page)}
                            onClick={() => paginate(page)}
                        >
                            {page}
                        </button>
                    </div>
                ))}

                <div className="m-page-wrap">
                    <button type="button" className="m-page" onClick={next}>
                        <i className="xi-angle-right"></i>
                    </button>
                </div>

                <div className="m-page-wrap">
                    <button type="button" className="m-page" onClick={last}>
                        <i className="xi-angle-right"></i>
                        <i className="xi-angle-right"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}
