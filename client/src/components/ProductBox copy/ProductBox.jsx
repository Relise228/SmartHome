import React from "react";
import './ProductBox.css';

function ProductImg(props) {
    return (
        <img className="productImage" src={props.imageSrc} />
    );
}
function ProductName(props){
    return (
        <div className="productName">(props.productNameSrc) + ' грн'</div>
    );
}
function ProductPrice(props){
    return(
        <div className="productPrice">props.priceSrc </div>
    );
}

function BuyButton(props){
    return(
        <button className="buyButton" onClick={props.onClick}>
            Купити
        </button>
    );
}

class Box extends React.Component {
    renderImg(imageSrc){
        return (
            <ProductImg
                imageSrc={imageSrc}
            />
        );
    }
    renderProductName(productNameSrc){
        return (
            <ProductName 
                productNameSrc={productNameSrc}
            />
        );
    }

    renderPrice(priceSrc){
        return (
            <ProductPrice
                priceSrc={priceSrc}
            />
        );
    }
    
    renderBuyButton(){
        return(
            <BuyButton onClick={() => this.handleClick()} />
        );
    }
    
    handleClick(){
        //TODO send request to server to add product to cart
    }

    render(){
        return (
            <div className="box">
                {this.renderImg(imageSrc)}
                {this.renderProductName(productNameSrc)}
                {this.renderPrice(priceSrc)}
                {this.renderBuyButton()}
            </div>
        );
    }
}