import React from 'react';
import { Navigate } from 'react-router-dom';

import FormInput from '../components/form-input'
import CustomButton from '../components/custom-button'
import Message from '../components/message'

import './SingIn.scss'

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            ShowMessage: false,
            text: '',
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        const url = 'http://localhost:3000/users/sign_in'
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              "user":{
                  "email": this.state.email,
                  "password": this.state.password,
              }
           })
        };
        fetch(url, requestOptions)
        .then((response) => {
          if (response.status == 422)
            this.setState({ ShowMessage: true });
          else {
            this.setState({ ShowMessage: false });
            window.location = '/HomePage';
          }
          return response.json();
        })
        .then((data) => {
          this.setState({ text: data.message });
          console.log(data.token);
       });
    }

    handleChange = (event) => {
        const { value, name } = event.target;
        this.setState({ [name]: value });
    }

    render() {
        return (
          <div className='sign-in'>
            { this.state.ShowMessage ? <Message text={this.state.text}/> : null }
            <h2>Sign In</h2>
            <form onSubmit={this.handleSubmit}>
              <FormInput name='email' type='email' value={this.state.email}
               required handleChange={this.handleChange} label='email' />
              <FormInput name='password' type='password'
              value={this.state.password} required
              handleChange={this.handleChange} label='password' />
              <CustomButton type='submit'>SIGN IN</CustomButton>
            </form>
          </div>
        );
    }
}

export default SignIn;
