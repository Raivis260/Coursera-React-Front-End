import * as ActionTypes from './ActionTypes';

export const InitialFeedback = {
    firstName: '',
    lastName: '',
    telnum: '',
    email: '',
    agree: false,
    contactType: 'Tel.',
    message: ''
};

export const Feedback = (state, action) =>  {

    switch(action.type) {
        case ActionTypes.ADD_FEEDBACK:
            return {...state};
        default: 
            return state;
    }
}