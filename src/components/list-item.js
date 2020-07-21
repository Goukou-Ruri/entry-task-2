import React, { Component } from 'react';
import style from './list-item.module.css';
import clock from '../img/svg/time.svg';
import going from '../img/svg/check.svg';
import like from '../img/svg/like.svg';
import dontLike from '../img/svg/like-outline.svg';
import dontGoing from '../img/svg/check-outline.svg';
import moment from 'moment';

export default class ListItem extends Component {
    constructor(props){ 
        super(props);
        this.state = {
            goingMark: null,
            goingText: '',
            likeMark: null,
            likeText: '',
            pic: null
        };
    }

    

    render() {
        if(this.props.param.me_likes){
            this.state.likeMark = (<img src={like} alt="喜欢"/>);
            this.state.likeText = <p>I like it</p>;
        }
        else{
            this.state.likeMark = (<img src={dontLike} alt="不喜欢"/>);
            this.state.likeText = <p>{this.props.param.likes_count} Likes</p>;
        }
        if(this.props.param.me_going){
            this.state.goingMark = ( <img src={going} alt="我去"/>);
            this.state.goingText = <p>I am going!</p>;
        }
        else{
            this.state.goingMark = (<img src={dontGoing} alt="我不去"/>);
            this.state.goingText = <p>{this.props.param.goings_count} Going</p>;
        }
        if(this.props.param.images.length !== 0){
            this.state.pic = (<img className={style["overview-pic"]} src={this.props.param.images[0]}></img>);
        }
        else{
            this.state.pic = (<p></p>);
        }
        let begin_time = `${moment(this.props.param.begin_time).format('DD MMM YYYY HH:mm')}`;
        let end_time = `${moment(this.props.param.end_time).format('DD MMM YYYY HH:mm')}`;
        return (
            <div className={style.container} onClick={ (e) => {this.props.onClick(this.props.param.id, begin_time, end_time)}}>
                <div className={style['userInfo-channel']}>
                   <div className={style.userInfo}>    
                        <img src={this.props.param.creator.avatar} alt="头像未上传"/>
                        <p className={style.username}>{this.props.param.creator.username}</p>
                   </div>
                   <div className={style.channel}>{this.props.param.channel.name}</div>
                </div>
                <div className={style.overview}>
                    <div>
                        <div className={style.activityName}>
                        {this.props.param.name}
                        </div>
                        <div className={style.timeline}>
                            <img src={clock} alt="时钟"/>
                            {/* moment('2020-07-17T01:53:52.549Z').format('DD MMM YYYY HH:mm') */}
                            <p className={style.time}>{`${moment(this.props.param.begin_time).format('DD MMM YYYY HH:mm')} - ${moment(this.props.param.end_time).format('DD MMM YYYY HH:mm')}`}</p>
                        </div>
                    </div>
                    {this.state.pic}    
                </div>
                <div className={style.description}>
                {this.props.param.description}
                </div>
                <div className={style.opt}>
                    <div className={style['go-and-want']}>
                        {this.state.goingMark}
                        {this.state.goingText}
                    </div>
                    <div className={style['go-and-want']}>
                        {this.state.likeMark}
                        {this.state.likeText}
                    </div>
                </div>
            </div>
        )
    }
}
