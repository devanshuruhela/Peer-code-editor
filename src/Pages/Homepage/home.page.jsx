/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import "./homepage.styles.css";
import logo from '../../Assets/logo.png'
import { v4 as uuid } from "uuid";
import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";
export const Home = () => {

  const navigate = useNavigate();

  const [roomId , setRoomId] = useState('');
  const [username , setusername] = useState('');

  const createNewRoom = (e) => {
    e.preventDefault();
    const id = uuid();
    setRoomId(id);
    toast.success('New ROOM ID created')
  };

  const joinRoom = () =>
  {
    if(!roomId)
    {
      toast.error('Please enter a ROOM ID!');
      return;
    }
    if(!username)
    {
      toast.error('Please enter a USERNAME!');
      return;
    }
 
    navigate(`/editor/${roomId}` , {
      state:
      {
        username,
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
          <input type="text" className="inputBox" placeholder="USERNAME" onChange={(e)=> setusername(e.target.value)} value={username} onKeyUp={pressenter}/>
          <button className="btn joinbtn" onClick={joinRoom}>JOIN</button>
          <span className="createInfo">
            If you don't have an invite then create &nbsp;
            <a
              onClick={createNewRoom}
              href=""
              className="createNewBtn"
            >
              new room
            </a>
          </span>
        </div>
      </div>
      <footer>
        <h4>
          Built with love By{" "}
          <a href="https://github.com/devanshuruhela" target={"_blank"} rel="noreferrer">Devanshu</a>{" "}
        </h4>
      </footer>
    </div>
  );
};

export default Home;
