import React, { useEffect, useState } from "react";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ListIcon from "@material-ui/icons/List";
import InfoIcon from "@material-ui/icons/Info";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import "../../styles/data.css";
import { db } from "../../../backend-part/firebase";

const Data = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    db.collection("myfiles").onSnapshot((snapshot) => {
      setFiles(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  //how to find file size
  const fileFormatSize = (bytes, decimal = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimal < 0 ? 0 : decimal;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat(bytes / Math.pow(k, i).toFixed(dm) + " " + sizes[i]);
  };
  return (
    <div className="data">
      <div className="data_header">
        <div className="data_header_left">
          <span>My drive</span>
          <ArrowDropDownIcon />
        </div>
        <div className="data_header_right">
          <ListIcon />
          <InfoIcon />
        </div>
      </div>
      <div className="data_content">
        <div className="data_grid">
          {files.map((file) => (
            <div className="data__file">
              <InsertDriveFileIcon />
              <span>{file.data.filename}</span>
            </div>
          ))}
        </div>
        <div className="data_list">
          <div className="detailsRow">
            <span>
              Name <ArrowUpwardIcon />
            </span>
            <span>Owner</span>
            <span>List Modified</span>
            <span>File size</span>
          </div>
          {files.map((file) => (
            <div className="detailsRow">
              <span>
                <a href={file.data.fileURL} target="_blank" rel="noreferrer">
                  <InsertDriveFileIcon /> {file.data.filename}
                </a>
              </span>
              <span>Me</span>
              <span>
                {new Date(file.data.timestamp?.seconds * 1000).toUTCString()}
              </span>
              <span>{fileFormatSize(file.data.size)} MB</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Data;
