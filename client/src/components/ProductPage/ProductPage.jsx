import React from 'react';
import './ProductPage.scss';
import { ProductBox } from '../ProductBox/ProductBox';

export class ProductPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productID: this.props.match.params.productID,
            code: 0,
            images: [],
            imagesURL: [],
            title: '',
            manufacture: '',
            description: '',
            price: undefined,
            recomendedGoods: []

        }

    }

    componentDidMount() {
        this.fetchProduct();
        this.fetchRecomended();
        console.log(this.state.productID);
    }
    setRecomended(recomendedGoods) {
        this.setState({ recomendedGoods });
    }

    fetchRecomended() {
        const axios = require('axios');
        axios.get(`http://localhost:5000/api/goods/`, {
            headers: {
                'Content-type': 'application/json'
            },
            crossDomain: true
          })
          .then( response => {
            const data = response.data;
            this.setRecomended(data);
            console.log(data);
          })
          .catch(function (error) {
            console.log(error);
          })
          .then(function () {
            // always executed
          });  

    }
   
   
   fetchProduct() {
    const axios = require('axios');
        axios.get(`http://localhost:5000/api/goods/${this.state.productID}`, {
            headers: {
                'Content-type': 'application/json'
            },
            crossDomain: true
          })
          .then( response => {
            const data = response.data;
            this.setStates(response.data.system.images,
                response.data.system.title,
                response.data.system.manufacture,
                response.data.system.description,
                response.data.system.price,
                response.data.system.code);
            console.log(data);
          })
          .catch(function (error) {
            console.log(error);
          })
          .then(function () {
            // always executed
          });  
   }

   setStates(images, title, manufacture, description, price, code){
        this.setState({ images, code, title, manufacture, description, price });
        console.log(this.state.images);
   }


   
   
   
    render() {
        return (
            <div className="wrapper">
                <div className="productpage_wrapper">
                    <div className="product">
                        <div className="product_images">
                           <img className="product_image-main" src={"https://smarthomeproject.s3.eu-central-1.amazonaws.com/"+ this.state.productID + "/" + this.state.images[0] } alt=""/>
                            <div className="bottom_images">
                                <img className="bottom_image" src={"https://smarthomeproject.s3.eu-central-1.amazonaws.com/"+ this.state.productID + "/" + this.state.images[1] } alt=""/>
                                <img className="bottom_image" src={"https://smarthomeproject.s3.eu-central-1.amazonaws.com/"+ this.state.productID + "/" + this.state.images[2] } alt=""/>
                                <img className="bottom_image" src={"https://smarthomeproject.s3.eu-central-1.amazonaws.com/"+ this.state.productID + "/" + this.state.images[3] } alt=""/>
                                <div className="product_buy">
                                   <p className="product_price">{this.state.price + " грн"}</p>
                                   <button className="product_buy-button">Купити</button>
                                </div>
                            </div>
                        </div>
                        <div className="product_info">
                            <h2 className="product_name">{this.state.title}</h2>
                            <p className='product_code'>{"Код товару: " + this.state.code}</p>
                            <p className="product_description">{this.state.description}</p>
                        </div>
                    </div>
                    <div className="product_feedback"></div>
                    <div className="product_recomended">
                        <p className="product_recomended-header">Схожі товари</p>
                        <div className="box_recomended">
                        {this.state.recomendedGoods.map(good => (
                            <ProductBox
                                className="product_box"
                                imageSrc={good.images[0]}
                                productNameSrc={good.title}
                                priceSrc={good.price}
                                id={good._id}
                            />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
