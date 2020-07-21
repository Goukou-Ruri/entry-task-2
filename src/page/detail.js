import React, { Component } from 'react';
import Topbar_detail from '../component/topbar_detail';
import style from './detail.module.css';
import my_fetch from '../API/fetch';
import moment from 'moment';
import detail_select from '../img/svg/info.svg';
import detail_outline from '../img/svg/info-outline.svg';
import people_select from '../img/svg/people.svg';
import people_outline from '../img/svg/people-outline.svg';
import comment_select from '../img/svg/comment.svg';
import comment_outline from '../img/svg/comment-outline.svg';

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
        let images = [...this.props.images];
        let description = this.props.description;
        images = images.map( (item, index) => {
            return (<li key={index}><img src={item} /></li>)
        });
        return (
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
                <Detail_info images={[...params.images]} description={params.description}/>
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
        };
        this.token = this.props.location.state.token;
        this.avatar = this.props.location.state.avatar;
    }

    async componentDidMount() {
        console.log(this.props.location.state)
        let httpUrl = `http://localhost:3000/api/v1/events/${this.props.match.params.id.slice(1)}`;
        let initObj = {
            headers: {
                'X-BLACKCAT-TOKEN' : this.props.location.state.token,
            }
        };
        let res = await my_fetch(httpUrl, initObj);
        this.setState({res: {...res.event}, sucess: true});
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
                    <Tab params={{...res}}/>
                </div> :
                 loading }
            </div>
        )
    }
}


