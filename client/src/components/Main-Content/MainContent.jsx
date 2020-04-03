import React from "react";
import './MainContent.scss';
import { SortBar } from "../SortBar";
import { ProductBox } from "../ProductBox";


export class MainContent extends React.Component {
    

    getProduct() {
        const axios = require('axios');
        axios.get('http://localhost:5000/api/goods/', {
            headers: {
                'Content-type': 'application/json'
            }
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          })
          .then(function () {
            // always executed
          });  
    }
    
    render() {
        return(
            <div className="main_content">
                <button onClick={this.getProduct}>Click</button>
                <SortBar/>
                <ProductBox/>
            </div>
        );
    }
}