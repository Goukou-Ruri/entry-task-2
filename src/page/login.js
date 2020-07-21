import React, { Component } from 'react';
import style from './login.module.css';
import my_fetch from '../API/fetch.js'

export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            token: '',
            user: {},
        }
    }

    onSubmit = async () => {
        let url = 'http://localhost:3000/auth/token';
        let body = { username: this.state.username, password: this.state.password };
        let init = {
            method: 'POST',
            body: JSON.stringify(body)
        }
        let res = await my_fetch(url, init);
        this.setState({token: res.token, user: {...res.user}});
        if(res.token){
            this.props.history.push({pathname: '/list', state: {...this.state.user, token: this.state.token}});
        }
        else{
            alert('error');
        }

    }

    render() {
        return (
            <div className={style.container}>
                <div className={style.box}>
                    <div className={style["cover-box"]}>
                        <div className={style["text-pic"]}>
                            <div className={style["title-div"]}>
                                <p className={style.h2}>FIND THE MOST LOVED ACTIVITIES</p>
                                <p className={style.h1}>BLACK CAT</p>
                            </div>
                            <div className={style["svg-div"]}>
                                <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="#D5EF7F" className={style["svg-Layer1"]}><title>logo-cat</title><polygon points="26.47 14.44 23.07 19.93 23.07 27.38 25.83 29.84 19.2 29.84 21.89 27.36 21.89 19.72 15.69 10.95 19.62 10.95 21.48 9.19 18.18 4.17 14.73 3.14 15.15 -0.03 9.92 4.17 2.83 17.38 7.78 28.12 5.51 30.53 5.51 31.97 9.26 31.97 10.18 31.48 10.93 31.97 29.94 31.97 29.94 30.25 25.68 25.99 25.68 20.55 27.96 16.84 28.78 16.84 29.2 20.08 30.4 20.08 30.71 14.44 26.47 14.44"/></svg>
                            </div>
                        </div>
                        <div className={style["input-div"]}>
                            <input type="text" className={style.input+' '+style.username} placeholder="username" onChange={ (e) => {this.setState({username: e.target.value})}}/>
                            <input type="password" className={style.input+' '+style.password} placeholder="password" onChange={ (e) => {this.setState({password: e.target.value})}}/>
                        </div>
                    </div>  
                </div>
                <button className={style.button} onClick={this.onSubmit}>SIGN IN</button>
            </div>
        )
    }
}