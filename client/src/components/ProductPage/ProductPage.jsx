import React, { useDebugValue } from 'react';
import './ProductPage.scss';
import { ProductBox } from '../ProductBox/ProductBox';
import { ModalImage } from '../ModalImage';

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
            status: undefined,
            recomendedGoods: [],
            reviews: [],
            stock: 1,
            quantity: 1,
            discount: 0,
            priceChange: false,
            nameChange: false,
            stockChange: false,
            descriptionChange: false,
            imageChange: false,
            discountChange: false,
            srcModal: null,
            showModal: false,
            fullLink: [],
            bought: false,
            showpage: false,
            addImg: false
        }
        
        this.areaBox = React.createRef();
        this.area = React.createRef();
        this.feedBackRef = React.createRef();
        this.markRef = React.createRef();
        this.inf = React.createRef();
        this.imgInput = React.createRef();

        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        
        this.addProductInCart = this.addProductInCart.bind(this);
        
        this.leaveFeedBack = this.leaveFeedBack.bind(this);
        
        this.setPriceChange = this.setPriceChange.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.saveChangedPrice = this.saveChangedPrice.bind(this);
        
        this.setTitleChange = this.setTitleChange.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.saveNameStockDiscount = this.saveNameStockDiscount.bind(this);

        this.setStockChange = this.setStockChange.bind(this);
        this.onChangeStock = this.onChangeStock.bind(this);

        this.setDescriptionChange = this.setDescriptionChange.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.saveDescription = this.saveDescription.bind(this);

        this.setDiscountChange = this.setDiscountChange.bind(this);
        this.onChangeDiscount = this.onChangeDiscount.bind(this);

        this.onClickImage = this.onClickImage.bind(this);
        this.closeModal = this.closeModal.bind(this);

        this.setShowPage = this.setShowPage.bind(this);

        this.setVisibility = this.setVisibility.bind(this);
        this.addPhoto = this.addPhoto.bind(this);
        this.sendImg = this.sendImg.bind(this);
    }

    componentDidMount() {
        this.fetchProduct();
        this.fetchRecomended();
        if(localStorage.token) {

        } else{
            this.feedBackRef.current.style.display = "none";
        }
            
    }
    setRecomended(recomendedGoods) {
        this.setState({ recomendedGoods });
    }

    setShowPage (showpage) {
        this.setState({ showpage });
    }

    fetchRecomended() {
        const axios = require('axios');
        axios.get(`http://localhost:5000/api/goods/?perpage=4`, {
            headers: {
                'Content-type': 'application/json'
            },
            crossDomain: true
          })
          .then( response => {
            const data = response.data;
            this.setRecomended(data);
            this.setShowPage(true);
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
            this.setStates(response.data.system.images,
                response.data.system.title,
                response.data.system.manufacture,
                response.data.system.description,
                response.data.system.price,
                response.data.system.code,
                response.data.reviews,
                response.data.system.quantity,
                response.data.system.discount,
                response.data.system.status);
                console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          })
          .then(function () {
            // always executed
          });  
   }

   setStates(images, title, manufacture, description, price, code, reviews, stock, discount,status){
        this.setState({ images, code, title, manufacture, description, price, reviews, stock, discount, status });
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

     if(localStorage.token) {
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
            if(response.data.msg == "Token is not valid") {
                localStorage.removeItem("token");
                localStorage.removeItem("admin");
                this.props.history.push('/client/login');
                window.location.reload();
              }

            console.log(response);
            this.setState({ bought: true});
           
            
        })
        .catch(function (error) {
            console.log(error);
        });

    } else {
        this.props.history.push('/client/login');
    }
   }



   onChangeQuantity(e) {
        const quantity = e.currentTarget.value; 
       this.setState({ quantity });
       console.log(quantity);
   }

   leaveFeedBack() {
       
        this.areaBox.current.style.display = "block";
        

        if(this.area.current.value !== '') {

            const axios = require('axios');
            console.log(this.area.current.value + "\n" + this.markRef.current.value)
            this.data = {
               product: this.state.productID,
               text: this.area.current.value,
               rating: this.markRef.current.value
            }

            axios.post('http://localhost:5000/api/review', this.data, {
                headers: {
                    'x-auth-token': localStorage.token,
                    'Content-type': 'application/json'
                }
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

    
   }

   onChangePrice(e) {
        const value = e.currentTarget.value;
        this.setState({price: value});
   }

   setPriceChange() {
       if(localStorage.admin)
         this.setState({priceChange: true});
   }

   saveChangedPrice() {
    const axios = require('axios');
        
    this.data = {
        systemId: this.state.productID,
        price: this.state.price
    }

    axios.post('http://localhost:5000/api/admin/system/price', this.data, {
        headers: {
            'x-auth-token': localStorage.token,
            'Content-type': 'application/json'
        }
      }
      )
      .then( response => {
          console.log(response);
          this.setState({priceChange: false});
      })
      .catch(function (error) {
        console.log(error);
      });
   }

   setTitleChange() {
    if(localStorage.admin)
        this.setState({nameChange: true});
   }

   onChangeTitle(e) {
    const value = e.currentTarget.value;
    this.setState({title: value});
}

saveNameStockDiscount() {
    const axios = require('axios');
    if(this.state.nameChange) {
        
        
    this.data = {
        systemId: this.state.productID,
        title: this.state.title
    }

    axios.post('http://localhost:5000/api/admin/system/title', this.data, {
        headers: {
            'x-auth-token': localStorage.token,
            'Content-type': 'application/json'
        }
      }
      )
      .then( response => {
          console.log(response);
          this.setState({nameChange: false});
      })
      .catch(function (error) {
        console.log(error);
      });
    } 
    if (this.state.stockChange) {
        
    this.data = {
        systemId: this.state.productID,
        quantity: this.state.stock
    }

    axios.post('http://localhost:5000/api/admin/system/quantity', this.data, {
        headers: {
            'x-auth-token': localStorage.token,
            'Content-type': 'application/json'
        }
      }
      )
      .then( response => {
          console.log(response);
          this.setState({stockChange: false});
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    if (this.state.discountChange) {
        
        this.data = {
            systemId: this.state.productID,
            discount: this.state.discount
        }
    
        axios.post('http://localhost:5000/api/admin/system/discount', this.data, {
            headers: {
                'x-auth-token': localStorage.token,
                'Content-type': 'application/json'
            }
          }
          )
          .then( response => {
              console.log(response);
              this.setState({discountChange: false});
          })
          .catch(function (error) {
            console.log(error);
          });
        }
}

setStockChange() {
    if(localStorage.admin)
        this.setState({stockChange: true});
}

onChangeStock(e) {
    const value = e.currentTarget.value;
    this.setState({stock: value});
}

setDescriptionChange() {
    if(localStorage.admin)
        this.setState({descriptionChange: true});
        

}

onChangeDescription(e) {
    const value = e.currentTarget.value;
    this.setState({description: value});
}

saveDescription() {
    const axios = require('axios');
  
    this.data = {
        systemId: this.state.productID,
        description: this.state.description
    }

    axios.post('http://localhost:5000/api/admin/system/description', this.data, {
        headers: {
            'x-auth-token': localStorage.token,
            'Content-type': 'application/json'
        }
      }
      )
      .then( response => {
          console.log(response);
          this.setState({descriptionChange: false});
      })
      .catch(function (error) {
        console.log(error);
      });
}

setDiscountChange() {
    console.log('ok');
    if(localStorage.admin)

        this.setState({discountChange: true});
        
}

onChangeDiscount(e) {
    const value = e.currentTarget.value;
    this.setState({discount: value});
}

onClickImage(e) {
    const src = e.currentTarget.src;
 
   

   
    

    this.setState({ srcModal: src });
    this.setState({ showModal: true });
        
    
}

closeModal() {
    this.setState({ showModal: false});
    console.log(this.state.showModal);
}

setVisibility() {
    const axios = require('axios');
    let adress = '';
    if(this.state.status == 'Visible') {
        adress = 'http://localhost:5000/api/admin/system/notVisible';
    } else {
        adress = 'http://localhost:5000/api/admin/system/visible';
    }
        
        this.data = {
            systemId:this.state.productID,
        }
        console.log(this.data);

        axios.post(adress, this.data, {
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

addPhoto() {
    this.setState({ addImg: true });
    const axios = require('axios');
    this.data = {
        systemId: this.state.productID
    }

    axios.post('http://localhost:5000/api/admin/system/setId', this.data, {
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

sendImg() {
    console.log(this.imgInput.current.files[0]);
    
    const axios = require('axios');
    let file = this.imgInput.current.files[0];

    let formdata = new FormData();

    formdata.append('image', file);


    this.data = {
        image: formdata
    }

    console.log(this.data)

    axios.post('http://localhost:5000/api/admin/system/image', this.data, {
        headers: {
            'x-auth-token': localStorage.token
        }, 
    }
    )
    .then( response => {

       console.log(response);
    //    window.location.reload();
        
    })
    .catch(function (error) {
        console.log(error);
    });
}

   
    render() {
        return (
            <div className="wrapper">
                
                { this.state.showpage ? 
                <div className="productpage_wrapper">
                    <div className="product">
                        <div className="product_images">
                           <img className="product_image-main" onClick={this.onClickImage} src={"https://smarthomeproject.s3.eu-central-1.amazonaws.com/"+ this.state.productID + "/" + this.state.images[0] } alt=""/>
                            <div className="bottom_images">
                                <img className="bottom_image" onClick={this.onClickImage} src={"https://smarthomeproject.s3.eu-central-1.amazonaws.com/"+ this.state.productID + "/" + this.state.images[1] } alt=""/>
                                <img className="bottom_image" onClick={this.onClickImage} src={"https://smarthomeproject.s3.eu-central-1.amazonaws.com/"+ this.state.productID + "/" + this.state.images[2] } alt=""/>
                                <img className="bottom_image" onClick={this.onClickImage} src={"https://smarthomeproject.s3.eu-central-1.amazonaws.com/"+ this.state.productID + "/" + this.state.images[3] } alt=""/>
                                {this.state.stock !== 0 ? <div className="product_buy">
                                   {this.state.priceChange ? <input className="edit_input" type="text" onChange={this.onChangePrice} value={this.state.price}/> : <p className="product_price" onDoubleClickCapture={this.setPriceChange}>{Math.floor(this.state.price - (this.state.price * (this.state.discount/100))) + " грн"}</p>}
                                   <input type="number" value={this.state.quantity} onChange={this.onChangeQuantity} className="product_count"/>
                                   <button className="product_buy-button" onClick={this.addProductInCart}>Купити</button><br/>
                                   
                                </div> : ''}
                                { this.state.bought ? <div ref={this.inf} className="bought" >Додано в корзину</div> : '' }
                                { this.state.priceChange ? <button className="button-save" onClick={this.saveChangedPrice }>Зберегти</button> : ''}
                                
                            </div>
                        </div>
                        <div className="product_info">
                        { this.state.nameChange ? <input className="edit_input" onChange={this.onChangeTitle} type="text" value={this.state.title}/> : <h2 className="product_name" onDoubleClickCapture={this.setTitleChange}>{this.state.title}</h2>}
                        {localStorage.admin ? <button className="button-visibility" onClick={this.setVisibility}>{this.state.status}</button> : ''}
                        {localStorage.admin && this.state.images.length < 4 ? <button onClick={this.addPhoto} className="button-visibility" >Додати фото</button> : ''}    
                        {this.state.addImg ? <div className="div-photo"><input accept="image/jpeg,image/png" ref={this.imgInput}  type="file"/> <button onClick={this.sendImg} className="send-photo">OK</button></div> : ''}   
                            <p className='product_code'>{"Код товару: " + this.state.code}</p>
                            { this.state.stockChange ? <input className="edit_input" onChange={this.onChangeStock} type="text" value={this.state.stock}/> : <p className="stock" onDoubleClickCapture={this.setStockChange}>{'У наявності: ' + this.state.stock}</p>}
                            { this.state.discountChange ? <input className="edit_input" onChange={this.onChangeDiscount} type="text" value={this.state.discount}/> : <p className="discount_" onDoubleClickCapture={this.setDiscountChange}>{'Знижка: ' + this.state.discount + '%'}</p>}
                            { this.state.nameChange || this.state.stockChange || this.state.discountChange ? <button className="button-save" onClick={this.saveNameStockDiscount}>Зберегти</button> : ''}
                            { this.state.descriptionChange ? <textarea className="edit_area" onChange={this.onChangeDescription} value={this.state.description}></textarea> : <p onDoubleClickCapture={this.setDescriptionChange} className="product_description">{this.state.description}</p>}
                            
                            { this.state.descriptionChange ? <button className="button-save" onClick={this.saveDescription}>Зберегти</button> : ''}
                        </div>
        
                    </div>
                    <div className="product_feedback">
                        <div className="review">Відгуки</div>
                        { this.state.reviews.map(review => (
                            <div key={review._id} className="review_box">
                                <div className="review_header">
                                    <div className="review_name">{review.client.name}</div>
                                    <div className="review_rating">{this.returnStars(review.rating)}</div>
                                </div>
                                <div className="review_body">{review.text}</div>
                            </div>
                        )) }
                    <div className="feedback-area-box"  ref={this.areaBox}>
                        Оцінка<select className="mark-select" ref={this.markRef}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        <textarea className="feedback-area" ref={this.area}></textarea></div>
                    <button className="review_button" ref={this.feedBackRef} onClick={this.leaveFeedBack}>Залишити відгук</button>

                    </div>
                    <div className="product_recomended">
                        <p className="product_recomended-header">Схожі товари</p>
                        <div className="box_recomended">
                        { this.state.recomendedGoods.map(good => (
                            <ProductBox
                                key={good._id}
                                className="product_box"
                                imageSrc={good.images[0]}
                                productNameSrc={good.title}
                                priceSrc={good.price}
                                id={good._id}
                                history={this.props.history}
                                discount={good.discount}
                            />
                            )) }
                        </div>
                    </div>
                    { this.state.showModal && <ModalImage closeModal={this.closeModal} productID = {this.state.productID} firstSrc={this.state.srcModal} images={this.state.fullLink}/> }
                </div>
         : <div className="loading">Loading......</div>}
            </div>  
        );



    }
}
