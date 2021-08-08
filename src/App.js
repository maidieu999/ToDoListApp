import React, { Component } from 'react';
import TaskForm from './components/TaskForm';
import Control from './components/Control'
import TaskList from './components/TaskList'

import { connect } from 'react-redux';
import * as actions from './actions/index'

import './App.css';

class App extends Component {
    
    onToggleForm = () => { //them
        var itemEditing = this.props.itemEditing;
        //dang edit ban them cong viec
        if(itemEditing && itemEditing.id !== '') {
            this.props.onOpenForm()
        }
        //bam them cong viec binh thuong
        else{
            this.props.onToggleForm()
        }

        this.props.onClearTask({
            id: '',
            name: '',
            status: false
        })
    }

    render() {
        return (
           <div className="container">
                <div className="text-center">
                    <h1>Quản Lý Công Việc</h1>
                    <hr />
                </div>
                <div className="row">
                    <div className={ this.props.isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ""}>
                    < TaskForm />
                    </div>
                    <div className= { this.props.isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
                        <button type="button" className="btn btn-primary" onClick={this.onToggleForm}>
                            <span className="fa fa-plus mr-5" />Thêm Công Việc
                        </button>
                    <div className="row mb-5">
                        < Control/>
                    </div>
                    <div className="row mt-15">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            < TaskList />
                           
                        </div>
                    </div>
                    </div>
                </div>
            </div>


        );
    }
}

const mapStateToProps = (state) => {
    //state cua store, state lay ra tu reducers/index.js
    return {
        isDisplayForm: state.isDisplayForm,
        itemEditing: state.itemEditing,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        //actions được import từ file actions ở trên cùng
        onToggleForm: () => {
            dispatch(actions.toggleForm())
            
        },
        
        onOpenForm: () => {
            dispatch(actions.openForm())
        },
        onClearTask: (task) => {
            //dispatch de reducer phan tich action duoc lay tu actions nay
            dispatch(actions.editTask(task));
        },
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);