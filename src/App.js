import React, { useState } from "react";
import { getAuth, provider } from "./backend-part/firebase";
import Data from "./front-end-part/component/Data.js/Data";
import Header from "./front-end-part/component/Header/Header";
import Sidebar from "./front-end-part/component/Sidebar/Sidebar";

const App = () => {
  const [user, setUser] = useState(null); //authentaction
  const siginIn = () => {
    getAuth
      .signInWithPopup(provider)
      .then(({ user }) => {
        setUser(user);
      })
      .error((errror) => {
        alert(errror.message);
      });
  };
  return (
    <>
      {user ? (
        <>
          <Header photoURL={user.photoURL}/>
          <div className="App">
            <Sidebar />
            <Data />
          </div>
        </>
      ) : (
        <div className="login">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu9J6NjwzrNfj7QG_opW2Pgc3YwpkmKzenW1oiFsEL4g&s"
            alt=""
          />
          <button onClick={siginIn}>Login to Google drive</button>
        </div>
      )}
    </>
  );
};

export default App;
