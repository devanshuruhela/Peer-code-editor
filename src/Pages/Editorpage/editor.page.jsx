import React, { useEffect, useRef, useState } from "react";
import "./editorpage.styles.css";
import ACTIONS from "../../actions";
import logo from "../../Assets/logo.png"
import Client from "../../Components/Client/client.component";
import Editor from "../../Components/Editor/editor.component";
import {initSocket} from '../../socket.js'
import { Navigate, useLocation ,useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
const EditorPage = () => {
  const socketRef = useRef(null);
  const codeRef = useRef(null);
  const location = useLocation();
  const {roomId} = useParams();
  const reactNavigator= useNavigate();
  const [clients, setClients] = useState([]);
  useEffect(()=>
  {
    const init = async()=>
    {
      socketRef.current = await initSocket();
      socketRef.current.on('connect_error' , (err) => handleErrors(err));
      socketRef.current.on('connect_failed' , (err)=> handleErrors(err));

      function handleErrors(e)
      {
        // console.log('socket error' , e);
        toast.error('Connection failed, try again later.');
        reactNavigator('/');
      }
      socketRef.current.emit(ACTIONS.JOIN , 
        {
          roomId,
          username:location.state?.username,
        });

        socketRef.current.on(ACTIONS.JOINED , ({clients , username , socketId})=>
        {
          if(username !== location.state?.username)
          {
            toast.success(`${username} joined the room.`);
            // console.log(`${username} joined`);
          }
          setClients(clients);
          socketRef.current.emit(ACTIONS.SYNC_CODE, {
            code: codeRef.current,
            socketId,
          });
        });
        socketRef.current.on(
                ACTIONS.DISCONNECTED,
                ({ socketId, username }) => {
                    toast.success(`${username} left the room.`);
                    setClients((prev) => {
                        return prev.filter(
                            (client) => client.socketId !== socketId
                        );
                    });
                }
            );
    };
    init();
    return () => {
            socketRef.current.disconnect();
            socketRef.current.off(ACTIONS.JOINED);
            socketRef.current.off(ACTIONS.DISCONNECTED);
        };
  },[]);
  async function copyRoomId() {
        try {
            await navigator.clipboard.writeText(roomId);
            toast.success('Room ID has been copied');
        } catch (err) {
            toast.error('Could not copy the Room ID');
            console.error(err);
        }
    }

    function leaveRoom()
    {
      reactNavigator('/')
    }
  if(!location.state){
   return <Navigate to='/'/>
}

  return (
    <div className="mainContainer">
      <div className="leftpanel">
        <div className="leftContainer">
          <div className="Logo">
            <img src={logo} alt="logo" className="logoimg" />
          </div>
          <h3>Connected</h3>
          <div className="clientList">
            {
              clients.map(client=><Client key={client.socketId} username = {client.username}/>)
            }
          </div>
        </div>
        <button className="btn copybtn" onClick={copyRoomId} >Copy ROOM ID</button>
        <button className="btn leavebtn" onClick={leaveRoom} >Leave</button>
      </div>
      <div className="rightpanel">
        <Editor
        socketRef={socketRef}
        roomId={roomId}
        codeChange={(code)=>{codeRef.current = code}}
        />
      </div>
    </div>
  );
};

export default EditorPage;
