import React from 'react';
import './ProfilePage.scss';
import { FieldInformation } from '../FieldInformation';
import { HouseInfo } from '../HouseInfo/HouseInfo';
import { OrderBox } from '../OrderBox/OrderBox';


export class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state= {   
            name: undefined,
            telephoneNumber: undefined,
            email: undefined,
            allOrders: [],
            houseInfoVisible: false
            
        }
        
        this.logOut = this.logOut.bind(this);
        this.onHouseDescriptionEdit = this.onHouseDescriptionEdit.bind(this);
        
    }

    componentDidMount() {
        this.getUserInfo();
        this.getUserOrder();
    }
 


    getUserInfo() {
        const axios = require('axios');

        axios.get('http://localhost:5000/api/auth', {
            headers: {
                'x-auth-token': localStorage.token
            } 
          }
          )
          .then( response => {
            this.setInfo(response.data.name,
                response.data.telephoneNumber,
                response.data.email);

          })
          .catch(function (error) {
            console.log(error);
          });
    }

    getUserOrder() {
        const axios = require('axios');

        axios.get('http://localhost:5000/api/order', {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.token
            } 
          }
          )
          .then( response => {
            
            this.setAllOrders(response.data);
            
          })
          .catch(function (error) {
            console.log(error);
          });

    }

    setAllOrders(allOrders) {
        this.setState({allOrders});
    }

    setInfo(name, telephoneNumber, email) {
        this.setState({name, telephoneNumber, email});
    }

   
    
    logOut() {
        localStorage.removeItem("token");
        this.props.history.push('/');
        window.location.reload();
    }

    onChangePIB(value) {
        const axios = require('axios');
        
        axios.post('http://localhost:5000/api/profile/pib', {name: value}, {
            headers: {
                'x-auth-token': localStorage.token,
                'Content-type': 'application/json'
            }
          }
          )
          .then( response => {
              console.log(response);
              window.location.reload();
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    onChangePhone(value) {
        const axios = require('axios');
        
        axios.post('http://localhost:5000/api/profile/telephone', {telephoneNumber: value}, {
            headers: {
                'x-auth-token': localStorage.token,
                'Content-type': 'application/json'
            }
          }
          )
          .then( response => {
              console.log(response);
              window.location.reload();
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    onChangeEmail(value) {
        const axios = require('axios');
        
        axios.post('http://localhost:5000/api/profile/email', {email: value}, {
            headers: {
                'x-auth-token': localStorage.token,
                'Content-type': 'application/json'
            }
          }
          )
          .then( response => {
              console.log(response);
              window.location.reload();
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    
    onHouseDescriptionEdit() {
        if(this.state.houseInfoVisible === false)
            this.setState({houseInfoVisible: true});
        else
            this.setState({houseInfoVisible: false});
    }
    

   
    
    render() {
        return(
            <div className="wrapper">
                <div className="info">
                    <p className="info_header">
                        Особистий кабінет
                    </p>
                    <div className="info_wrapper">
                        <div className='info_order' >
                            <p className="info_text">Історія замовлень</p>
                            <div className={this.state.allOrders[0] ? "info_order-wrapper display" : "info_order-wrapper"}>
                                {this.state.allOrders.map(order => (
                                    <OrderBox key={order._id} order={order} />
                                ))}
                            </div>
                        </div>
                        <div className="info_user">
                            <p className="info_text">Особиста інформація</p>
                                <FieldInformation inf="ПІБ" value={this.state.name} clickBtn={this.onChangePIB}/>
                                <FieldInformation inf="Тел. ном." value={this.state.telephoneNumber} clickBtn={this.onChangePhone}/>
                                <FieldInformation inf="E-mail" value={this.state.email} clickBtn={this.onChangeEmail}/>
                                <HouseInfo onHouseInfoShow={this.onHouseInfoSave} isVisibleInfo={this.state.houseInfoVisible}/>
                            
                            <button onClick={this.onHouseDescriptionEdit} className="info_button-house">Вказати опис будинку</button>
                            <button  onClick={this.logOut} className="info_button-logout">Вихід</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}