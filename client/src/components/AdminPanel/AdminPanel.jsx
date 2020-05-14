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
            addProduct: false,
            needAorderInfo: false,
            name: undefined,
            price: null,
            count: null,
            discount: null,
            description: undefined,
            manufacture: undefined

        } 

        this.refSearch = React.createRef();
        this.changeSearch = this.changeSearch.bind(this);

        this.getConfirmedOrder = this.getConfirmedOrder.bind(this);
        this.getFinishedOrder = this.getFinishedOrder.bind(this);
        this.getInDeliveryOrder = this.getInDeliveryOrder.bind(this);
        this.getOrderByNumber = this.getOrderByNumber.bind(this);
        this.fetchOrdersByNumber = this.fetchOrdersByNumber.bind(this);
        this.addProduct = this.addProduct.bind(this);

        this.changeName = this.changeName.bind(this);
        this.changePrice = this.changePrice.bind(this);
        this.changeCount = this.changeCount.bind(this);
        this.changeDiscount = this.changeDiscount.bind(this);
        this.changeDescription = this.changeDescription.bind(this);
        this.changeManufacture = this.changeManufacture.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

    }

    setAllOrders(allOrders) {
        this.setState({allOrders});
    }

    getOrderByNumber() {
        console.log("getOrderByNumder");
        this.setState({ needAorderInfo: true });
        this.setState({ addProduct: false });
        this.setState({ needSearch: true });
        this.setState({ orderVisible: true });
        this.setAllOrders([]);


        const axios = require('axios');
        axios.get('/api/admin/orders/all', {
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
    getConfirmedOrder() {
        this.setState({ needAorderInfo: true });
        this.setState({ addProduct: false });
        this.setState({ needSearch: false });
        this.setState({ orderVisible: true });
        this.setAllOrders([]);
        console.log("getConfirmedOrder");
        const axios = require('axios');
        axios.get('/api/admin/orders/confirmed', {
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
        this.setState({ needAorderInfo: true });
        this.setState({ addProduct: false });
        this.setState({ needSearch: false });
        this.setState({ orderVisible: true });
        this.setAllOrders([]);
        console.log("getConfirmedOrder");
        const axios = require('axios');
        axios.get('/api/admin/orders/finished', {
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
        this.setState({ needAorderInfo: true });
        this.setState({ fasle: true });
        this.setState({ addProduct: false });
        this.setState({ needSearch: false });
        this.setState({ orderVisible: true });
        this.setAllOrders([]);
        console.log("getConfirmedOrder");
        const axios = require('axios');
        axios.get('/api/admin/orders/delivery', {
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
        this.setAllOrders([]);
        this.setState({ orderVisible: true });
        
        const axios = require('axios');
        axios.get(`/api/admin/orders/${this.state.searchNumber}`, {
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

    addProduct() {
        this.setState({ needAorderInfo: false });
        this.setState({ addProduct: true });
    }

    changeName(e) {
        const name = e.currentTarget.value;
        this.setState({ name });
    }
    changePrice(e) {
        const price = e.currentTarget.value;
        this.setState({ price });
    }
    changeCount(e){
        const count = e.currentTarget.value;
        this.setState({ count });
    }

    changeDiscount(e){
        const discount = e.currentTarget.value;
        this.setState({ discount });
    }

    changeDescription(e){
        const description = e.currentTarget.value;
        this.setState({ description });
    }

    changeManufacture(e) {
        const manufacture = e.currentTarget.value;
        this.setState({ manufacture });
    }

    onSubmit(e) {
        e.preventDefault();
        if(this.state.name != undefined && this.state.name != '') {
            if(this.state.manufacture != undefined && this.state.manufacture != '') {
                if(this.state.price != null && this.state.price != '') {
                    if(this.state.count != null && this.state.count != '') {
                        if(this.state.discount != null && this.state.discount != '') {
                            if(this.state.description != undefined && this.state.undefined != '') {
                                const axios = require('axios');
                                this.data = {
                                    title: this.state.name,
                                    manufacturer: this.state.manufacture,
                                    quantity: this.state.count,
                                    description: this.state.description,
                                    discount: this.state.discount,
                                    price: this.state.price
                                }
                        
                                axios.post('/api/admin/system', this.data, {
                                    headers: {
                                        'x-auth-token': localStorage.token,
                                        'Content-type': 'application/json'
                                    }
                                  }
                                  )
                                  .then( response => {
                                    console.log(response);
                                  })
                                  .catch(function (error) {
                                    console.log(error);
                                  });
                            }  
                        }  
                    }  
                }  
            }  
        }
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
                    addProduct = {this.addProduct}
                />
              {this.state.needAorderInfo ? <div className='wrapper-aorder-inf '  > 
                   {this.state.needSearch ?  <div className='aorder_search'>
                        <input className="admin_input-search" ref={this.refSearch} value={this.state.searchId} onChange={this.changeSearch} type="text"/> 
                        <button onClick={this.fetchOrdersByNumber} className="admin_button-search">Знайти</button>
                    </div> : ''}
                    {this.state.orderVisible ?  <div className="admin_order-wrapper">
                        {this.state.allOrders ? this.state.allOrders.map(order => (
                        <AdminOrder buttonToFinished={order.status == "In delivery"} toDelivery={this.toDelivery} buttonToDelivery={order.status == "Confirmed"} order={order} key={order._id}/>
                        )) : ''}
                    </div> : ''}
                   
                </div> : ''}
               {this.state.addProduct ? <form onSubmit={this.onSubmit} className='admin_add-product'>
                <label htmlFor="" className="add_product-name">Назва товару<input onChange={this.changeName}  className="add_product-name-input" type="text" name="" id=""/></label> <br/> 
                <label htmlFor="" className="add_product-manufacture">Виробник<input onChange={this.changeManufacture}  className="add_product-manufacture-input" type="text" name="" id=""/></label> <br/> 
                <label htmlFor="" className="add_product-count">Ціна товару<input onChange={this.changePrice} className="add_product-count-input" type="number" name="" id=""/></label> <br/> 
                <label htmlFor="" className="add_product-count">Кількість товару<input onChange={this.changeCount} className="add_product-count-input" type="number" name="" id=""/></label> <br/> 
                <label htmlFor="" className="add_product-discount">Знижка<input onChange={this.changeDiscount} className="add_product-discount-input" type="number" name="" id=""/></label>  <br/>
                <textarea onChange={this.changeDescription} className="add_product-description"></textarea> <br/>
                <button className="add_product-button">Додати</button>
               </form> : ''}

            </div>
                 


            </div>
            
        )
    }
}