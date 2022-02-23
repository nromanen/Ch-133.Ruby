import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

import FormInput from '../../components/form-input/form-input'
import CustomButton from '../../components/custom-button/custom-button'
import Message from '../../components/message/message'

import './ResetPassword.scss'
import '../../consts.js'

class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            password_confirmation: '',
            ShowMessage: false,
            text: '',
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              "user":{
                 // "nick_name": this.state.nick_name,
                  "password": this.state.password,
                  "password_confirmation": this.state.password_confirmation
              }
           })
        };
        fetch(window.resetPasswordUrl, requestOptions)
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
            this.setState({ text: data.message });
          }
       });
    }


    handleChange = (event) => {
        const { value, name } = event.target;
        this.setState({ [name]: value });
    }

    render() {
        return (
          <div className='reset-password'>
            { this.state.ShowMessage ? <Message text={this.state.text}/> : null }
            <h2>Reset password</h2>
            <form onSubmit={this.handleSubmit}>
                <FormInput name='password' type='password'
                           value={this.state.password} required
                           handleChange={this.handleChange} label='password' />
              <FormInput name='password_confirmation' type='password'
              value={this.state.password_confirmation} required
              handleChange={this.handleChange} label='passwordConfirmation' />
              <CustomButton type='submit'>Reset</CustomButton>
            </form>
          </div>
        );
    }
}

export default ResetPassword;
