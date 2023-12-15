import React from "react";
import Logo from "../assets/images/20231205_154641.png";

const Footer: React.FC = () => {
  return (
    <footer>
      <img src={Logo} alt="" />
      <span>
        @bacablog <b>write read and post your imagine</b>.
      </span>
    </footer>
  );
};

export default Footer;