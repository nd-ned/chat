import React from 'react';
// import logo from './logo.svg';
import Main from '../components/Main';
import Sidebar from '../components/Sidebar';
import './App.css';
import store from '../store'
import _ from 'lodash'


const App = () => {
  const { contacts, user, activeUserId  } = store.getState();
  // console.log("%c CONTACTS JOIN: ", "color: blue; font-size: 24px", contacts.contacts )
  return (
    <div className="App">
      <Sidebar contacts={_.values(contacts.contacts)} />
      <Main user={user} activeUserId={activeUserId} />
    </div>
  );
};

export default App;
