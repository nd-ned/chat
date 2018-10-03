import { UNSEEN_MESSAGE, USER_TYPING } from "../constants/action-types"

export default function userInteraction(state = {}, action) {
    switch (action.type) {
        case UNSEEN_MESSAGE:
            console.log('unseen_message')
            return state;
            // const { message, userId, is_me } = action.payload;
            // const allUserMsgs = state[userId];
            // const number = +_.keys(allUserMsgs).pop() + 1 || 0;
            // console.log("%c MESSAGEEEES:", "color: red; font-size: 24px", action )
            // return {
            //     ...state,
            //     [userId]: {
            //         ...allUserMsgs,
            //         [number]: {
            //             number,
            //             text: message,
            //             is_user_msg: is_me
            //         }
            //     }
            // };
        // case USER_TYPING:

        //     console.log('%c PLAYLOAD', "color: yellow; font-size: 50px", ...[action.payload.data])
        //     return {
        //         ...state,
        //         ...[action.payload.data],
        //         typing: true
        //     }
        default:
            return state;
    }
}