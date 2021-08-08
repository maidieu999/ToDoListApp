import * as types from './../constants/ActionTypes';

var s4 = () => {
    return Math.floor( (1 + Math.random()) * 0x10000 ).toString(16).substring(1);
}
var generateId = () => {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4()  + s4();
}
var findIndex = (tasks, id) => {
    var result = -1;
    tasks.forEach((task, index) => {
        if(task.id === id) {
            return result = index;
        }
        
    })
    return result;
}
var data = JSON.parse(localStorage.getItem('tasks'))

var initialState = data ? data : [];

var id = 0;
var index = -1;

//state lay tu tren localStorage, action là cái nhận được từ TaskForm được dispatch lên
var myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LIST_ALL:
            return state;
            // break;
        case types.SAVE_TASK:
            
            // var newTask = {
            //     id: generateId(),
            //     name: action.task.name,
            //     status: action.task.status
            // }
            // state.push(newTask);

            var newTask = {
                id: action.task.id ? action.task.id : null,
                name: action.task.name,
                status: action.task.status
            }
            
            if(newTask.id === null) {
                newTask.id = generateId();
                //đẩy vào state cua store
                state.push(newTask);
            }else{
                index = findIndex(state, newTask.id);
                state[index] = newTask;
            }
            //luu state len localStorage
            localStorage.setItem('tasks', JSON.stringify(state));

            //copy state ra mot arr moi va tra ve arr moi do
            return [...state];

        case types.UPDATE_STATUS:
            id = action.id;
            index = findIndex(state, id);

            //Cach 1
            // var cloneTask = {...state[index]};
            // cloneTask.status = !cloneTask.status;
            // // state.splice(index, 1);
            // // state.push(cloneTask);
            // state[index] = cloneTask;

            state[index] = {
                ...state[index],
                status: !state[index].status
            }

            localStorage.setItem('tasks', JSON.stringify(state));

            return [...state];
        case types.DELETE_TASK:
            id = action.id;
            index = findIndex(state, id);
            if(index !== -1) {
                state.splice(index, 1)
                localStorage.setItem('tasks', JSON.stringify(state));
            }
            return [...state];
        default: return state;
    }
    // return state;
}
export default myReducer;
//clone task moi = task cu co status toggle la
//xoa task cu, them task moi vao

