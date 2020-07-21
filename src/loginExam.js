import React from 'react';
import ReactDOM from 'react-dom';
import my_fetch from './API/fetch';

class Login extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        username: '',
        password: '',
      };
    }
  
    onSubmit = async (e) => {
      e.preventDefault();
      let configObj = {
        body: JSON.stringify(this.state),
        method: 'POST'
      }
      let res = await my_fetch('http://localhost:3000/auth/token', configObj); 
      console.log(res);   
    }
  
    render(){
      
      return(
        <form onSubmit={this.onSubmit}>
        <input type="text" name="username" onChange={(e)=>{this.setState({username: e.target.value})}}/>
        <input type="password" name="password" onChange={(e) => {this.setState({password:e.target.value})}} />
        <input type="submit"/>
        </form>
      );
    }
  }

  ReactDOM.render(
    <Login />,
    document.getElementById('root')
  );
  
  