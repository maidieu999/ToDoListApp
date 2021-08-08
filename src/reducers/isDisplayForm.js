import * as types from './../constants/ActionTypes';

var initialState = false;

//state lay tu tren localStorage, action là cái nhận được từ TaskForm được dispatch lên
var myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.TOGGLE_FORM:
            state = !state;
            return state;

        case types.CLOSE_FORM:
            state = false;
            return state;
            
        case types.OPEN_FORM:
            state = true;
            return state;
            
        default: return state;
    }
}
export default myReducer;