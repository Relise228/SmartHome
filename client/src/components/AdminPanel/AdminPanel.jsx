import React from 'react';
import './AdminPanel.scss';
import { AdminBar } from '../AdminBar/AdminBar';
import { AdminOrder } from '../AdminOrder';


export class AdminPanel extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            allOrders: [],
            orderVisible: false,
            needSearch: false,
            searchNumber : 0,
            buttonToDelivery: false
        } 

        this.refSearch = React.createRef();
        this.changeSearch = this.changeSearch.bind(this);

        this.getConfirmedOrder = this.getConfirmedOrder.bind(this);
        this.getFinishedOrder = this.getFinishedOrder.bind(this);
        this.getInDeliveryOrder = this.getInDeliveryOrder.bind(this);
        this.getOrderByNumber = this.getOrderByNumber.bind(this);
        this.fetchOrdersByNumber = this.fetchOrdersByNumber.bind(this);


    }

    setAllOrders(allOrders) {
        this.setState({allOrders});
    }

    getOrderByNumber() {
        console.log("getOrderByNumder");
        this.setState({ needSearch: true });
        this.setState({ orderVisible: false });
        this.setState({ buttonToDelivery: false });
        this.setAllOrders([]);

    }
    getConfirmedOrder() {
        this.setState({ needSearch: false });
        this.setState({ orderVisible: true });
        this.setState({ buttonToDelivery: true });
        this.setAllOrders([]);
        console.log("getConfirmedOrder");
        const axios = require('axios');
        axios.get('http://localhost:5000/api/admin/orders/confirmed', {
            headers: {
                'Content-type': 'application/json',
                'x-auth-token': localStorage.token
            },
            crossDomain: true
          })
          .then( response => {
           
          console.log(response);

           this.setAllOrders(response.data);
           
            
          })
          .catch(function (error) {
            console.log(error);
          }); 
    }

    getFinishedOrder() {
        this.setState({ needSearch: false });
        this.setState({ orderVisible: true });
        this.setState({ buttonToDelivery: false });
        this.setAllOrders([]);
        console.log("getConfirmedOrder");
        const axios = require('axios');
        axios.get('http://localhost:5000/api/admin/orders/finished', {
            headers: {
                'Content-type': 'application/json',
                'x-auth-token': localStorage.token
            },
            crossDomain: true
          })
          .then( response => {
           
          console.log(response);

           this.setAllOrders(response.data);
           
            
          })
          .catch(function (error) {
            console.log(error);
          }); 

    }

    getInDeliveryOrder() {
        this.setState({ needSearch: false });
        this.setState({ orderVisible: true });
        this.setState({ buttonToDelivery: false });
        this.setAllOrders([]);
        console.log("getConfirmedOrder");
        const axios = require('axios');
        axios.get('http://localhost:5000/api/admin/orders/delivery', {
            headers: {
                'Content-type': 'application/json',
                'x-auth-token': localStorage.token
            },
            crossDomain: true
          })
          .then( response => {
           
          console.log(response);

           this.setAllOrders(response.data);
           
            
          })
          .catch(function (error) {
            console.log(error);
          }); 
    }

    changeSearch(e) {
        const searchNumber = e.currentTarget.value;
        this.setState({ searchNumber });
    }

    fetchOrdersByNumber() {
        this.setState({ buttonToDelivery: false });
        this.setAllOrders([]);
        this.setState({ orderVisible: true });
        const axios = require('axios');
        axios.get(`http://localhost:5000/api/admin/orders/${this.state.searchNumber}`, {
            headers: {
                'Content-type': 'application/json',
                'x-auth-token': localStorage.token
            },
            crossDomain: true
          })
          .then( response => {
              if(response.data != null  ) {
                if(response.data.status !=="Cart") {
                    const allOrders = this.state.allOrders.concat(response.data);
                    this.setAllOrders(allOrders);
                }
              }
          })
          .catch(function (error) {
            console.log(error);
          }); 

    }

    
   


    render() {
        return( 
            <div className="wrapper">
                <div className="admin_wrapper">
                <AdminBar 
                    getOrder = {this.getOrderByNumber}
                    confirmedOrder = {this.getConfirmedOrder}
                    finishedOrder = {this.getFinishedOrder}
                    inDeliveryOrder = {this.getInDeliveryOrder}
                />
               <div className='wrapper-aorder-inf'> 
                   {this.state.needSearch ?  <div className='aorder_search'>
                        <input className="admin_input-search" ref={this.refSearch} value={this.state.searchId} onChange={this.changeSearch} type="text"/> 
                        <button onClick={this.fetchOrdersByNumber} className="admin_button-search">Знайти</button>
                    </div> : ''}
                    {this.state.orderVisible ?  <div className="admin_order-wrapper">
                        {this.state.allOrders ? this.state.allOrders.map(order => (
                        <AdminOrder toDelivery={this.toDelivery} buttonToDelivery={this.state.buttonToDelivery} order={order} key={order._id}/>
                        )) : ''}
                    </div> : ''}
                </div>

            </div>


            </div>
        )
    }
}