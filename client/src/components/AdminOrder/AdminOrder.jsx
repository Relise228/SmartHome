import React from 'react';
import './AdminOrder.scss';
import { AdminProduct } from '../AdminProduct';

const ConfirmedOrder = {
    color: "green",
  }

  const FinishedOrder = {
    color: "#0803F3",
  }
const InDeliveryOrder = {
    color: "#206EBC",
}


export class AdminOrder extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            date: this.props.order.date,
            products: [],
            longInfo: false
        }

        this.dateSTR = new Date(this.state.date);
        this.fetchProducts = this.fetchProducts.bind(this);
        this.togleShortInfo = this.togleShortInfo.bind(this);

        this.toDelivery = this.toDelivery.bind(this);
        
        
    }

    componentDidMount() {
        this.fetchProducts();
    }


    fetchProducts() {
        const axios = require('axios');
        this.props.order.products.map(product => {
            axios.get(`http://localhost:5000/api/goods/${product.product}`, {
            headers: {
                'Content-type': 'application/json'
            },
            crossDomain: true
          })
          .then( response => {
            
            const products = this.state.products.concat(response);
            this.setProducts(products);
            console.log(this.state.products);
            
            
          })
          .catch(function (error) {
            console.log(error);
          });  
         });

         
    }

        setProducts(products) {
            this.setState({ products });
        }
        getFinishedOrder() {
            console.log("getFinishedOrder");
        }
        getInDeliveryOrder() {
            console.log("getInDelivery");
        }

        togleShortInfo() {
            if(this.state.longInfo === false)
                 this.setState({ longInfo: true });
             else
             this.setState({ longInfo: false });
         }

         toDelivery()  {
            console.log('asdasdasd');

            const axios = require('axios');
        
        this.data = {
            orderId: this.props.order._id
        }

        axios.post('http://localhost:5000/api/admin/orders/toDelivery', this.data, {
            headers: {
                'x-auth-token': localStorage.token,
                'Content-type': 'application/json'
            }
          }
          )
          .then( response => {
                window.location.reload();
          })
          .catch(function (error) {
            console.log(error);
          });

         }


      

    render() {
        return(
            <div className="aorder" onClick={this.togleShortInfo}>
                <div className="aorder_info">
                    <div className="aorder_number">{"№" + this.props.order.number}</div>
                    <div className="aorder_date">
                        {this.dateSTR.getDate() + "." 
                        + (this.dateSTR.getMonth() + 1) + '.'
                         + this.dateSTR.getUTCFullYear() + 
                        ' ' + this.dateSTR.getHours() + ':'
                         + this.dateSTR.getMinutes()}</div>
                    <div className="aorder_status" style={this.props.order.status === "Confirmed" ? ConfirmedOrder :
                this.props.order.status === "Finished" ? FinishedOrder : this.props.order.status === "In delivery" ?
                InDeliveryOrder : ''}>{this.props.order.status}</div>
                    <div className="aorder_price">{Math.floor(this.props.order.totalPrice) + " грн"}</div>
                </div>
               { this.state.longInfo ? <div className="aorder_detail">
                    <div className="aorder_client">
                        <div className="aorder_client-name">{this.props.order.client.name}</div>
                        <div className="aorder_client-telephone">{this.props.order.client.telephoneNumber}</div>
                        <div className="aorder_client-email">{this.props.order.client.email}</div>
                    </div>
                    <div className="aorder_products">

                        {this.state.products.map(product => (
                            <AdminProduct  key={product.data.system._id} product={product.data.system} longInfo={this.state.longInfo}/>
                        ))}
                    </div>
                    {this.props.buttonToDelivery ? <button className="button-toDelivery" onClick={this.toDelivery}>To delivery</button> : ''}
                </div> : ''}
                
            </div>
        )
    }
}