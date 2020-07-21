import React, { Component } from 'react';
import style from './topbar.module.css';
import home from '../img/svg/home.svg';

export default class Topbar_detail extends Component {

    render() {  
        return (
            <React.Fragment>
                <div className={style.container}>
                    <img src={home} className={style["svg-Layer1"]} onClick={ (e) => {this.props.history.goBack()}}  />
                    <svg id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="#D5EF7F" className={style["svg-Layer2"]} ><title>logo-cat</title><polygon points="26.47 14.44 23.07 19.93 23.07 27.38 25.83 29.84 19.2 29.84 21.89 27.36 21.89 19.72 15.69 10.95 19.62 10.95 21.48 9.19 18.18 4.17 14.73 3.14 15.15 -0.03 9.92 4.17 2.83 17.38 7.78 28.12 5.51 30.53 5.51 31.97 9.26 31.97 10.18 31.48 10.93 31.97 29.94 31.97 29.94 30.25 25.68 25.99 25.68 20.55 27.96 16.84 28.78 16.84 29.2 20.08 30.4 20.08 30.71 14.44 26.47 14.44"/></svg>
                    <img className={style["user-img"]} src={this.props.avatar} alt="头像未上传"/>
                </div>
            </React.Fragment>    
        ) 
    }
}
