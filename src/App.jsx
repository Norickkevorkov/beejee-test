import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './primitives/header'
import Login from './components/login'
import TaskBook from './components/task-book'
import CreateTask from './components/create-task'
import 'typeface-roboto';
import './App.css';
import {addToken, removeToken} from "./actions";



class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false
        };
        this.showLoginScreen = this.showLoginScreen.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.logout = this.logout.bind(this);
    }
    componentWillMount() {
        if(localStorage.getItem('token')) this.props.setToken(localStorage.getItem('token'))
    }

    showLoginScreen(){
        this.setState({isShow: true})
    }

    logout(){
        localStorage.removeItem('token');
        this.props.removeToken();
    }

    closeModal(){
        this.setState({isShow: false})
    }

    render(){
        return (
            <div className="App">
                <Header logout={this.logout} showLoginScreen={this.showLoginScreen} isLogin={this.props.token.token}/>
                <Login closeModal={this.closeModal} isShow={this.state.isShow} services={this.props.services}/>
                <CreateTask services={this.props.services}/>
                <TaskBook services={this.props.services}/>
            </div>
        );
    }

}

const mapStateToProps = state => ({
    token: state.token
});

const mapDispatchToProps = dispatch => {
    return {
        setToken: token => dispatch(addToken(token)),
        removeToken: () => dispatch(removeToken())
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
