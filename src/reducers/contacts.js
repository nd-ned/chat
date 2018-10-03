
import {
  ADD_CONTACT,
  USER_TYPING,
  USER_STOP_TYPING,
  UNSEEN_MESSAGE,
  REMOVE_CONTACT,
  RESET_UNSEEN_MESSAGES,
  ADD_CONTACTS
} from "../constants/action-types"

export default (state = [], action) => {
  switch (action.type) {
    case ADD_CONTACTS:
      // console.log(action.payload.users.users)
      let allContacts = action.payload.users.users
      return {
        ...state,
        contacts: allContacts
      }
    
    case ADD_CONTACT:
      let contact = action.payload.users.user
      return {
        ...state,
        contacts: {
          ...state.contacts,
          [contact.socketId]: { ...contact }
        }
      }

    case REMOVE_CONTACT:
      let contacts = { ...state.contacts }

      delete contacts[action.payload.users.user.socketId]

      return {
        ...state,
        contacts: {
          ...contacts
        }
      }

    case USER_TYPING:
      const { socketId } = action.payload.data;
      return {
        ...state,
        contacts: {
          ...state.contacts,
          [socketId]: {
            ...state.contacts[socketId],
            typing: true
          }
        }
      }

    case USER_STOP_TYPING:
      const sickSocketId = action.payload.data.socketId;
      return {
        ...state,
        contacts: {
          ...state.contacts,
          [sickSocketId]: {
            ...state.contacts[sickSocketId],
            typing: false
          }
        }
      }

    case UNSEEN_MESSAGE:
      let unSeenMessages = state.contacts[action.payload.data].unSeenMessage;
      unSeenMessages++
      return {
        ...state,
        contacts: {
          ...state.contacts,
          [action.payload.data]: {
            ...state.contacts[action.payload.data],
            unSeenMessage: unSeenMessages
          }
        }
      }

    case RESET_UNSEEN_MESSAGES: {
      console.log(action.payload)
      return {
        ...state,
        contacts: {
          ...state.contacts,
          [action.payload]: {
            ...state.contacts[action.payload],
            unSeenMessage: 0
          }
        }

      }
    }

    default:
      return state
  }
  // return state
}