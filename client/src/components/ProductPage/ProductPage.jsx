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
            recomendedGoods: [],
            reviews: [],
            quantity: 1

        }

        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.addProductInCart = this.addProductInCart.bind(this);

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
                response.data.system.code,
                response.data.reviews);
            console.log(data);
          })
          .catch(function (error) {
            console.log(error);
          })
          .then(function () {
            // always executed
          });  
   }

   setStates(images, title, manufacture, description, price, code, reviews){
        this.setState({ images, code, title, manufacture, description, price, reviews });
        console.log(this.state.images);
   }

   returnStars(count) {
        
    let i = 0;
    let starsNeed = 5;
    let string = '';
    let blackStars = '';
        
        while(i < count) {
            string += ' ★ ';
            i++;
        };
  
        if(i !== starsNeed) {
            let a = 0;
            let d = starsNeed - i; 
            while(a < d) {
            blackStars += ' ★ ';
            a++;
            }; 
        }

        return(
            <label>
                <label className="blue_star">{string}</label>
                <label className="gray_star">{blackStars}</label>
            </label>
        );
   }

   addProductInCart() {
        const axios = require('axios');

        this.data = {
            systemId:this.state.productID,
            quantity: this.state.quantity
        }
        console.log(this.data);

        axios.post('http://localhost:5000/api/cart', this.data, {
            headers: {
                'x-auth-token': localStorage.token,
                'Content-type': 'application/json'
            }, 
        }
        )
        .then( response => {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
   }

   onChangeQuantity(e) {
        const quantity = e.currentTarget.value; 
       this.setState({ quantity });
       console.log(quantity);
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
                                   <input type="number" value={this.state.quantity} onChange={this.onChangeQuantity} className="product_count"/>
                                   <button className="product_buy-button" onClick={this.addProductInCart}>Купити</button>
                                </div>
                            </div>
                        </div>
                        <div className="product_info">
                            <h2 className="product_name">{this.state.title}</h2>
                            <p className='product_code'>{"Код товару: " + this.state.code}</p>
                            <p className="product_description">{this.state.description}</p>
                        </div>
                    </div>
                    <div className="product_feedback">
                        <div className="review">Відгуки</div>
                        {this.state.reviews.map(review => (
                            <div className="review_box">
                                <div className="review_header">
                                    <div className="review_name">{review.client.name}</div>
                                    <div className="review_rating">{this.returnStars(review.rating)}</div>
                                </div>
                                <div className="review_body">{review.text}</div>
                            </div>
                        ))}
                    <button className="review_button">Залишити відгук</button>




                    </div>
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
