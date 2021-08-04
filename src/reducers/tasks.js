import * as types from './../constants/ActionTypes';

var s4 = () => {
    return Math.floor( (1 + Math.random()) * 0x10000 ).toString(16).substring(1);
}
var generateId = () => {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4()  + s4();
}

var data = JSON.parse(localStorage.getItem('tasks'))

var initialState = data ? data : [];

//state lay tu tren localStorage, action là cái nhận được từ TaskForm được dispatch lên
var myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LIST_ALL:
            return state;
            // break;
        case types.ADD_TASK:
            console.log(action) 
            var newTask = {
                id: generateId(),
                name: action.task.name,
                status: action.task.status  //=== 'true' ? true : false
            }
            //đẩy vào state cua store
            state.push(newTask);
            //luu state len localStorage
            localStorage.setItem('tasks', JSON.stringify(state));

            //copy state ra mot arr moi va tra ve arr moi do
            return [...state];

        
        default: return state;
    }
    // return state;
}
export default myReducer;