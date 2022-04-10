import React, { useState } from "react";
import "./homepage.styles.css";
import logo from "../../Assets/code-sync.png";
import { v4 as uuid } from "uuid";
import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";
export const Home = () => {

  const navigate = useNavigate();

  const [roomId , setRoomId] = useState('');
  const [userName , setuserName] = useState('');

  const createNewRoom = (e) => {
    e.preventDefault();
    const id = uuid();
    setRoomId(id);
    toast.success('New ROOM ID created')

    // console.log(id);
  };

  const joinRoom = () =>
  {
    if(!roomId)
    {
      toast.error('Please enter a ROOM ID!');
      return;
    }
    if(!userName)
    {
      toast.error('Please enter a USERNAME!');
      return;
    }
    navigate(`/editor/${roomId}` , {
      state:
      {
        userName,
      }
    })

  }

  const pressenter = (e) =>
  {
    if(e.code === 'Enter')
    {
      joinRoom();
    }
  }



  return (
    <div className="homePageContainer">
      <div className="formContainer">
        <img src={logo} className="homepagelogo" alt="code" />
        <h4 className="main-label"> Paste invitation ROOM ID</h4>
        <div className="inputContainer">
          <input type="text" className="inputBox" placeholder="ROOM ID" onChange={(e)=> setRoomId(e.target.value)} value={roomId} onKeyUp={pressenter}/>
          <input type="text" className="inputBox" placeholder="USERNAME" onChange={(e)=> setuserName(e.target.value)} value={userName} onKeyUp={pressenter}/>
          <button className="btn joinbtn" onClick={joinRoom}>JOIN</button>
          <span className="createInfo">
            If you don't have an invite then create &nbsp;
            <a
              onClick={createNewRoom}
              href="google.com"
              className="createNewBtn"
            >
              new room{" "}
            </a>
          </span>
        </div>
      </div>
      <footer>
        <h4>
          Built with love By{" "}
          <a href="https://github.com/devanshuruhela">Devanshu</a>{" "}
        </h4>
      </footer>
    </div>
  );
};

export default Home;
