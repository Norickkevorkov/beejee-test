import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from "@material-ui/core/Table";
import Paper from "@material-ui/core/Paper";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Checkbox from "@material-ui/core/Checkbox";
import TableFooter from "@material-ui/core/TableFooter";
import ReactPaginate from 'react-paginate';
import TableSortLabel from '@material-ui/core/TableSortLabel';

import {KeyboardArrowLeft, KeyboardArrowRight} from "@material-ui/icons";
import TaskEditor from "../task-editor";


class TaskBook extends Component{
    constructor(props){
        super(props);
        this.state= {
            isEmpty: true
        };
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleEditChange = this.handleEditChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    getCurrentTasksList(
        sortField=this.props.tasksList.sortField,
        sortDirection=this.props.tasksList.sortDirection,
        page=this.props.tasksList.page
    ){
        return new Promise((resolve, reject) => {
            this.props.services.api.getTasksList(sortField, sortDirection, page)
                .then(()=>{
                    if (this.props.tasksList.tasks.length > 0){
                        this.setState({isEmpty:false})
                    }
                    resolve()
                })
                .catch(()=> reject());
        })
    }

    componentDidMount() {
        this.getCurrentTasksList();
    }

    handleEditChange(id, text, checked){
        console.log(id);
        let status = checked? 10 : 0;
        this.props.services.api.editTask(id, text, status)
            .then(res=>{
                this.getCurrentTasksList()
            })

    }
    createSortHandler(sortField){
        if (this.props.tasksList.sortField === sortField){
            (this.props.tasksList.sortDirection === 'asc')?
                this.getCurrentTasksList(sortField, 'desc'):
                this.getCurrentTasksList(sortField, 'asc')
        } else {
            this.getCurrentTasksList(sortField)
        }

    }
    handlePageChange(currentPage){
        this.getCurrentTasksList(this.props.tasksList.sortField, this.props.tasksList.sortDirection, currentPage.selected+1);
    }

    handleChange(){

    }

    render() {
        return (
            <section className={'task-book'}>
                <Paper className={'root'}>
                    <Table className={'table'}>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <div className={'sort-field'}>
                                        id
                                        <TableSortLabel
                                            active={this.props.tasksList.sortField === 'id'}
                                            direction={this.props.tasksList.sortDirection}
                                            onClick={()=>this.createSortHandler('id')}
                                        />
                                    </div>
                                </TableCell>
                                <TableCell>Задача</TableCell>
                                <TableCell align="right">
                                    <div className={'sort-field'}>
                                        Имя пользователя
                                        <TableSortLabel
                                            active={this.props.tasksList.sortField === 'username'}
                                            direction={this.props.tasksList.sortDirection}
                                            onClick={()=>this.createSortHandler('username')}
                                        />
                                    </div>
                                </TableCell>
                                <TableCell align="right">
                                    <div className={'sort-field'}>
                                        E-mail
                                        <TableSortLabel
                                            active={this.props.tasksList.sortField === 'email'}
                                            direction={this.props.tasksList.sortDirection}
                                            onClick={()=>this.createSortHandler('email')}
                                        />
                                    </div>
                                </TableCell>
                                <TableCell align="right">
                                    <div className={'sort-field'}>
                                        Выполнено
                                        <TableSortLabel
                                            active={this.props.tasksList.sortField === 'isComplete'}
                                            direction={this.props.tasksList.sortDirection}
                                            onClick={()=>this.createSortHandler('isComplete')}
                                        />
                                    </div>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        {
                            (this.state.isEmpty)?(
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            <h6>
                                                Список задач пуст.
                                            </h6>
                                        </TableCell>
                                    </TableRow>

                                </TableBody>
                            ):(
                                <TableBody>
                                    {this.props.tasksList.tasks.map(row => (
                                        <TableRow key={row.id}>
                                            <TableCell component="th" scope="row">
                                                {row.id}
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    (!this.props.token.token)?(
                                                        <p>{row.text}</p>
                                                    ):(
                                                        <TaskEditor editTask={this.handleEditChange} id={row.id} checked={!!row.status} text={row.text}/>
                                                    )
                                                }
                                            </TableCell>
                                            <TableCell align="right">{row.username}</TableCell>
                                            <TableCell align="right">{row.email}</TableCell>
                                            <TableCell align="right">
                                                <Checkbox
                                                    checked={!!row.status}
                                                    onChange={(event, checked)=>this.handleEditChange(row.id, row.text, checked)}
                                                    value={!!row.status}
                                                    color="primary"
                                                    disabled={!this.props.token.token}
                                                    inputProps={{
                                                        'aria-label': 'secondary checkbox',
                                                    }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            )
                        }
                        <TableFooter>
                            <TableRow>
                                <div className={'pagination'}>
                                    <ReactPaginate
                                        pageCount={this.props.tasksList.totalPages}
                                        pageRangeDisplayed={this.props.tasksList.totalPages}
                                        marginPagesDisplayed={4}
                                        onPageChange={this.handlePageChange}
                                        previousLabel={<KeyboardArrowLeft/>}
                                        nextLabel={<KeyboardArrowRight/>}
                                    />
                                </div>

                            </TableRow>
                        </TableFooter>
                    </Table>
                </Paper>
            </section>

        );
    }
}
const mapStateToProps = state=> ({
    tasksList: state.tasksList,
    token: state.token
});

export default connect(mapStateToProps)(TaskBook);