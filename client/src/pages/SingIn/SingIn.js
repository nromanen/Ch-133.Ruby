import React from 'react';
import Cookies from 'universal-cookie';

import FormInput from '../../components/form-input/form-input'
import CustomButton from '../../components/custom-button/custom-button'
import Message from '../../components/message/message'

import './SingIn.scss'
import '../../consts.js'

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
        fetch(window.singInUrl, requestOptions)
        .then((response) => {
          if (response.status !== 200)
            this.setState({ ShowMessage: true });
          else {
            this.setState({ ShowMessage: false });
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
            window.location = '/HomePage';
          }
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
