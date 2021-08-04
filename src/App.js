import React, { Component } from 'react';
import TaskForm from './components/TaskForm';
import Control from './components/Control'
import TaskList from './components/TaskList'
import { findIndex } from 'lodash';
import './App.css';
// import { connect } from 'react-redux';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // tasks: this.props.tasks,
            // isDisplayForm: false,
            taskEditing: null,
            filter: {
                filterName: '',
                filterStatus: -1
            },
            keyword: '',
            sortBy: 'name',
            sortValue: 1
        }
    }

    //khi refesh lai page, duoc goi duy nhat 1 lan
    // componentDidMount() {
    //     if(localStorage && localStorage.getItem('tasks')) {
    //         var tasks = JSON.parse(localStorage.getItem('tasks'));
    //        this.setState({
    //             tasks: tasks
    //         })
    //     }
    // }
    
    // onToggleForm = () => { //them
    //     if(this.state.isDisplayForm && this.state.taskEditing !== null) {
    //         this.setState({
    //             isDisplayForm: true,
    //             taskEditing: null
    //         })
    //     }
    //     else{
    //         this.setState({
    //             isDisplayForm: !this.state.isDisplayForm,
    //             taskEditing: null
    //         })
    //     }
    // }
    // onCloseForm = () => {
    //      this.setState({
    //         isDisplayForm: false
    //     })
    // }
    // onShowForm = () => {
    //      this.setState({
    //         isDisplayForm: true
    //     })
    // }

    // onSubmit = (data) => {
    //     var tasks = this.state.tasks;
    //     if(data.id) {
    //         //Edit
    //         var index = this.findIndex(data.id);
    //         tasks[index] = data;

    //     }
    //     else {
    //         //Add
    //         data.id = this.generateId();
    //         tasks.push(data);
    //     }
        
    //     this.setState({
    //         taskEditing: null,
    //     })
    //     this.saveToLocalstorage(tasks);
        
           
    // }
    saveToLocalstorage(tasks) {
        this.setState({
            tasks: tasks
        })
        localStorage.setItem('tasks', JSON.stringify(tasks));    
    }
    findIndex = (id) => {
        var { tasks } = this.state;
        var result = -1;
        tasks.forEach((task, index) => {
            if(task.id === id) {
                return result = index;
            }
            
        })
        return result;
    }
    
    onUpdateStatus = (id) => {
        var { tasks } = this.state;
        var index = findIndex(tasks, function(task) {
            return task.id === id;
        });
        if(index !== -1) {
            tasks[index].status = !tasks[index].status;
            this.saveToLocalstorage(tasks);
        }
    }
    onDeleteTask = (id) => {
        var { tasks } = this.state;
        var index = this.findIndex(id);
        if(index !== -1) {
            tasks.splice(index, 1)
            this.saveToLocalstorage(tasks);
        }
        this.onCloseForm();
    }
    onUpdate = (id) => {
        var { tasks } = this.state;
        var index = this.findIndex(id);
        var taskEditing = tasks[index]
        this.setState({
            taskEditing: taskEditing
        })


        this.onShowForm()
    }
    onFilter = (filterName, filterStatus) => {
        filterStatus = parseInt(filterStatus, 10);
        this.setState({
            filter: {
                filterName: filterName.toLocaleLowerCase(),
                filterStatus: filterStatus
            }
        })

    }
    onSearch = (keyword) =>{
        
        this.setState({
            keyword: keyword.toLowerCase()
        })

    }
    onSort = (sortBy, sortValue) => {
        this.setState({
            sortBy: sortBy,
            sortValue: sortValue
            
        });
        console.log(sortBy, sortValue)
    }

    render() {
        //var tasks = this.state.tasks
        var {
            isDisplayForm, 
            taskEditing, 
            // filter, 
            // keyword, 
            sortBy, 
            sortValue } = this.state;

        

        // if(filter) {
        //     if(filter.filterName) { //!== null, !== undefined, !== 0
        //         tasks = tasks.filter((task) => {
        //             return task.name.toLowerCase().indexOf(filter.filterName) !== -1 //-1: khong tim thay
        //         })
        //     }
            
        //     tasks = tasks.filter((task) => {
        //         if(filter.filterStatus === -1) return tasks;
        //         else{
        //             return task.status === (filter.filterStatus === 1) ? true : false;
        //         }
        //     })
            
        // }
        // if(keyword) {
        //     console.log(keyword)
        //     tasks = tasks.filter((task) => {
        //         return task.name.toLowerCase().indexOf(keyword) !== -1 //-1: khong tim thay
        //     })
        // }
        // if(sortBy === "name") {
        //     tasks.sort((task1, task2) => {
        //         if(task1.name > task2.name) return sortValue;
        //         else if(task1.name < task2.name) return -sortValue;
        //         else return 0;
        //     }) 
        // }
        // else{
        //     tasks.sort((task1, task2) => {
        //         if(task1.status > task2.status) return -sortValue;
        //         else if(task1.status < task2.status) return sortValue;
        //         else return 0;
        //     }) 
        // }
        
        var elementTaskForm = isDisplayForm ? < TaskForm 
                                                    // onSubmit={this.onSubmit} 
                                                    onCloseForm={ this.onCloseForm }
                                                    task = { taskEditing }
                                                /> : '';
        return (
           <div className="container">
                <div className="text-center">
                    <h1>Quản Lý Công Việc</h1>
                    <hr />
                </div>
                <div className="row">
                    <div className={isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ""}>
                        { elementTaskForm }
                    </div>
                    <div className= {isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
                        <button type="button" className="btn btn-primary" onClick={this.onToggleForm}>
                            <span className="fa fa-plus mr-5" />Thêm Công Việc
                        </button>
                    <div className="row mb-5">
                        < Control 
                            onSearch = { this.onSearch }
                            onSort = { this.onSort }
                            sortBy = { sortBy }
                            sortValue = { sortValue }
                            />
                    </div>
                    <div className="row mt-15">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            < TaskList 

                                        onUpdateStatus = { this.onUpdateStatus } 
                                        onDeleteTask = { this.onDeleteTask }
                                        onUpdate = { this.onUpdate }
                                        onFilter = { this.onFilter }/>
                            {/* truyen du lieu tu con sang cha phai dung function de hung lai */}
                        </div>
                    </div>
                    </div>
                </div>
            </div>


        );
    }
}


//Lay state va chuyen no thanh props cuar component nay

// const mapStateToProps = (state) => {
//     return { 
//         tasks: state.tasks  //App co props la todos chua danh sach tasks
//      }
// }

// export default connect(mapStateToProps, null)(App);
export default App;
