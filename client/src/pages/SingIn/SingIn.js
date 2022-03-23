import React from 'react';
import Cookies from 'universal-cookie';
import FormInput from 'components/form-input/form-input'
import CustomButton from 'components/custom-button/custom-button'
import Message from 'components/message/message'
import CookieRefresh from 'components/cookie-refresh.js'
import LoggedContext from 'context'
import { withTranslation } from 'react-i18next';
import "i18n";
import './SingIn.scss'
import 'consts.js'

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            showMessage: false,
            text: '',
            token: false,
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        const cookies = new Cookies();
        const language = cookies.get('i18next');
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-lang': language },
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
            this.setState({ showMessage: true });
          else {
            this.setState({ showMessage: false });
          }
          return response.json();
        })
        .then((data) => {
          if(this.state.showMessage){
            this.setState({ text: data.message });
          } else {
            this.setState({ token: true });
            cookies.set('user-info', data.token, {
              path: '/',
              sameSite: 'Strict',
              secure: true,
            });
            this.context.setLogged(true);
          }
       });
    }

    handleChange = (event) => {
        const { value, name } = event.target;
        this.setState({ [name]: value });
    }

    static contextType = LoggedContext;

    render() {
      const { t } = this.props;
        return (
          <LoggedContext.Consumer>
            {({logged, setLogged}) => (
              <div className='sign-in'>
                { this.state.showMessage ? <Message text={this.state.text}/> : null }
                { this.state.token ? <CookieRefresh/> : null } {/*if fetch returns token then we can render a component by first time and run UseEffect hook in component*/}
                <h2>{t("singIn.head")}</h2>
                <form onSubmit={this.handleSubmit}>
                  <FormInput name='email' type='email' value={this.state.email}
                   required handleChange={this.handleChange} label={t("singIn.email")} />
                  <FormInput name='password' type='password'
                  value={this.state.password} required
                  handleChange={this.handleChange} label={t("singIn.password")} />
                  <CustomButton type='submit'>{t("singIn.button")}</CustomButton>
                </form>
              </div>
            )}
         </LoggedContext.Consumer>
        );
    }
}

SignIn.contextType = LoggedContext
export default withTranslation()(SignIn)
