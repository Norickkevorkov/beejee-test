import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField'
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

class CreateTask extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isValidate: false,
            username: '',
            taskText: '',
            email: ''
        }
    }

    sendTask(){
        this.props.services.api.addTask(this.state.username,this.state.email, this.state.taskText)
            .then(res=> {
                console.log(res);
                this.props.services.api.getTasksList(this.props.sortField, this.props.sortDirection, this.props.page)
                    .then(res=>{
                        this.setState({
                            ...this.state,
                            isValidate: false,
                            username: '',
                            taskText: '',
                            email: ''
                        })
                })
            })
    }

    validate(){
        (this.state.taskText && this.state.email && this.state.username && CreateTask.validateEmail(this.state.email))? this.setState({isValidate: true}): this.setState({isValidate: false})
    }

    handleChange = name => event => {
        this.setState({ ...this.state, [name]: event.target.value },()=>{
            this.validate()
        });
    };
    static validateEmail(email) {
        if (email){
            let re = /\S+@\S+\.\S+/;
            return re.test(email);
        }
        return true

    }

    render() {
        return (
            <section className={'create-task'}>
                <Paper className={'root'}>
                    <h2>Добавить задачу </h2>
                    <div className="text-fields">
                        <TextField
                            multiline
                            id={'task-text'}
                            label={'Введите текст задачи'}
                            className={'text-field'}
                            variant="outlined"
                            fullWidth
                            value={this.state.taskText}
                            onChange={this.handleChange('taskText')}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            id={'username'}
                            label={'Введите имя пользователя'}
                            className={'text-field'}
                            value={this.state.username}
                            onChange={this.handleChange('username')}
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            id={'email'}
                            label={'Введите e-mail'}
                            error={!CreateTask.validateEmail(this.state.email)}
                            className={'text-field'}
                            value={this.state.email}
                            onChange={this.handleChange('email')}
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>
                    <Button
                        color={'primary'}
                        variant={'contained'}
                        disabled={!this.state.isValidate}
                        onClick={()=>this.sendTask()}
                    >
                        Добавить задачу
                    </Button>

                </Paper>

            </section>
        );
    }
}

const mapStateToProps = state => ({
    tasksList: state.tasksList
});


export default connect(mapStateToProps)(CreateTask);