import React from 'react';
import './Registration.scss';

export class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pib: '',
            password: '',
            phone: '',
            email: '',
            errors: []
        }

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangePib = this.onChangePib.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);
    }


    onChangeEmail(e){
        const email = e.currentTarget.value;
        this.setState({ email });
    }

    onChangePassword(e) {
        const password = e.currentTarget.value;
        this.setState({ password });
    }

    onChangePhone(e){
        const phone = e.currentTarget.value;
        this.setState({ phone });
    }

    onChangePib(e){
        const pib = e.currentTarget.value;
        this.setState({ pib });
    }

    setErrors(errors) {
        this.setState({ errors })
    }

    onSubmitForm(e){
        e.preventDefault();

        const axios = require('axios');

        this.data = {
            name: this.state.pib,
            password: this.state.password,
            telephoneNumber: this.state.phone,
            email: this.state.email
        }
        console.log(this.data);

        axios.post('http://localhost:5000/api/client', this.data, {
            headers: {
                'Content-type': 'application/json'
            }, 
          }
          )
          .then( response => {
            if(response.data.errors) {
                this.setErrors(response.data.errors);
                console.log(response);
            } else if(response.data.token) {
                localStorage.setItem("token", response.data.token);
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
            <div className="wrapper" onSubmit={this.onSubmitForm}>
                <div className="reg_wrapper">
                    <p className="reg_header">Реєстрація</p>
                    <form className="reg_form">
                        <div className="reg_field">
                            <div className="reg_text">ПІБ</div>
                            <input className="reg_input" onChange={this.onChangePib} type="text" id="1"/>
                        </div>
                        <div className="reg_field">
                            <div className="reg_text">Пароль</div>
                            <input className="reg_input" onChange={this.onChangePassword} type="password"  id="2"/>
                        </div>
                        <div className="reg_field">
                            <div className="reg_text">Тел. ном.</div>
                            <div className="reg_phone-box">
                                +38 
                                <input type="number" onChange={this.onChangePhone} className="reg_input-phone"/>
                            </div>                        </div>
                        <div className="reg_field">
                            <div className="reg_text">E-mail</div>
                            <input className="reg_input" onChange={this.onChangeEmail} type="text"  id="3"/>
                        </div>
                        <button className="reg_button">Зареєструватися</button>
                    </form>
                </div>
            </div>
        )
    }
}