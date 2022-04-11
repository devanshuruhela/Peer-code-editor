import React, { useState } from "react";
import "./editorpage.styles.css";
import logo from "../../Assets/code-sync.png";
import Client from "../../Components/Client/Client.component";
import Editor from "../../Components/Editor/Editor.component";
const EditorPage = () => {
  const [clients, setClients] = useState([
    { socketId: 1, username: "Devanshu" },
    {
      socketId: 2,
      username: "John Doe",
    },
    
  ]);

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
