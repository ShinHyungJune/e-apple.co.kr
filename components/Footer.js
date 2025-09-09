import Link from "next/link";

const Footer = () => {
    return (
        <footer className="footer" role="contentinfo">
            <div className="footer-top">
                <h3>고객센터</h3>
                <p className="contact">
                    <a href="tel:055-945-3204" aria-label="고객센터 전화번호 055-945-3204">055-945-3204</a>
                </p>
                <p className="businessHours">평일 09:00~ 18:00 (주말 및 공휴일 휴무)</p>
            </div>
            <div className="footer-bt">
                <h2>농업회사법인 열매나무 주식회사</h2>
                <nav className="ft-tab" aria-label="하단 메뉴">
                    {/*<Link href="/customer-service">고객센터</Link>
                    <span></span>*/}
                    <Link href="/contents/privacyPolicy" aria-label="개인정보처리방침 페이지로 이동">개인정보처리방침</Link>
                    <span aria-hidden="true"></span>
                    <Link href="/contents/termsOfService" aria-label="이용약관 페이지로 이동">이용약관</Link>
                    <span aria-hidden="true"></span>
                    <Link href="/contents/refundPolicy" aria-label="배송 교환 취소 환불 규정 페이지로 이동">배송/교환/취소/환불 규정</Link>
                </nav>
                <address className="footer-information">
                    주소: 경남 거창군 거창읍 거함대로 3372 서북부경남거점산지유통센터(APC) <br />
                    대표자명: 오승철<br />
                    사업자등록번호: 125-87-01503<br />
                    통신판매신고: 제 2019-경남거창-00057 호<br />
                    이메일: <a href="mailto:bezzangecp@naver.com" aria-label="이메일 문의하기">bezzangecp@naver.com</a><br/>
                    고객센터: <a href="tel:055-945-3204" aria-label="고객센터 전화하기">055-945-3204</a><br/>
                    팩스: 0504-436-4104 <br />
                    <br/>
                    모든 거래에 대한 책임과 배송, 환불, 민원등의 처리는 [농업회사법인 열매나무 주식회사]에서 진행합니다
                </address>
            </div>
        </footer>
    );
};

export default Footer;
