import React, { useEffect, useRef, useState } from "react";
import "./editorpage.styles.css";
import logo from "../../Assets/code-sync.png";
import Client from "../../Components/Client/Client.component";
import Editor from "../../Components/Editor/Editor.component";
import { initSocket } from "../../socket";
import ACTIONS from "../../actions";
import { Navigate, useLocation ,useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
const EditorPage = () => {

  
  const socketRef = useRef(null);
  const location = useLocation();
  const {roomId} = useParams();
  const reactNavigator= useNavigate();
  useEffect(()=>
  {
    const init = async()=>
    {
      socketRef.current = await initSocket();
      // socketRef.current.on('connection_error' , (err) => handleErrors(err));
      // socketRef.current.on('connection_failed' , (err)=> handleErrors(err));

      // function handleErrors(e)
      // {
      //   console.log('socket error' ,e);
      //   toast.error('Connection failed, try again later.');
      //   reactNavigator('/');
      // }
      // socketRef.current.emit(ACTIONS.JOIN , 
      //   {
      //     roomId,
      //     username:location.state?.username
      //   });
    };
    init();
  },[])

  const [clients, setClients] = useState([
    { 
      socketId: 1, 
      username: "Devanshu" },
    {
      socketId: 2,
      username: "John Doe",
    },
    
  ]);
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
        <button className="btn copybtn">Copy ROOM ID</button>
        <button className="btn leavebtn">Leave</button>
      </div>
      <div className="rightpanel">
        <Editor/>
      </div>
    </div>
  );
};

export default EditorPage;
