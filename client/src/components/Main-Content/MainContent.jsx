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
       let query;
        if(this.props.location.search != '?' && this.props.location.search != '') {
          console.log(true);
          query = this.props.location.search;
         console.log(query);
          
        }


        const axios = require('axios');
        axios.get (query != undefined ? 'http://localhost:5000/api/goods/' + query : 'http://localhost:5000/api/goods/', {
            headers: {
                'Content-type': 'application/json'
            },
            crossDomain: true
          })
          .then( response => {
           
            const data = response.data;
            console.log(response)
            this.setGoods(data);
            
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
                <SortBar history={this.props.history} location={this.props.location}/>
              <div className="main_grid">
                  {this.state.goods.map(good => (
                  <ProductBox
                    key={good._id}
                    imageSrc={good.images[0]}
                    productNameSrc={good.title}
                    priceSrc={good.price}
                    id={good._id}
                    history={this.props.history}
                    discount={good.discount}
                  />
                  ))}
              </div>
            </div>
        );
    }
}