import React from "react";
import map from '../img/map.PNG';
import Phone from '../img/phonee.png';
import Email from '../img/gmail.png';
import Address from '../img/addresss.png';
import Facebook from '../img/facebook.png';
import Twitter from '../img/twitter.png';
import Github from '../img/github.png';
import './footer.css';
const Footer = () => {
  return (
    <footer className="footer-distributed">
        <div className="footer-left">
            <img className="map-img" src={map} />
        </div>
        <div className="footer-center">
            <div>
                <img className="address-icon" src={Address} />
                <p><span>21 Nguyễn Việt Hồng</span> Ninh Kiều, Cần Thơ</p>
            </div>
            <div className="phone-layout">
                <img className="phone-icon" src={Phone} />
                <p>+84 902 123456</p>
            </div>
            <div>
                <img className="mail-icon" src={Email} />
                <p><a href="#">Nshop@gmail.com</a></p>
            </div>
        </div>
        <div className="footer-right">
            <p className="footer-company-about">
                <span>Giới thiệu NShop</span>
                Hệ thống giày NSHOP chuyên thiết kế và kinh doanh các mặt hàng giày dép cho giới trẻ.
            </p>
            <div className="footer-icons">
                <a href="#"><img className="facebook-icon" src={Facebook} /></a>
                <a href="#"><img className="twitter-icon" src={Twitter}/></a>
                <a href="#"><img className="github-icon" src={Github}/></a>
            </div>
        </div>
    </footer>
  );
}

export default Footer;
