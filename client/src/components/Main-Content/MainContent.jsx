import React from "react";
import './MainContent.scss';
import { SortBar } from "../SortBar";
import { ProductBox } from '../ProductBox/ProductBox';



export class MainContent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        goods: []
      }
    }


     getProduct() {
        const axios = require('axios');
        axios.get('http://localhost:5000/api/goods/', {
            headers: {
                'Content-type': 'application/json'
            },
            crossDomain: true
          })
          .then( response => {
           
            const data = response.data;
            
            this.setGoods(data);
            console.log(this.state.goods);
            
          })
          .catch(function (error) {
            console.log(error);
          })
          .then(function () {
            // always executed
          });  
    }

    componentDidMount() {
      this.getProduct();
    }

    setGoods = goods => {
      this.setState({ goods });

    }


    render() {
        return(
            <div className="main_content">
                <SortBar/>
              <div className="main_grid">
                  {this.state.goods.map(good => (
                  <ProductBox
                    imageSrc={good.images[0]}
                    productNameSrc={good.title}
                    priceSrc={good.price}
                    id={good._id}
                  />
                  ))}
              </div>
            </div>
        );
    }
}