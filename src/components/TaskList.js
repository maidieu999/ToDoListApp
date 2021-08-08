import React, { Component } from 'react';
import TaskItem from './TaskItem';
import { connect } from 'react-redux';
import * as actions from './../actions/index';

class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterName: '',
            filterStatus: -1 //all: -1, active: 1, an: 0
        }
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        var filter = {
            name: name === 'filterName' ? value : this.state.filterName,
            status: name === 'filterStatus' ? value : this.state.filterStatus
        }
        this.props.onFilterTable(filter)

        this.setState({
            [name]: value
        })
    }
    render() {

        var { filterStatus, filterName } = this.state;
        var { tasks, filterTable, keyword, sort } = this.props; //var tasks = this.props.tasks

        if (filterTable) {
            if (filterTable.name) { //!== null, !== undefined, !== 0
                tasks = tasks.filter((task) => {
                    return task.name.toLowerCase().indexOf(filterTable.name.toLowerCase()) !== -1 //-1: khong tim thay
                })
            }
            if (filterTable.status) {
                tasks = tasks.filter((task) => {
                    if (filterTable.status === -1) return tasks;
                    else {
                        return task.status === (filterTable.status === 1) ? true : false;
                    }
                })
            }
        }

        if (keyword) { //!== null, !== undefined, !== 0
            tasks = tasks.filter((task) => {
                return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1 //-1: khong tim thay
            })
        }
        if (sort) {
            if (sort.by === "name") {
                tasks.sort((task1, task2) => {
                    if (task1.name > task2.name) return sort.value;
                    else if (task1.name < task2.name) return -sort.value;
                    else return 0;
                })
            }
            else {
                tasks.sort((task1, task2) => {
                    if (task1.status > task2.status) return -sort.value;
                    else if (task1.status < task2.status) return sort.value;
                    else return 0;
                })
            }

        }

        var elementTask = tasks.map((task, index) => {
            return < TaskItem
                key={task.id}
                index={index}
                task={task}

            />
        })
        return (
            <table className="table table-bordered table-hover mt-15">
                <thead>
                    <tr>
                        <th className="text-center">STT</th>
                        <th className="text-center">Tên</th>
                        <th className="text-center">Trạng Thái</th>
                        <th className="text-center">Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td />
                        <td>
                            <input type="text"
                                className="form-control"
                                name="filterName"
                                value={filterName}
                                onChange={this.onChange}
                            />
                        </td>
                        <td>
                            <select className="form-control"
                                name="filterStatus"
                                value={filterStatus}
                                onChange={this.onChange}
                            >
                                <option value={-1}>Tất Cả</option>
                                <option value={0}>Ẩn</option>
                                <option value={1}>Kích Hoạt</option>
                            </select>
                        </td>
                        <td />
                    </tr>
                    {elementTask}
                    {/* < TaskItem /> */}
                </tbody>
            </table>

        )
    }
}
//Lay state va chuyen no thanh props cuar component nay

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks,  //Tasklist co props la todos chua danh sach tasks
        filterTable: state.filterTable,
        isDisplayForm: state.isDisplayForm,
        keyword: state.search,
        sort: state.sort
    }

}
const mapDispatchToProps = (dispatch, props) => {
    return {
        onFilterTable: (filter) => {
            dispatch(actions.filterTask(filter))

        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskList)