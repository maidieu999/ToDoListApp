import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index';

class TaskForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            status: false,
        }
        
    }
    componentDidMount() {
        if(this.props.task) {
            this.setState({
                id: this.props.task.id,
                name: this.props.task.name,
                status: this.props.task.status,
            })
        }
    }
    static getDerivedStateFromProps(nextProps){
        //sua
        if(nextProps && nextProps.task){
          return {
            id : nextProps.task.id,
            name : nextProps.task.name,
            status : nextProps.task.status,
           };
       }
       //them
       else {
           return null;
       }
     }
    // static getDerivedStateFromProps(nextProps){
    //     //them
    //     if(nextProps && nextProps.task){
    //       return {
    //         id : nextProps.task.id,
    //         name : nextProps.task.name,
    //         status : nextProps.task.status,
    //        };
    //    }
    //    //Sua thanh them
    //    else if (nextProps && nextProps.task === null){
    //         return {
    //             id: '',
    //             name: '',
    //             status: false,
    //         };
    //    }
    //    else {
    //        return null;
    //    }
    //  }
     
    onCloseForm = () => {
        this.props.onCloseForm();
    }
    
    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        if(name === 'status') {
            value = target.value === 'true' ? true : false;
        }
        this.setState({
            [name]: value
        });
    }

    onSubmit = (event) => {
        event.preventDefault();
        //gọi props để lấy task trong form này -> tạo action -> đưa lên reducer
        this.props.onAddTask(this.state)
        //cancel & close
        this.onClear();
        this.onCloseForm();
        
    }
    onClear = () => {
        this.setState({
            name: '',
            status: false,
        })
    }
   
    render() {
        var { id } = this.state;
        return(
                <div className="panel panel-warning">
                    <div className="panel-heading">
                        <h3 className="panel-title">  {id ? 'Cập nhật công việc' : 'Thêm Công Việc'}
                        <span className="fa fa-times-circle text-right" onClick={ this.onCloseForm }></span>
                        </h3>
                        
                    </div>
                    <div className="panel-body">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                        <label>Tên :</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            name="name"
                            value={this.state.name}
                            onChange={this.onChange}
                            />
                        </div>
                        <label>Trạng Thái :</label>
                        <select 
                            className="form-control" 
                            required="required" 
                            name="status"
                            value={this.state.status}
                            onChange={this.onChange}>
                        <option value={true}>Kích Hoạt</option>
                        <option value={false}>Ẩn</option>
                        </select>
                        <br />
                        <div className="text-center">
                        <button type="submit" className="btn btn-warning">{id ? 'Lưu lại' : 'Thêm'}</button>&nbsp;
                        <button type="button" className="btn btn-danger" onClick={() => this.onClear()}>Hủy Bỏ</button>
                        </div>
                    </form>
                    </div>
                </div>
        )
    }
}

//dua state tren store thanh props cua class TaskForm
const mapStateToProps = (state) => {
    return {
        // tasks: state.tasks
    }
}

//tham so thu hai la action de dispatch 
const mapDispatchToProps = (dispatch) => {
    return {
        onAddTask: (task) => {
            //dispatch de reducer phan tich action duoc lay tu actions nay
            dispatch(actions.addTask(task));
        }
    }
}
//=> action đã được chuyển thành props TaskForm, chỉ cần gọi action onAddTask kèm tham số là 1 task thì nó sẽ dispatch(chuyển) action này lên trên reducer để phân tích, gọi nó ở onsubmit khi submit form

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm)

