import React from "react";
import "./User.css";
import store from "../store";
import { setActiveUserId, resetUnseenMessages, setTypingValue } from "../actions";
import { socket } from "../config/socketConnection"

const User = ({ user, activeUserId }) => {
  // user = {user}
  const { username, profile_pic, status, socketId, typing, unSeenMessage } = user;
  const active = activeUserId === socketId ? ' active' : '' 
  return (
    <div className={`User${active}`} onClick={handleUserClick.bind(null, user)}>
      <div style={{position: "relative"}}>
        {unSeenMessage !== 0 && <span style={{
          position: 'absolute',
          top: -5,
          right: -5,
          color: 'white',
          backgroundColor: 'red',
          borderRadius: '50%',
          padding: 2,
          fontWeight: '700',
          fontSize: '12px',
          minWidth: 16

        }}>
          {unSeenMessage < 99 ? unSeenMessage : "99+"}
        </span>}
        <img src={profile_pic} alt={username} className="User__pic" />
        {typing && <span style={{position: "absolute", bottom: -25, left: "calc(50% - 15px)"}}>
                  <img src={require("./typing.svg")} alt="typing"></img>
                </span>
        }
      </div>
      <div className="User__details">
        <p className="User__details-name">{username}</p>
        <p className="User__details-status">{status}</p>
      </div>
    </div>
  );
};

function handleUserClick({ socketId }) {
  // console.log(user_id)
  console.log(socket.sendTo, socketId)
  if(socket.sendTo && socketId) {
    socket.emit('stop typing', { sendTo: socket.sendTo, socketId: socketId });
  }
  document.querySelector('aside.Sidebar').classList.remove('open')
  socket.sendTo = socketId
  store.dispatch(dispatcher => {
    store.dispatch(setTypingValue(''));
    dispatcher(resetUnseenMessages(socketId))
    dispatcher(setActiveUserId(socketId))
  });
}

export default User;