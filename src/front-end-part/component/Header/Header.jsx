import React from "react";
import "../../styles/header.css";
import SearchIcon from "@material-ui/icons/Search";
import FormatAlignCenterIcon from "@material-ui/icons/FormatAlignCenter";
import SettingsIcon from "@material-ui/icons/Settings";
import HelpIcon from "@material-ui/icons/Help";
import AppsIcon from "@material-ui/icons/Apps";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const Header = ({photoURL}) => {
  return (
    <div className="header">
      <div className="header_logo">
        <img
          src="https://raw.githubusercontent.com/github/explore/8f19e4dbbf13418dc1b1d58bb265953553c15a46/topics/google-drive/google-drive.png"
          alt=""
        />

        <span>Drive</span>
      </div>
      <div className="header_search">
        <SearchIcon />
        <input type="text" placeholder="Search in Drive..." />
        <FormatAlignCenterIcon />
      </div>
      <div className="header_icons">
        <span className="material_icos">
          <SettingsIcon />
          <HelpIcon />
        </span>
        <span className="material_icos">
          <AppsIcon />
          <AccountCircleIcon src={photoURL}/>
        </span>
      </div>
    </div>
  );
};

export default Header;
