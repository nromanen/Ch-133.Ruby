import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

import FormInput from '../../components/form-input/form-input'
import CustomButton from '../../components/custom-button/custom-button'
import Message from '../../components/message/message'

import './SignUp.scss'
import '../../consts.js'

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nick_name: '',
            email: '',
            password: '',
            ShowMessage: false,
            text: '',
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              "user":{
                  "nick_name": this.state.nick_name,
                  "email": this.state.email,
                  "password": this.state.password,
              }
           })
        };
        fetch(window.signUpUrl, requestOptions)
        .then((response) => {
          if (response.status !== 200)
            this.setState({ ShowMessage: true });
          else {
            this.setState({ ShowMessage: true });
          }
          return response.json();
        })
        .then((data) => {
          if(this.state.ShowMessage){
            this.setState({ text: data.message});
          } else {
            const cookies = new Cookies();
            cookies.set('user-info', data.token, {
              path: '/',
              sameSite: 'none',
              secure: true,
            });
          }
       });
    }


    handleChange = (event) => {
        const { value, name } = event.target;
        this.setState({ [name]: value });
    }

    render() {
        return (
          <div className='sign-up'>
            { this.state.ShowMessage ? <Message text={this.state.text}/> : null }
            <h2>Sign Up</h2>
            <form onSubmit={this.handleSubmit}>
                <FormInput name='nick_name' type='text' value={this.state.nick_name}
                           required handleChange={this.handleChange} label='nick' />
              <FormInput name='email' type='email' value={this.state.email}
               required handleChange={this.handleChange} label='email' />
              <FormInput name='password' type='password'
              value={this.state.password} required
              handleChange={this.handleChange} label='password' />
              <CustomButton type='submit'>SIGN UP</CustomButton>
            </form>
          </div>
        );
    }
}

export default SignUp;
