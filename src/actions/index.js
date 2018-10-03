import {
  SET_ACTIVE_USER_ID,
  SET_TYPING_VALUE,
  SEND_MESSAGE,
  ADD_CONTACT,
  UNSEEN_MESSAGE,
  USER_TYPING,
  USER_STOP_TYPING,
  REMOVE_CONTACT,
  ADD_CONTACTS,
  RESET_UNSEEN_MESSAGES
} from "../constants/action-types";


export const setActiveUserId = id => ({
  type: SET_ACTIVE_USER_ID,
  payload: id
});

export const resetUnseenMessages = id => ({
  type: RESET_UNSEEN_MESSAGES,
  payload: id
})

export const setTypingValue = value => ({
  type: SET_TYPING_VALUE,
  payload: value
})

export const sendMessage = (message, userId, is_me, notSeen, image) => ({
  type: SEND_MESSAGE,
  payload: {
    message,
    userId,
    is_me,
    notSeen,
    image
  }
})

export const addContacts = (data) => ({
  type: ADD_CONTACTS,
  payload: {
    users: data
  }
})

export const addContact = (data) => ({
  type: ADD_CONTACT,
  payload: {
    users: data
  }
})

export const removeContact = data => ({
  type: REMOVE_CONTACT,
  payload: {
    users: data
  }
})

export const unseenMessage = (data) => ({
  type: UNSEEN_MESSAGE,
  payload: {
    data
  }
})

export const userTyping = (data) => ({
  type: USER_TYPING,
  payload: {
    data
  }
})

export const userStopTyping = data => ({
  type: USER_STOP_TYPING,
  payload: {
    data
  }
})