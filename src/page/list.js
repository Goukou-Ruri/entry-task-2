import React, { Component } from 'react';
import Topbar from '../component/topbar.js';
import ListItem from '../component/list-item';
import Search from '../component/search-window';
import my_fetch from '../API/fetch';
import style from './list.module.css';


export default class List extends Component {
    constructor(props){
        super(props);
        this.state = {
            resArr: [],
            renderArr: [],
            scrollHigh: 0,
            searchArr: [],
            isSearch: false,
            search_res_count: null,
        };
        this.resArr = [];
    }

    async componentDidMount(){
        console.log(this.props.location.state.token);
            let httpUrl = 'http://localhost:3000/api/v1/events';
            let initObj = {
                headers: {
                'X-BLACKCAT-TOKEN': this.props.location.state.token,
                }
            }
            let res = await my_fetch(httpUrl, initObj);
            this.resArr = [...res.events];
            this.setState({resArr: [...res.events]});
    }

    close = (e) => {
        e.target.blur();
        if(e.target !== document.getElementById("sidebar")){
            document.getElementById("sidebar").style.width = "0";
            document.getElementById("main").style.marginLeft= "0";
        }
    }

    scroll = (e) => {
        let tre = parseInt(this.state.resArr.length/3*2)
        let middle = parseInt(this.state.resArr.length/2);
        let length = this.state.resArr.length;
        if(e.target.scrollHeight-e.target.clientHeight-e.target.scrollTop <= 100){ 
            let scrollHigh = e.target.scrollHeight;
            this.setState( (state) => ({
                resArr: [...state.resArr, ...this.resArr],
                scrollHigh: scrollHigh,
            }));
            if(this.state.scrollHigh < e.target.scrollHeight && this.state.scrollHigh !== 0 && e.target.scrollHeight-e.target.clientHeight-e.target.scrollTop <= 100){
                this.setState( (state) => ({
                    resArr: state.resArr.slice(0, 0.5*length),
                }));
            }
        }   
    }   

    get_search_query = async (channel, after, before, search_text) => {
        let query = '';
        let httpUrl = '';
        let search_tip = null;
        after = new Date(after).getTime();
        before = new Date(before).getTime();
        if(channel !== 0 && !!(after && before)){
            query = `?channels=${channel}&before=${before}&after=${after}`;
        }
        else if(channel !== 0 && !(after && before)){
            query = `?channels=${channel}`;
        }
        else if(channel === 0 && !!(after && before)){
            query = `?before=${before}&after=${after}`;
        }
        else{
            query = '';
        }
        console.log(query)
        if(query){
            httpUrl = `http://localhost:3000/api/v1/events${query}`;

            let initObj = {
                headers: {
                   'X-BLACKCAT-TOKEN': this.props.location.state.token,
                }
            }
            let res = await my_fetch(httpUrl, initObj);
            this.resArr = [...res.events];
            this.setState({resArr: [...res.events], scrollHigh: 0});
        } 
        else{
            httpUrl = `http://localhost:3000/api/v1/events`;
            let initObj = {
                headers: {
                   'X-BLACKCAT-TOKEN': this.props.location.state.token,
                }
            }
            let res = await my_fetch(httpUrl, initObj);
            this.resArr = [...res.events];
            this.setState({resArr: [...res.events], scrollHigh: 0});
        }      
        if(this.state.resArr.length){
            search_tip = (
                <div className={style['search-tip']}>
                    <div className={style['res-with-button']}>
                        <p className={style.resCount}>{this.state.resArr.length} Results</p>
                        <button onClick={this.clear_search}>CLEAR SEARCH</button>
                    </div>
                    <p className={style.resTip}>Searched for {search_text}</p>
                </div>
            )
        }
        else{
            search_tip = (
                <div>
                    <div className={style['search-tip']}>
                        <div className={style['res-with-button']}>
                            <p className={style.resCount}>{this.state.resArr.length} Results</p>
                            <button onClick={this.clear_search}>CLEAR SEARCH</button>
                        </div>
                        <p className={style.resTip}>Searched for {search_text}</p>
                    </div>
                    <div className={style.noActivity}>
                        <div></div>
                        <p>No activity found</p>
                    </div>
                </div>    
            )
        }
        this.setState({search_res_count: search_tip});
    }

    clear_search = () => {
        window.location.reload();
    }

    goto_detail = (id) => {
        this.props.history.push({pathname: `/list:${id}`, state: {...this.props.location.state}});
    }

    render() {
        let userdata = this.props.location.state;
        this.state.renderArr = this.state.resArr.map( (item, index) => {
            return (<ListItem param={item} key={item.name + '' + Math.random()} item-id={item.id} onClick={this.goto_detail}/>);
        }); 
        return (
            <React.Fragment>
                    <Search token={this.props.location.state.token} get_search_query={this.get_search_query}/>
                    <div style={{height: "100%", transition: "margin-left .5s", overflow: "scroll"}} id="main" onFocus={this.close} tabIndex="1" onScroll={this.scroll}>
                        <Topbar avatar={userdata.avatar}/>
                        <div style={{height: "50px", overflow: "hidden"}}></div>
                        {this.state.search_res_count}
                        {this.state.renderArr}
                    </div>
            </React.Fragment>
        )
    }
}
