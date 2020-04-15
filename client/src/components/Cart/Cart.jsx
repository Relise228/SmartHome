import React from 'react';
import './Cart.scss';
import { CartProduct } from '../CartProduct/CartProduct';

export class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cartProducts: [],
            totalPrice: 0
        }
        
        this.totalPrice = React.createRef();
        this.addressBox = React.createRef();
        this.addressInput = React.createRef();
        this.total = 0;
        this.setTotalPrice = this.setTotalPrice.bind(this);
        this.minusTotalPrice = this.minusTotalPrice.bind(this);
        this.confirmOrder =  this.confirmOrder.bind(this);
    }

    

    setCartProducts(cartProducts) {
        this.setState({ cartProducts });
    }

    

    fetchOrders() {
        const axios = require('axios');

        axios.get('http://localhost:5000/api/cart', {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.token
            } 
          }
          )
          .then( response => {
            this.setCartProducts(response.data.products);
          })
          .catch(function (error) {
            console.log(error);
          });
    }



    componentDidMount() {
        this.fetchOrders();
    }

    setTotalPrice(price) {
        this.total += Math.floor(price);
        this.totalPrice.current.innerText = ` ${this.total}`;
        this.setPrice(Math.floor(this.total));
    }

    minusTotalPrice(price) {
        this.total -= Math.floor(price);
        this.totalPrice.current.innerText = ` ${this.total}` ;
        this.setPrice(Math.floor(this.total));
    }

    setPrice(totalPrice) {
        this.setState({ totalPrice: Math.floor(totalPrice)});
    }

    confirmOrder() {

        if(this.state.totalPrice !== 0) {
            this.addressBox.current.style.display = 'flex';

            if(this.addressInput.current.value !== '' ) {

                const axios = require('axios');
                
                this.data = {
                   adress: this.addressInput.current.value
                }

                axios.post('http://localhost:5000/api/cart/confirm', this.data, {
                    headers: {
                        'x-auth-token': localStorage.token,
                        'Content-type': 'application/json'
                    }
                }
                )
                .then( response => {
                    console.log(response);
                    this.props.history.push('/client/profile');
                })
                .catch(function (error) {
                    console.log(error);
                });




               
            }
        }
        

        
        
    }

    

    render() {
        return(
            <div className="wrapper">
                <p className="cart_name">Корзина</p>
                <div className="cart_wrapper">
                    {this.state.cartProducts.map(product =>(                
                        <CartProduct key={product._id}  product={product} setPrice={this.setTotalPrice} minusTotalPrice = {this.minusTotalPrice}/>
                    ))}
                </div>
                <div className="cart_total-price" >
                    <label className="sum">Сума </label>
                    <label ref={this.totalPrice}></label>
                </div>

                <div className="cart_button-box">
                    <div className="cart_address-box" ref={this.addressBox}>
                        <label>Введіть адресу: </label>
                        <input type="text" className="cart_input-address" ref={this.addressInput}/>
                    </div>
                    <button className="cart_button" onClick={this.confirmOrder}>Оформити</button>
                </div>
        
            </div>
        )
    }
}