import * as Actions from '../../actions';
import {API, DEVELOPER} from '../../constants';
import axios from 'axios'

class ApiService {
    constructor(store) {
        this.store = store;
        this.getTasksList = this.getTasksList.bind(this);
        this.addTask = this.addTask.bind(this);
        this.checkToken = this.checkToken.bind(this);
        this.login = this.login.bind(this);
        axios.defaults.headers.common = {};
        axios.defaults.headers.common.accept = 'application/json';
    }

    getTasksList(sortField, sortDirection, page) {
        return new Promise((resolve, reject) => {
            try {
                axios.request({
                    url: `${API}?developer=${DEVELOPER}&sort_field=${sortField}&sort_direction=${sortDirection}&page=${page}`,
                    method: "GET"
                }).then(res => {
                    console.log(res);
                    if (res.data.status === 'ok') {
                        const response = {
                            tasks: res.data.message.tasks,
                            totalTasks: res.data.message.total_task_count,
                            sortField,
                            sortDirection,
                            page
                        };
                        this.store.dispatch(Actions.setTasksList(response));
                        resolve(res)
                    } else {
                        reject(res.status)
                    }

                })
                    .catch(err => reject(err))
            } catch (err) {
                reject(err)
            }

        });

    }

    addTask(username, email, text) {
        let form = new FormData();
        form.append('username', username);
        form.append('email', email);
        form.append('text', text);
        return new Promise((resolve, reject) => {
            try {
                axios.request({
                    url: `${API}create?developer=${DEVELOPER}`,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    data: form
                }).then(res => {
                    resolve(res)
                })
                    .catch(err => reject(err))
            } catch (err) {
                reject(err)
            }
        });


    }


    login(username, password){
        let form = new FormData();
        form.append('username', username);
        form.append('password', password);
        return new Promise((resolve, reject) => {
            try {
                axios.request({
                    url: `${API}login?developer=${DEVELOPER}`,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    data: form
                }).then(res => {
                    this.store.dispatch(Actions.addToken(res.data.message.token));
                    localStorage.setItem('token', res.data.message.token);
                    resolve(res)
                })
                    .catch(err => reject(err))
            } catch (err) {
                reject(err)
            }
        });
    }

    editTask(id, text, status){
        let form = new FormData();
        form.append('text', text);
        form.append('status', status);
        form.append('token', this.store.getState().token.token);
        return new Promise((resolve, reject)=>{
            axios.request({
                url: `${API}edit/${id}?developer=${DEVELOPER}`,
                headers: {
                    'Content-Type': 'application/json'
                },
                method: "POST",
                data: form
            }).then(res=>{
                res.data.status === 'ok' ? resolve() : this.checkToken(res.data)
            })
        })
    }


    checkToken(err){
        return new Promise((res, rej)=>{
            if (err.message.token) {
                this.store.dispatch(Actions.removeToken());
                alert('Токен устарел, пройдите авторизацию заново')
            }
            rej()
        })

    }
}

export default ApiService;