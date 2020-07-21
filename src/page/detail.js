import React, { Component } from 'react';
import Topbar_detail from '../components/topbar-detail';
import style from './detail.module.css';
import my_fetch from '../API/fetch';
import moment from 'moment';
import detail_select from '../img/svg/info.svg';
import detail_outline from '../img/svg/info-outline.svg';
import people_select from '../img/svg/people.svg';
import people_outline from '../img/svg/people-outline.svg';
import comment_select from '../img/svg/comment.svg';
import comment_outline from '../img/svg/comment-outline.svg';
import date_start from '../img/svg/date-from.svg';
import date_end from '../img/svg/date-to.svg';
import going from '../img/svg/check-outline.svg';
import like from '../img/svg/like-outline.svg';
import pic_map from '../img/gmap.png';

class Detail_info extends Component {
    constructor(props){
        super(props);
        this.state = {
            text_show: true,
        };
    }

    show_hidden = (e) => {
        if(this.state.text_show){
            document.getElementById('des_container').style.maxHeight = '812px';
        }
        else{
            document.getElementById('des_container').style.maxHeight = '40px';
        }
        this.setState(state => ({
            text_show: !state.text_show
        }));
    }

    render(){
        const { params, user_list } = this.props;
        console.log(user_list)
        console.log(params)
        let images = [...params.images];
        let description = params.description;
        images = images.map( (item, index) => {
            return (<li key={index}><img src={item}/></li>)
        });
        let participants = [...user_list.participants];
        participants = participants.map( (item, index) => {
            return (<li key={index}><img src={item.avatar} className={style.user_icon}/></li>)
        });
        let likes = [...user_list.likes];
        likes = likes.map( (item, index) => {
            return (<li key={index}><img src={item.avatar} className={style.user_icon}/></li>)
        });
        // let participants = [...user_list.participants];
        // participants = participants.map( (item, index) => {
        //     return (<li key={index}><img src={item.avatar} className={style.user_icon}/></li>)
        // });
        

        let start_date = this.props.begin_time.slice(0, 11);
        let start_time = this.props.begin_time.slice(12);
        let end_date = this.props.end_time.slice(0, 11);
        let end_time = this.props.end_time.slice(12);
        return (
            <React.Fragment>
                <div className={style.detail_tab}>
                    <ul className={ images.length ? style.pics : style.null}>
                        {images}
                    </ul>
                    <div className={style.des_container} id="des_container">
                        {description}
                        {<div className={this.state.text_show ? style.shadow : style.null}></div>}
                        <button onClick={this.show_hidden}>{this.state.text_show ? 'VIEW ALL' : 'Hidden'}</button>
                    </div>
                </div>
                <div className={style.when}>
                    <div className={style.part_title}>When</div>
                    <div className={style.when_content}>
                        <div className={style.date_from}>
                            <div className={style.when_date_bar}>
                                <img src={date_start}/>
                                <p className={style.when_date}>{start_date}</p>
                            </div>
                            <p className={style.when_time}>{start_time}</p>
                        </div>
                        <div>
                            <div className={style.when_date_bar}>
                                <img src={date_end}/>
                                <p className={style.when_date}>{end_date}</p>
                            </div>
                            <p className={style.when_time}>{end_time}</p>
                        </div>
                    </div>
                </div>
                <div className={style.where}>
                <div className={style.part_title}>Where</div>
                <div className={style.where_contain}>
                    <p className={style.where_location}>{params.location}</p>
                    <p className={style.where_location_detail}>{params.location_detail}</p>
                    <img src={pic_map} className={style.where_pic}/>
                </div>
                </div>
                <div className={style.user_list}>
                    <div className={style.user_container} style={{paddingTop : "24px", paddingBottom: "12px"}}>
                        <div className={style.going_likes}>
                            <img src={going} className={style.icon}/>
                            <p>{params.goings_count} going</p>
                        </div>
                        <ul className={style.img_list}>{participants}</ul>
                        <div className={style.user_list_but}>
                            <div className={style.down_tri}></div>
                        </div>
                    </div>
                    <div style={{paddingTop: "12.5px", paddingBottom: "16px"}}>
                        <div className={style.going_likes}>
                            <img src={like} className={style.icon}/>
                            <p>{params.likes_count} likes</p>
                        </div>
                        <ul className={style.img_list}>{likes}</ul>
                        <div className={style.user_list_but}>
                            <div className={style.down_tri}></div>
                        </div>
                    </div>
                </div>
            </React.Fragment>    
        );
    }
}

class Tab extends Component {
    constructor(props){
        super(props);
        this.state = {
            select_index: 0,
        }
    }

    render(){
        let { params } = this.props;
        console.log(params)
        return (
            <React.Fragment>
                <div className={style.tab}>
                    <div className={style.detail_part} onClick={ (e) => {this.setState({select_index: 0})}}>
                        <img src={this.state.select_index === 0 ? detail_select : detail_outline }/>
                        <p className={this.state.select_index === 0 ? style.select : style.not_select}>Details</p>
                    </div>
                    <div className={style.people_part} onClick={ (e) => {this.setState({select_index: 1})}}>
                        <img src={this.state.select_index === 1 ? people_select : people_outline}/>
                        <p className={this.state.select_index === 1 ? style.select : style.not_select}>Participants</p>
                    </div>
                    <div className={style.comment_part} onClick={ (e) => {this.setState({select_index: 2})}}>
                        <img src={this.state.select_index === 2 ? comment_select : comment_outline}/>
                        <p className={this.state.select_index === 2 ? style.select : style.not_select}>Comments</p>
                    </div>
                </div>
                <Detail_info begin_time={this.props.begin_time} end_time={this.props.end_time} params={{...this.props.params}} user_list={this.props.user_list}/>
            </React.Fragment>    
        )
    }
}

export default class Detail extends Component {
    constructor(props){
        super(props);
        this.state = {
            res: {},
            publish_how_long: '',
            publish_text: '',
            sucess: false,
            participants: [],
            likes: [],
            comments: [],
        };
        this.token = this.props.location.state.token;
        this.avatar = this.props.location.state.avatar;
        this.begin_time = this.props.location.state.begin_time;
        this.end_time = this.props.location.state.end_time;
    }

    async componentDidMount() {
        let id = this.props.match.params.id;
        console.log(this.props.location.state)
        let httpUrl = `http://localhost:3000/api/v1/events/${id.slice(1)}`;
        let initObj = {
            headers: {
                'X-BLACKCAT-TOKEN' : this.props.location.state.token,
            }
        };
        let res = await my_fetch(httpUrl, initObj);
        httpUrl = `http://localhost:3000/api/v1/events/${id.slice(1)}/participants`;
        let participants = await my_fetch(httpUrl, initObj);
        httpUrl = `http://localhost:3000/api/v1/events/${id.slice(1)}/likes`;
        let likes = await my_fetch(httpUrl, initObj);
        httpUrl = `http://localhost:3000/api/v1/events/${id.slice(1)}/comments`;
        let comments = await my_fetch(httpUrl, initObj);
        this.setState({res: {...res.event}, sucess: true, participants: [...participants.users], likes: [...likes.users], comments: [...comments.comments]});
    }

    render() {
        let loading = (<div className={style.waiting}>waiting</div>);
        const { res } = this.state;
        let how_long = moment.duration(moment(res.updatedAt).diff(moment()));
        this.state.publish_how_long = how_long["_data"].days;
        if(this.state.publish_how_long < 0){
            this.state.publish_text = `${this.state.publish_how_long} days ago`;
        }
        else{
            this.state.publish_text = 'today';
        }
        let user_list = { participants: this.state.participants, likes: this.state.likes, comments: this.state.comments};
        return ( 
            <div>{ this.state.sucess ? 
                <div>
                    <Topbar_detail avatar={this.avatar} history={this.props.history}/>
                    <div className={style.topic}>
                        <div className={style.channelName}>{res.channel.name}</div>
                            <p className={style.activityName}>{res.name}</p>
                        <div className={style.userPart}>
                            <img src={res.creator.avatar} className={style.userAvatar}/>
                            <div className={style.userInfo}>
                                <p className={style.username}>{res.creator.username}</p>
                                <p className={style.publish}>Published {this.state.publish_text}</p>
                            </div>
                        </div>
                    </div>
                    <Tab params={{...res}} begin_time={this.begin_time} end_time={this.end_time} user_list={user_list}/>
                </div> :
                 loading }
            </div>
        )
    }
}


