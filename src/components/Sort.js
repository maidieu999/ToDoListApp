import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index'

class Sort extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         sort: {
    //             by: 'name',
    //             value: 1
    //         }
    //     }
    // }
    // static getDerivedStateFromProps(nextProps){
    //     console.log(nextProps)
    //     them
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
     
    onClick = (sortBy, sortValue) => {
        this.props.onSort({
            by: sortBy,
            value: sortValue
        })
    }
    render() {
        return(
            
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div className="dropdown">
                        <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        Sắp Xếp <span className="fa fa-caret-square-o-down ml-5" />
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                        <li onClick={ ()=> this.onClick('name', 1) }>
                            <div role="button" 
                                className={(this.props.sort.by === 'name' && this.props.sort.value === 1) ? "sort_selected": ""}
                            >
                            <span className="fa fa-sort-alpha-asc pr-5">
                                Tên A-Z
                            </span>
                            </div>
                        </li>
                        <li onClick={ ()=> this.onClick('name', -1) }>
                            <div  role="button"
                                className={(this.props.sort.by === 'name' && this.props.sort.value === -1) ? "sort_selected": ""}

                            >
                            <span className="fa fa-sort-alpha-desc pr-5">
                                Tên Z-A
                            </span>
                            </div>
                        </li>
                        <li role="separator" className="divider" />
                        <li>
                            <div role="button" 
                                onClick={ ()=> this.onClick('status', 1) }
                                className={(this.props.sort.by === 'status' && this.props.sort.value === 1) ? "sort_selected": ""}
                            >   Trạng Thái Kích Hoạt
                            </div>
                        </li>
                        <li>
                            <div role="button" 
                                onClick={ ()=> this.onClick('status', -1) }
                                className={(this.props.sort.by === 'status' && this.props.sort.value === -1) ? "sort_selected": ""}
                            >Trạng Thái Ẩn
                            </div>
                        </li>
                        </ul>
                    </div>
                </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        sort: state.sort
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        onSort: (sort) => {
            dispatch(actions.sortTask(sort))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Sort);