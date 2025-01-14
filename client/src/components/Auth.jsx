/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */

import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

const AuthStyle = styled.div`

`;
class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      credentials: <a href="/google"> Login </a>,
      isLoggedIn: false,
      username: '',
      email: '',
      id: '',
      message: '',
    };

  }

  componentDidMount() {
    console.log('hello from auth');
    //console.log(this.props.logInInfo);
    return axios.get('/testing') //checks to see if user is logged in
      .then(data => {
        //console.log(data.data);
        if (data.data.displayName) {
          this.setState({credentials: <a href="/logout"> Logout </a>, isLoggedIn: true, username: data.data.displayName, email: data.data.email, id: data.data.id, message: 'Logged in as '});
        } else {
          this.setState({credentials: <a href="/google"> Login </a>, isLoggedIn: false, username: '', email: '', id: '', message: ''});
        }
      })
      .then(()=>{
        axios.get(`/couches/${this.state.id}`)
          .then(data => {
            //console.log(data.data);
            this.props.logInInfo(this.state.isLoggedIn, this.state.username, this.state.email, this.state.id, data.data);
            //this.setState({couches: data.data});
          });
      })
      .catch(err =>{
        console.log(err);
      });
  }


  render() {
    return (
      <AuthStyle>
        <div >
          <h3>{this.state.message} {this.state.username}</h3>
          <h2>{this.state.credentials}</h2>
        </div>
      </AuthStyle>
    );
  }
}

export default Auth;
