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
        // this.onChange = this.onChange.bind(this);
        
    }
    componentDidMount() {
        if(this.props.itemEditing && this.props.itemEditing.id !== null) {
            this.setState({
                id: this.props.itemEditing.id,
                name: this.props.itemEditing.name,
                status: this.props.itemEditing.status,
            })
        }
        else{
            this.onClear();
        }
    }
    
    // static getDerivedStateFromProps(nextProps,  prevState){
    //     //sua
    //     if(prevState !== nextProps.itemEditing) {
    //         return {
    //             id : nextProps.itemEditing.id,
    //             name : nextProps.itemEditing.name,
    //             status : nextProps.itemEditing.status,
    //         };
    //     }
    //     else {
    //         return null;
    //     }
    // }

    componentDidUpdate(prevProps) {
        if(prevProps.itemEditing !== this.props.itemEditing) {
          this.setState({
            id : this.props.itemEditing.id,
            name : this.props.itemEditing.name,
            status : this.props.itemEditing.status,
          });
        }
      }
     
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
        // this.setState(TaskForm.getDerivedStateFromProps(this.props, {
        //     [name]: value
        // }))
        this.setState({
            [name]: value
        })

    }
    // onChange = (event) => {
    //     this.setState({
    //       [event.target.name]: event.target.value
    //     });
    //   }

    onSubmit = (event) => {
        event.preventDefault();
        
        this.props.onSaveTask(this.state)
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
        // var { id } = this.state;
        if(!this.props.isDisplayForm) return null;
        return(
                <div className="panel panel-warning">
                    <div className="panel-heading">
                        <h3 className="panel-title">  { this.state.id ? 'C???p nh???t c??ng vi???c' : 'Th??m C??ng Vi???c'}
                        <span className="fa fa-times-circle text-right" onClick={ this.onCloseForm }></span>
                        </h3>
                        
                    </div>
                    <div className="panel-body">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                        <label>T??n :</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            name="name"
                            // defaultValue={this.state.name}
                            value={this.state.name}
                            onChange={this.onChange}

                            />
                        </div>
                        <label>Tr???ng Th??i :</label>
                        <select 
                            className="form-control" 
                            required="required" 
                            name="status"
                            value={this.state.status}
                            onChange={this.onChange}>
                                <option value={true}>K??ch Ho???t</option>
                                <option value={false}>???n</option>
                        </select>
                        <br />
                        <div className="text-center">
                        <button type="submit" className="btn btn-warning">{this.state.id ? 'L??u l???i' : 'Th??m'}</button>&nbsp;
                        <button type="button" className="btn btn-danger" onClick={() => this.onClear()}>H???y B???</button>
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
        isDisplayForm: state.isDisplayForm,
        itemEditing: state.itemEditing,
    }
}

//tham so thu hai la action de dispatch 
const mapDispatchToProps = (dispatch) => {
    return {
        onSaveTask: (task) => {
            //dispatch de reducer phan tich action duoc lay tu actions nay
            dispatch(actions.saveTask(task));
        },
        onCloseForm: () => {
            dispatch(actions.closeForm());
        },
        
        
    }
}
//=> action ???? ???????c chuy???n th??nh props TaskForm, ch??? c???n g???i action onAddTask k??m tham s??? l?? 1 task th?? n?? s??? dispatch(chuy???n) action n??y l??n tr??n reducer ????? ph??n t??ch, g???i n?? ??? onsubmit khi submit form

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm)

