import React from 'react';
import './CartProduct.scss';
import { Link } from 'react-router-dom';

export class CartProduct extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            image:  `https://smarthomeproject.s3.eu-central-1.amazonaws.com/${this.props.product.product._id}/${this.props.product.product.images[0]}`,
            productPage: `/smarthome/${this.props.product.product._id}`,
            quantity: this.props.product.quantity,
            price: this.props.product.product.price,
            discount: this.props.product.product.discount



        }

        this.inputRef = React.createRef();
        this.refPrice = React.createRef();

        this.plusCount = this.plusCount.bind(this);
        this.minusCount = this.minusCount.bind(this);
        this.removeProduct = this.removeProduct.bind(this);
    }

    componentDidMount() {
        this.props.setPrice(parseInt(this.refPrice.current.outerText));
    }

    removeProduct() {
        const axios = require('axios');
      
        this.data = {
            productInOrderId: this.props.product._id
        }

        axios.post('http://localhost:5000/api/cart/delete', this.data, {
            headers: {
                'x-auth-token': localStorage.token,
                'Content-type': 'application/json'
            }, 
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

    sendQuantity(value) {
        const axios = require('axios');
        this.data = {
            productInOrderId: this.props.product._id,
            quantity: value 
        }
       

        axios.post('http://localhost:5000/api/cart/change', this.data, {
            headers: {
                'x-auth-token': localStorage.token,
                'Content-type': 'application/json'
            }, 
          }
          )
          .then( response => {
           
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    plusCount(e) {
        this.inputRef.current.value++;
        let newValue = this.inputRef.current.value;
        this.setState({ quantity:  newValue});
        
        this.sendQuantity(newValue);
        
        let discount = this.state.discount/100;
        let oneItemPrice = this.state.price - (this.state.price * discount);
        this.props.setPrice(oneItemPrice);
    }

    minusCount(e) {
        if(this.inputRef.current.value > 1) {
            this.inputRef.current.value--;
            let newValue = this.inputRef.current.value;
            this.setState({ quantity:  newValue});

            this.sendQuantity(newValue);

            let discount = this.state.discount/100;
            let oneItemPrice = this.state.price - (this.state.price * discount);
            this.props.minusTotalPrice(oneItemPrice);
        } 
        
    ;  
    }

    render() {
        return(
            <div className="cart-product_wrapper">
                <div className="cart-product_image-box">
                    <img className="cart-product_image" src={this.state.image} alt=""/>
                </div>
                <div className="cart-product_info-wrapper">
                    <div className="cart-product_info_up">
                        <div className="cart-product_info_name"><Link to={this.state.productPage} className="cart-product_info_name">{this.props.product.product.title}</Link></div>
                        <div className="discount">{'Знижка ' + this.state.discount + '%'}</div>
                        <div className="cart-product_info-remove" onClick={this.removeProduct}>✘</div>
                    </div>
                    <div className="cart-product_info_down">
                        <div className="cart-product_info-count_box">
                            <div className="cart-product_info-count_minplu" onClick={this.minusCount}>-</div>
                            <div className="cart-product_info-count_in">
                                <input type="number" ref = {this.inputRef} defaultValue={this.state.quantity} className="cart-product_info-count_input"/>
                            </div>
                            <div className="cart-product_info-count_minplu" onClick={this.plusCount}>+</div>
                        </div>
                            <div className="cart-product_info_price" ref={this.refPrice}>{ (this.state.price - (this.state.price * (this.state.discount/100)))* this.state.quantity}</div>
                    </div>
                </div>
            </div>
        )
    }
}