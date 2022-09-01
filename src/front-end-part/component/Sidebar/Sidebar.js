import React, { useState } from "react";
import "../../styles/sidebar.css";
import MobileScreenShareIcon from "@material-ui/icons/MobileScreenShare";
import ComputerIcon from "@material-ui/icons/Computer";
import PeopleIcon from "@material-ui/icons/People";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import StarHalfIcon from "@material-ui/icons/StarHalf";
import DeleteIcon from "@material-ui/icons/Delete";
import CloudOffIcon from "@material-ui/icons/CloudOff";
import AddIcon from "@material-ui/icons/Add";
import { Modal } from "@material-ui/core";
import { db, storage } from "../../../backend-part/firebase";
import firebase from "firebase";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [upload, setUpload] = useState(false);
  const [file, setFile] = useState(null);

  const handleClick = () => {
    setOpen(false);
  };
  const handleeOpen = () => {
    setOpen(true);
  };

  const fileChange = (e) => {
    // console.log(e.target.files);
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  const fileUpload = (e) => {
    e.preventDefault();
    setUpload(true);
    //send data in firebase
    storage
      .ref(`/files/${file.name}`)
      .put(file)
      .then((snapshot) => {
        // console.log("snap",snapshot)
        storage
          .ref("files")
          .child(file.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("myfiles").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              filename: file.name,
              fileURL: url,
              size: snapshot._delegate.bytesTransferred,
            });
            setUpload(false);
            setFile(null);
            setOpen(false);
          });
      });
  };

  return (
    <>
      <Modal open={open} onClose={handleClick}>
        <div className="modal_pop">
          <form>
            <div className="m_heading">
              <span>Slect file you want to upload</span>
            </div>
            <div className="m_body">
              {upload ? (
                <p className="uploading">Uploading...</p>
              ) : (
                <>
                  <input type="file" onChange={fileChange} />
                  <input
                    type="submit"
                    className="post_submit"
                    onClick={fileUpload}
                  />
                </>
              )}
            </div>
          </form>
        </div>
      </Modal>
      <div className="sidebar">
        <div className="sidebar_btn">
          <button onClick={handleeOpen}>
            <AddIcon className="addicons" />
            <span>New</span>
          </button>
        </div>
        <div className="sidebar_options">
          <div className="sidebar_option sidebar_option_Active">
            <MobileScreenShareIcon />
            <span>My Drive</span>
          </div>
          <div className="sidebar_option">
            <ComputerIcon />
            <span>My Computer</span>
          </div>
          <div className="sidebar_option">
            <PeopleIcon />
            <span>Shared with me</span>
          </div>
          <div className="sidebar_option">
            <QueryBuilderIcon />
            <span>Recent</span>
          </div>
          <div className="sidebar_option">
            <StarHalfIcon />
            <span>Starred</span>
          </div>
          <div className="sidebar_option">
            <DeleteIcon />
            <span>Bin</span>
          </div>
        </div>
        <hr />
        <div className="sidebar_options">
          <div className="sidebar_option">
            <CloudOffIcon />
            <span>Storage</span>
          </div>
          <div className="progress_bar">
            <progress size="tiny" value="53" max="100"></progress>
            <span>3.9MB of 14 GB used</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
