'use client'
import { useEffect, useState } from "react";
import { useRouter, useSearchParams  } from "next/navigation";
import Image from 'next/image';
import Link from 'next/link';


// 사이드바
import Sidebar from "/public/admin/components/Sidebar"
// 해드
import Header from "/public/admin/components/Header"

export default function AdminPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 검색어와 페이지번호를 쿼리 파라미터에서 가져옴
  const initialWord = searchParams.get("word") || "";
  const initialPage = parseInt(searchParams.get("page"), 10) || 1;

  // 검색어와 페이지 번호 상태
  const [word, setWord] = useState(initialWord);
  const [page, setPage] = useState(initialPage);

  useEffect(() => {
    router.push('/admin/mainBanners');

    // 검색어와 페이지가 변경될 때마다 쿼리 파라미터를 업데이트
    /*const params = new URLSearchParams();
    if (word) params.set("word", word);
    if (page) params.set("page", page.toString());
    router.replace(`?${params.toString()}`);*/
  }, [word, page]);
  

  


  
  return (
    <div id="wrap">
    <Header/>

    <main id="main" className="main">
      <Sidebar/>

      <div className="main-inner">
        <div className="page-top">
          <div className="fragment">
            <h3 className="page-top-title">게시판 목록</h3>
            <p className="page-top-body">총 200개</p>
          </div>

          <div className="fragment">
            <div className="m-spaces type01">
              <div className="m-space-wrap">
                <div className="m-space">
                  <div className="m-input-search type01">
                    <input
                      type="text"
                      placeholder="검색어를 입력하세요."
                      value={word}
                      onChange={(e) => setWord(e.target.value)}
                    />
                    <i className="xi-search deco"></i>
                  </div>
                </div>
              </div>
              <div className="m-space-wrap">
                <div className="m-space">
                  <a href="#" className="m-btn type01">
                    삭제하기
                  </a>
                </div>
              </div>
              <div className="m-space-wrap">
                <div className="m-space">
                  <a href="#" className="m-btn type01 bg-primary white">
                    생성하기
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20"></div>

        <div className="m-spaces type01">
          <div className="m-space-wrap" style={{ width: '100%' }}>
            <div className="m-space">
              <div className="m-box type01"></div>
            </div>
          </div>
        </div>

        <div className="m-spaces type01">
          <div className="m-space-wrap">
            <div className="m-space">
              <div className="m-box type01">
                <div className="m-table-wrap type01">
                  <table className="m-table type01">
                    <colgroup>
                      <col style={{ width: '10%' }} />
                    </colgroup>
                    <thead>
                      <tr>
                        <th>
                          <div className="m-input-checkbox type01">
                            <input type="checkbox" id="test" />
                            <label htmlFor="test"></label>
                          </div>
                        </th>
                        <th>이미지</th>
                        <th>텍스트</th>
                        <th>링크</th>
                        <th>태그</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className="m-input-checkbox type01">
                            <input type="checkbox" id="checkbox1" />
                            <label htmlFor="checkbox1"></label>
                          </div>
                        </td>
                        <td>
                          <div className="m-ratioBox-wrap type01">
                            <div
                              className="m-ratioBox"
                              style={{ backgroundImage: "url('/admin/images/example.png')" }}
                            ></div>
                          </div>
                        </td>
                        <td>내용</td>
                        <td>
                          <a href="#" target="_blank" className="link">https://naver.com</a>
                        </td>
                        <td>
                          <div className="m-spaces type01">
                            <div className="m-space-wrap">
                              <div className="m-tag type01 state0">상태1</div>
                            </div>
                            <div className="m-space-wrap">
                              <div className="m-tag type01 state1">상태2</div>
                            </div>
                            <div className="m-space-wrap">
                              <div className="m-tag type01 state2">상태3</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="m-spaces type01 justify-flex-end">
                            <div className="m-space-wrap">
                              <div className="m-space">
                                <a href="#" className="m-btn type02">
                                  <i className="xi-pen"></i>
                                </a>
                              </div>
                            </div>

                            <div className="m-space-wrap">
                              <div className="m-space">
                                <a href="#" className="m-btn type02">
                                  <i className="xi-eye"></i>
                                </a>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-20"></div>

              <div className="m-pagination type01">
                <div className="m-pages">
                  <div className="m-page-wrap">
                    <a href="#" className="m-page">
                      <i className="xi-angle-left"></i>
                      <i className="xi-angle-left"></i>
                    </a>
                  </div>

                  <div className="m-page-wrap">
                    <a href="#" className="m-page active">1</a>
                  </div>
                  <div className="m-page-wrap">
                    <a href="#" className="m-page">2</a>
                  </div>
                  <div className="m-page-wrap">
                    <a href="#" className="m-page">3</a>
                  </div>
                  <div className="m-page-wrap">
                    <a href="#" className="m-page">4</a>
                  </div>

                  <div className="m-page-wrap">
                    <a href="#" className="m-page">
                      <i className="xi-angle-right"></i>
                      <i className="xi-angle-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    {/* //main */}

    <footer className="footer"></footer>
    {/* //footer */}
  </div>
  );
}
