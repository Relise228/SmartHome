import React from 'react';
import './AdminProduct.scss';
import { Link } from 'react-router-dom';


export class AdminProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: this.props.product.quantity,
            image:  `https://smarthomeproject.s3.eu-central-1.amazonaws.com/${this.props.product._id}/${this.props.product.images[0]}` ,
            title: this.props.product.title,
            price: this.props.product.price,
            id: this.props.product._id,
            discount: this.props.product.discount,
            productPage: `/smarthome/${this.props.product._id}`
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
                        <div className="order-product_price">{(Math.floor(this.state.price - (this.state.price * (this.state.discount/100))) * this.state.quantity) + " грн"}</div>
                    </div>
               </div>
                
            </div>
        )
    }
}