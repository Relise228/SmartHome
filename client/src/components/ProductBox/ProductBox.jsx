import React from "react";
import './ProductBox.scss';
import { Link } from 'react-router-dom';


export class ProductBox extends React.Component {
     
    constructor(props){
        super(props);
        this.state = {
            image: `https://smarthomeproject.s3.eu-central-1.amazonaws.com/${this.props.id}/${this.props.imageSrc}`,
            productPage: `/smarthome/${this.props.id}`
        }
        this.onClick = this.onClick.bind(this);
  
        
    }
     onClick() {
        
         this.props.history.push(this.state.productPage);
         window.location.reload();
         window.scrollTo(0, 0);
     }
   
    

    render(){
        return (
            <div className="box" onClick={this.onClick}>
                <img className="productImage" src={this.state.image} alt={this.props.imageSrc}/>
                <div className="productName">{this.props.productNameSrc}</div>
                <div className="productPrice">{Math.floor(this.props.priceSrc - (this.props.priceSrc * (this.props.discount/100))) + " грн"}</div>
                <button className="buyButton" >
                    Купити
                </button>
            </div>
        );
    }
}