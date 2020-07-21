import React, { Component } from 'react';
import my_fetch from '../API/fetch';
import style from './search-window.module.css';
import moment from 'moment';

export default class Search extends Component {
    constructor(props){
        super(props);
        this.state = {
            channel: [],
            date_pick_id: -1,
            channel_pick_id: -1,
            search_input: null,
            search_channel_text: '',
            search_date_text: '',
            search_date_from: '',
            search_date_to: '',
            search_text: '',
            line_tip: null,
            select_channel_id: 1,
            select_date_before: '',
            select_date_after: '',
        }
    }

    async componentDidMount() {
        let httpUrl = 'http://localhost:3000/api/v1/channels';
        let initObj = {
            headers: {
               'X-BLACKCAT-TOKEN': this.props.token,
            }
        }
        let res = await my_fetch(httpUrl, initObj);
        this.setState({channel: [{id: 0, name: 'All'}, ...res.channels]});
    }

    datePick = (e) => {
        this.setState({date_pick_id: e.target.tabIndex});
        if(e.target.innerText === 'LATER'){
            this.setState({search_input: (
            <div className={style.inputContainer}>
                <input className={`${style.searchInput} ${style.dateFrom}`} onChange={ (e) => {this.setState({search_date_from: e.target.value})}}/>
                <input className={`${style.searchInput} ${style.dateTo}`} onChange={ (e) => {this.setState({search_date_to: e.target.value})}}/>
                <div className={style.sharpCornar}></div>
            </div>)});
        }
        else{
            this.setState({search_input: null})
        }
        switch(e.target.innerText){
            case 'TODAY':
                this.setState({search_date_text: `in ${moment().format("DD/MM")}`, 
                search_date_from: `${moment().format("DD/MM YYYY")}`, search_date_to: `${moment().add(1, 'd').format("DD/MM YYYY")}`});
            break;
            case 'TOMORROW':
                this.setState({search_date_text: `in ${moment().add(1, 'd').format("DD/MM")}`, 
                search_date_from: `${moment().add(1, 'd').format("DD/MM YYYY")}`, search_date_to: `${moment().add(2, 'd').format("DD/MM YYYY")}`});
            break;
            case 'THIS WEEK':
                this.setState({search_date_text: `from ${moment().startOf('week').format("DD/MM")} to ${moment().endOf('week').format("DD/MM")}`, 
                search_date_from: `${moment().startOf('week').format("DD/MM YYYY")}`, search_date_to: `${moment().endOf('week').add(1, 'd').format("DD/MM YYYY")}`});
            break;
            case 'THIS MONTH':
                this.setState({search_date_text: `in ${moment().format("MMM")}`, 
                search_date_from: `${moment().startOf('month').format("DD/MM YYYY")}`, search_date_to: `${moment().endOf('month').add(1, 'd').format("DD/MM YYYY")}`});
            break;
            case 'ANYTIME':
                this.setState({search_date_text: '', search_date_from: '', search_date_to: '', select_date_after: '', select_date_before: ''});
            break;
        }
        
    }

    channelPick = (e) => {
        this.setState({channel_pick_id: e.target.tabIndex, search_channel_text: e.target.innerText, select_channel_id: e.target.tabIndex});
    }

    commit = (e) => {
        if(this.state.date_pick_id > 0 && !!(this.state.search_date_from || this.state.search_date_to)){
            let reg = /(\d+)\/(\d+)\s+(\d+)/;
            let selectDate_from_reg = reg.exec(this.state.search_date_from);
            let selectDate_to_reg = reg.exec(this.state.search_date_to);
            let selectDate_from = `${selectDate_from_reg[2]}/${selectDate_from_reg[1]} ${selectDate_from_reg[3]}`;
            let selectDate_to = `${selectDate_to_reg[2]}/${selectDate_to_reg[1]} ${selectDate_to_reg[3]}`;
            this.state.select_date_after = selectDate_from;
            this.state.select_date_before = selectDate_to;
        }
        if(this.state.date_pick_id >= 0 && this.state.channel_pick_id >= 0 ){
            console.log(this.state.channel_pick_id, this.state.select_date_after, this.state.select_date_before,this.state.date_pick_id)
            this.props.get_search_query(this.state.channel_pick_id, this.state.select_date_after, this.state.select_date_before, this.state.search_text);
            document.getElementById("sidebar").style.width = "0";
            document.getElementById("main").style.marginLeft= "0";
        }       
    }



    render() {
        let dateParamsList = ['ANYTIME', 'TODAY', 'TOMORROW', 'THIS WEEK', 'THIS MONTH', 'LATER'];
        let dateList = dateParamsList.map( (item, index) => {
            return (<li className={this.state.date_pick_id === index ? style['date-item-pick'] : style['date-item']} key={item} onClick={this.datePick} tabIndex={index}>{item}</li>)
        })
        let channelList = this.state.channel.map( (item, index) => {
            return (<li className={this.state.channel_pick_id === index ? style['channel-item-pick'] : style['channel-item']} key={item.id} onClick={this.channelPick} tabIndex={index}>{item.name}</li>)
        });
        if(this.state.date_pick_id >= 0 && this.state.channel_pick_id >= 0){    
            if(this.state.search_input){        //判断是否选中LATER
                this.state.search_date_text = `from ${this.state.search_date_from} to ${this.state.search_date_to}`;            
            } 
            this.state.search_text= `${this.state.search_channel_text} activities ${this.state.search_date_text}`;
            this.state.line_tip = (<div className={style['line-tip-container']}><p className={style['line-tip']}>{this.state.search_text}</p></div>)
        }
        return (
            <div className={style.sidebar} id="sidebar"> 
                    <div className={style.itemContent}>
                        <p className={style.title}>DATE</p>
                        <ul className={style.itemList}>
                            {dateList}
                        </ul>
                        {this.state.search_input}
                    </div>
                    <div className={style.itemContent} style={{marginTop: '24px'}}>
                    <p className={style.title}>CHANNEL</p>
                        <ul className={style.itemList}>
                            {channelList}
                        </ul>
                    </div>
                    <button className={(this.state.date_pick_id >= 0 && this.state.channel_pick_id >= 0) ? style['search-ready'] : style.search} onClick={this.commit}>
                        SEARCH
                    </button>
                    {this.state.line_tip}
            </div>
        )
    }
}
