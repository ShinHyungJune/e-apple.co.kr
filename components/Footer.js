import Link from "next/link";

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-top">
                <h3>고객센터</h3>
                <p className="contact">0000-0000</p>
                <p className="businessHours">평일 09:00~ 18:00 (주말 및 공휴일 휴무)</p>
            </div>
            <div className="footer-bt">
                <h2>(주) 열매나무</h2>
                <div className="ft-tab">
                    <Link href="/customer-service">고객센터</Link>
                    <span></span>
                    <Link href="/privacy-policy">개인정보처리방침</Link>
                    <span></span>
                    <Link href="/terms-of-service">이용약관</Link>
                </div>
                <p className="footer-information">
                    주소: <br />
                    대표자명: <br />
                    사업자등록번호: <br />
                    통신판매신고: <br />
                    이메일:
                </p>
            </div>
        </div>
    );
};

export default Footer;
