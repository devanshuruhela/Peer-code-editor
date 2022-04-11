import React, { useState } from "react";
import "./editorpage.styles.css";
import logo from "../../Assets/code-sync.png";
import Client from "../../Components/client.component";
const Editor = () => {
  const [clients, setClients] = useState([
    { socketId: 1, username: "Devanshu" },
    {
      socketId: 2,
      username: "John Doe",
    },
  ]);

  return (
    <div className="mainConatainer">
      <div className="leftpanel">
        <div className="leftContainer">
          <div className="logo">
            <img src={logo} alt="logo" className="logoimg" />
          </div>
          <h3>Connected</h3>
          <div className="clientList">
            {
              clients.map(client=><Client key={client.socketId} username = {client.username}/>)
            }
          </div>
        </div>
      </div>
      <div className="rightpanel">Our editor is here</div>
    </div>
  );
};

export default Editor;
