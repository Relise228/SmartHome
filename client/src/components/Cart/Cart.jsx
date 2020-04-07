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
        this.total = 0;
        this.setTotalPrice = this.setTotalPrice.bind(this);
        this.minusTotalPrice = this.minusTotalPrice.bind(this);
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
            console.log(response); 
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
        this.total += price;
        this.totalPrice.current.innerText = ` ${this.total}`;
        this.setPrice(this.total);
    }

    minusTotalPrice(price) {
        this.total -= price;
        this.totalPrice.current.innerText = ` ${this.total}` ;
        this.setPrice(this.total);
    }

    setPrice(totalPrice) {
        this.setState({ totalPrice});
    }

    

    render() {
        return(
            <div className="wrapper">
                <p className="cart_name">Корзина</p>
                <div className="cart_wrapper">
                    {this.state.cartProducts.map(product =>(
                        <CartProduct product={product} setPrice={this.setTotalPrice} minusTotalPrice = {this.minusTotalPrice}/>
                    ))}
                </div>
                <div className="cart_total-price" >
                    <label className="sum">Сума </label>
                    <label ref={this.totalPrice}></label>
                </div>

                <div className="cart_button-box">
                    <button className="cart_button"></button>
                </div>
                
                    
            </div>
        )
    }
}