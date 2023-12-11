import React from "react";
import Logo from "../assets/images/20231205_154641.png";

const Footer: React.FC = () => {
  return (
    <footer>
      <img src={Logo} alt="" />
      <span>
        Made with ♥️ and <b>React.js</b>.
      </span>
    </footer>
  );
};

export default Footer;