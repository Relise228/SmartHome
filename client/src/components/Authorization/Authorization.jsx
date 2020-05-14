import React from 'react';
import './Authorization.scss';
import { Link } from 'react-router-dom';


export class Authorization extends React.Component {

    constructor(props) {
        super(props) 
            this.state = {
                email: undefined,
                password: undefined,
                error: undefined
            }
        this.setLogin = this.setLogin.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);
        
    }

    setError(error) {
        this.setState({ error });
    }
    

    setLogin(e) {
        const email = e.currentTarget.value;
        this.setState({ email });
        console.log(this.state.email);
    }

    setPassword(e) {
        const password = e.currentTarget.value;
        this.setState({ password });
        console.log(this.state.password);
    }

    onSubmitForm(e) {
        e.preventDefault();
        const axios = require('axios');

        axios.post('/api/auth', {
            headers: {
                'Content-type': 'application/json'
            },
            email: this.state.email,
            password: this.state.password,
          }
          )
          .then( response => {
            if(response.data.errors){
                this.setError(response.data.errors[0].msg);
                console.log(this.state.error);
            } else {
                console.log(response)
                localStorage.setItem("token", response.data.token);
                console.log(localStorage.token);
                this.props.history.push("/client/profile");
                window.location.reload();
            }
 
          })
          .catch(function (error) {
            console.log(error);
          });

    }

    render() {
        return(
            <div className="wrapper">
               <div className="auth_wrapper">
                   <div className="auth">
                   <p className="auth_text">
                       Авторизація
                   </p>
                   {this.state.error == "Invalid Credentials" ? <p className="registration_error">{this.state.error}</p>: ''}
                   <form className="auth_form"  onSubmit={this.onSubmitForm}>
                       <label htmlFor="" className="auth_input-text ">E-mail</label><input onChange={this.setLogin} className="auth_input input_text" type="text" name="" id=""/><br/>
                        {this.state.error == "Please enter a valid email" ? <p className="registration_error">{this.state.error}</p>: ''}
                       <label htmlFor="" className="auth_input-text">Пароль</label><input onChange={this.setPassword} className="auth_input" type="password" name="" id=""/>
                       {this.state.error == "Password is required" ? <p className="registration_error">{this.state.error}</p>: ''}
                       <p className="registration_text">Якщо у вас немає акаунту<br/>натисніть <Link to='/client/signup'>сюди</Link></p>
                       <button className="auth_button">Вхід</button>
                   </form>
                   </div>
               </div>
            </div>
        )
    }
}