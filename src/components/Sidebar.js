import React from "react";
import User from "../containers/User"; 
import "./Sidebar.css";
import store from "../store";
import { relative } from "path";

function _handleSubmit(e) {
  document.querySelector('aside.Sidebar').classList.toggle('open')

  // const button = document.querySelector('.Button-m-ui.ripple')

  // let ripple = document.createElement('span'),
	// 		rippleOffset = button.getBoundingClientRect();
	
	// let rippleY = e.pageY - rippleOffset.top,
	// 		rippleX = e.pageX - rippleOffset.left;
	
	// ripple.style.top = rippleY + 'px',
	// ripple.style.left = rippleX + 'px',
	// ripple.style.background = button.getAttribute('data-ripple-color');
	
	// button.appendChild(ripple);
	
	// setTimeout(function(){
	// 	ripple.parentNode.removeChild(ripple);
	// }, 1500);
}

const Sidebar = ({ contacts }) => {
  const state = store.getState();
  
  return (
    <div style={{position: "relative"}}>

      <aside className="Sidebar">
        {contacts.map((contact, i) => <User user={contact} activeUserId={state.activeUserId} key={contact.user_id || i} />)}
      </aside>
      <div className="Button-m-ui ripple" onClick={(e)=>_handleSubmit(e)}>Toggle</div>
    </div>
  );
};

export default Sidebar;