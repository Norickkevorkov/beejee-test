import React, { Component } from 'react'
import {Modal} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: ''
        };
        this.login = this.login.bind(this);

    }

    handleChange = name => event => {
        this.setState({ ...this.state, [name]: event.target.value });
    };

    login(){
        this.props.services.api.login(this.state.login, this.state.password).then(()=>this.props.closeModal());
    }

    render() {
        return (
            <Modal onBackdropClick={this.props.closeModal} className={'login-screen'} open={this.props.isShow}>
                <div className={'login-screen-content'}>
                    <h4>
                        Вход для администратора
                    </h4>
                    <TextField
                        label={'Login'}
                        id={'login'}
                        value={this.state.login}
                        onChange={this.handleChange('login')}
                    />
                    <TextField
                        label={'Password'}
                        id={'password'}
                        value={this.state.password}
                        onChange={this.handleChange('password')}
                    />
                    <Button
                        className={'login-screen-button'}
                        variant={"outlined"}
                        onClick={this.login}
                    >Войти
                    </Button>
                </div>
            </Modal>
        );
    }
}



export default Login;