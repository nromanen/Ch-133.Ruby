import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

import FormInput from '../../components/form-input/form-input'
import CustomButton from '../../components/custom-button/custom-button'
import Message from '../../components/message/message'

import './ResetPasswordEmail.scss'
import '../../consts.js'

class ResetPasswordEmail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            ShowMessage: false,
            text: ''
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              "user":{
                  "email": this.state.email
              }
           })
        };
        fetch(window.resetPasswordEmailUrl, requestOptions)
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
          } else {
            const cookies = new Cookies();
            cookies.set('user-info', data.token, {
              path: '/',
              sameSite: 'none',
              secure: true,
            });
            window.location = '/password';
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
            <h2>Sent reset email</h2>
            <form onSubmit={this.handleSubmit}>
              <FormInput name='email' type='email' value={this.state.email}
               required handleChange={this.handleChange} label='email' />
              <CustomButton type='submit'>Sent</CustomButton>
            </form>
          </div>
        );
    }
}

export default ResetPasswordEmail;
