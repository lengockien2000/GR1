import React from "react";
import Logo from "../img/logo.png";

const Footer = () => {
  return (
    <footer>
      <img src={Logo} alt="" />
      <span>
        Made by Kien Le for <b>Graduation research 1</b>.
      </span>
    </footer>
  );
};

export default Footer;