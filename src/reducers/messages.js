import { getMessages } from "../static-data";
import { SEND_MESSAGE } from "../constants/action-types";
import _ from "lodash"

// export default function messages(state = getMessages(10), action) {
export default function messages(state = {}, action) {
    switch (action.type) {
        case SEND_MESSAGE:
            const { message, userId, is_me, image } = action.payload;
            const allUserMsgs = state[userId];
            const number = +_.keys(allUserMsgs).pop() + 1 || 0;
            return {
                ...state,
                [userId]: {
                    ...allUserMsgs,
                    [number]: {
                        number,
                        text: message,
                        is_user_msg: is_me,
                        image: image
                    }
                }
            };

        default:
            return state;
    }
}