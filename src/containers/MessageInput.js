import React from "react";
import store from "../store";
import "./MessageInput.css";
import { setTypingValue, sendMessage } from "../actions";
import { socket } from "../config/socketConnection";


let lastTypingTime,
    userIsTyping = false,
    stopTypingTimer;

const TYPING_TIMER_LENGTH = 400

const updateTyping = () => {

    if (!userIsTyping) {
        userIsTyping = true;
        socket.emit('typing', { sendTo: socket.sendTo, socketId: socket.socketId });
    }

    lastTypingTime = (new Date()).getTime();

    clearInterval(stopTypingTimer)
    stopTypingTimer = setTimeout(() => {
        let typingTimer = (new Date()).getTime();
        let timeDiff = typingTimer - lastTypingTime;
        if (timeDiff >= TYPING_TIMER_LENGTH && userIsTyping) {
            socket.emit('stop typing', { sendTo: socket.sendTo, socketId: socket.socketId });
            userIsTyping = false;
        }
    }, TYPING_TIMER_LENGTH);
}

const MessageInput = ({ value }) => {

    const handleChange = e => {
        updateTyping()
        store.dispatch(setTypingValue(e.target.value));
    };

    const state = store.getState();

    const handleSubmit = e => {
        e.preventDefault();
        const { typing, activeUserId } = state;

        socket.emit('stop typing', { sendTo: socket.sendTo, socketId: socket.socketId });
        userIsTyping = false;

        if(typing.length === 0) return;

        socket.emit('new message', { message: typing, sendTo: socket.sendTo, socketId: socket.socketId })
        store.dispatch(dispatcher => {
            dispatcher(sendMessage(typing, activeUserId, true))
        });
    };

    

    const handleImageChange = e => {
        e.preventDefault();
        let reader = new FileReader(),
            file = e.target.files[0];
        const { activeUserId } = state;

        reader.addEventListener("load", function () {

            socket.emit('new message', {
                message: '',
                sendTo: socket.sendTo,
                socketId: socket.socketId,
                image: reader.result
            })

            store.dispatch(dispatcher => {
                dispatcher(sendMessage('', activeUserId, true, true, reader.result))
            });
          }, false);
        
        if (file) {
            reader.readAsDataURL(file);
        }
    }

    return (
        <form className="Message" onSubmit={handleSubmit}>
            <input className="fileInput" 
              type="file" 
              onChange={(e)=>handleImageChange(e)} />
            <input
                className="Message__input"
                onChange={handleChange}
                value={value}
                placeholder="write a message"
            />
        </form>
    );
};

export default MessageInput;