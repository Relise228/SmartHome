import React from 'react';
import './OrderProduct.scss';
import { Link } from 'react-router-dom';


export class OrderProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: this.props.product.quantity,
            image:  `https://smarthomeproject.s3.eu-central-1.amazonaws.com/${this.props.product.product._id}/${this.props.product.product.images[0]}` ,
            title: this.props.product.product.title,
            price: this.props.product.product.price,
            id: this.props.product.product._id,
            productPage: `/smarthome/${this.props.product.product._id}`
        }
    }

   


    render() {
        return(
            <div className={this.props.longInfo ? "order-product_box show_flex" : "order-product_box"}  >
               <div className="order-product_image-box">
                   <img src={this.state.image} alt={this.state.title} className="order-product_image"/>
               </div>
               <div className="order-product_info">
                    <div className="order-product_title"><Link to={this.state.productPage} className="order-product_title">{this.state.title}</Link></div>
                    <div className="order-product_qp">
                        <div className="order-product_quantity">{"Кількість: " + this.state.quantity}</div>
                        <div className="order-product_price">{this.state.price + " грн"}</div>
                    </div>
               </div>
                
            </div>
        )
    }
}