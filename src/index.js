import React from 'react';


import ReactDOM from "react-dom";
import "./index.css";
import App from "./containers/App";
import registerServiceWorker from "./registerServiceWorker";
import store from "./store";

// import openSocket from 'socket.io-client';
// const socket = openSocket('http://localhost:3000');
import { socket } from "./config/socketConnection"

import {
  addContacts,
  addContact,
  sendMessage,
  removeContact,
  userTyping,
  userStopTyping,
  unseenMessage
} from "./actions";

const render = () => {

  return ReactDOM.render(<App />, document.getElementById("root"));
};

render();
store.subscribe(render);
registerServiceWorker();



/**
 * SOCKETING
 */
socket.on('new connection', (data) => {
  const state = store.getState();
  socket.emit('add user',
    {

        username: state.user.name,
        userId: data,
        socketId: socket.id,
        profile_pic: state.user.profile_pic,
        status: state.user.status,
        typing: false,
        unSeenMessage: 0

    }
  );
})


socket.on('login', users => {
  store.dispatch(dispatcher => {
    dispatcher(addContacts(users))
  });
})

socket.on('user joined', users => {
  store.dispatch(dispatcher => {
    dispatcher(addContact(users))
  });
})

socket.on('user left', users => {
  store.dispatch(dispatcher => {
    dispatcher(removeContact(users))
  });
})



socket.on('new message', data => {
  const state = store.getState();

  if(state.activeUserId !== data.socketId) {
    store.dispatch(dispatcher => {
      dispatcher(unseenMessage(data.socketId))
    })
  }

  store.dispatch(dispatcher => {
      dispatcher(sendMessage(data.message, data.socketId, false, true, data.image))
  });

})

socket.on('typing', (data) => {

  store.dispatch(dispatcher => {
    dispatcher(userTyping(data))
  });

})

socket.on('stop typing', data => {
  
  store.dispatch(dispatcher => {
    dispatcher(userStopTyping(data))
  })
})
