import Link from "next/link";

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-top">
                <h3>고객센터</h3>
                <p className="contact">055-944-3533</p>
                <p className="businessHours">평일 09:00~ 18:00 (주말 및 공휴일 휴무)</p>
            </div>
            <div className="footer-bt">
                <h2>농업회사법인 열매나무 주식회사</h2>
                <div className="ft-tab">
                    {/*<Link href="/customer-service">고객센터</Link>
                    <span></span>*/}
                    <Link href="/contents/privacyPolicy">개인정보처리방침</Link>
                    <span></span>
                    <Link href="/contents/termsOfService">이용약관</Link>
                    <span></span>
                    <Link href="/contents/refundPolicy">배송/교환/취소/환불 규정</Link>
                </div>
                <p className="footer-information">
                    주소: 경상남도 거창군 고제면 고제로 740-8<br />
                    대표자명: 오승철<br />
                    사업자등록번호: 125-87-01503<br />
                    통신판매신고: 제 2019-경남거창-00057 호<br />
                    이메일: bezzangecp@naver.com<br/>
                    고객센터: 055-944-3533<br/>
                    팩스: 0504-436-4104 <br />
                    <br/>
                    모든 거래에 대한 책임과 배송, 환불, 민원등의 처리는 [농업회사법인 열매나무 주식회사]에서 진행합니다
                </p>
            </div>
        </div>
    );
};

export default Footer;
