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
        this.onCklick = this.onCklick.bind(this);
  
        
    }
     onCklick() {
        
         this.props.history.push(this.state.productPage);
         window.location.reload();
         window.scrollTo(0, 0);
     }
   
    

    render(){
        return (
            <div className="box">
                <img className="productImage" src={this.state.image} alt={this.props.imageSrc}/>
                <div className="productName"><Link to={this.state.productPage} >{this.props.productNameSrc}</Link></div>
                <div className="productPrice">{this.props.priceSrc} грн</div>
                <button className="buyButton" onClick={this.onCklick}>
                    Купити
                </button>
            </div>
        );
    }
}