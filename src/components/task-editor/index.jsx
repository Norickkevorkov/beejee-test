import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField'
import Button from "@material-ui/core/Button";

class TaskEditor extends Component{
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.cancelChanges = this.cancelChanges.bind(this);
    }

    componentDidMount() {
        this.setState({text: this.props.text})
    }

    handleChange = name => event => {
        this.setState({ ...this.state, [name]: event.target.value });
    };
    cancelChanges(){
        this.setState({text: this.props.text});
    }

    render() {
        return (
            <div className={'task-editor'}>
                <TextField
                    value={this.state.text}
                    multiline
                    onChange={this.handleChange('text')}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    fullWidth
                />
                <div className={'task-editor-buttons'}>
                    <Button
                        variant={'contained'}
                        color={'primary'}
                        onClick={()=>this.props.editTask(this.props.id, this.state.text, this.props.checked)}
                    >Сохранить</Button>
                    <Button
                        color={'secondary'}
                        onClick={this.cancelChanges}
                    >Отменить</Button>
                </div>

            </div>
        );
    }
}

export default TaskEditor;