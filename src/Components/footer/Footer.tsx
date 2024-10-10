import React from "react";
import logo from "../../Source/logo1.png";
import vk from "../../Source/vk.png";
import inst from "../../Source/instagram.png";
import tube from "../../Source/youtube.png";
import "../footer/Footer.css";
import { Link } from "react-router-dom";
export function Footer() {
  return (
    <div className="Footer">
      <div className="footerInfo">
        <div className="footerlogo">
          <img src={logo} alt="" />
          <h1>Shop</h1>
        </div>
        <div className="society">
          <Link className="footerImg" to={"https://m.vk.com"}>
            <img src={vk} alt="" />
          </Link>
          <Link className="footerImg" to={"https://www.youtube.com"}>
            <img src={tube} alt="" />
          </Link>
          <Link className="footerImg" to={"https://www.instagram.com"}>
            <img src={inst} alt="" />
          </Link>
        </div>
      </div>
      <div>
        <p>©2024 Shop | All Rights Reserved</p>
      </div>
    </div>
  );
}
