import React from "react";
import { MainContent } from "../Main-Content";



export class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            order: 'price',
            priceFrom: 0,
            priceTo: 10000
        }
    }

    render() {
        return(
            <div className="main">
                <div className="wrapper">
                    <MainContent/>
                </div>
            </div>
        );
    }
}