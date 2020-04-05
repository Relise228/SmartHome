import React from 'react';
import './OrderBox.scss';
import { OrderProduct } from '../OrderProduct';

const ConfirmedOrder = {
    color: "green",
  }

  const WaitingOrder = {
    color: "red",
  }
  

export class OrderBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numberOrder: this.props.order.number,
            status: this.props.order.status,
            totalPrice: this.props.order.totalPrice,
            date: this.props.order.date,
            longInfo: false
        }
        
        this.dateSTR = new Date(this.state.date);
        this.togleShortInfo = this.togleShortInfo.bind(this);
    }
    

    componentDidMount() {
        console.log(this.state.status)
    }

    togleShortInfo() {
       if(this.state.longInfo === false)
            this.setState({ longInfo: true });
        else
        this.setState({ longInfo: false });
    }

    render() {
        return (
            <div>
                <div className="order_short" onClick={this.togleShortInfo}>
                    <div className="order_number">{"№ " + this.state.numberOrder}</div>
                    <div className="order_date">{this.dateSTR.getDate() + "." + (this.dateSTR.getMonth() + 1) + '.' + this.dateSTR.getUTCFullYear() + 
                    ' ' + this.dateSTR.getHours() + ':' + this.dateSTR.getMinutes()}</div>
                    <div className="order_total-price">{this.state.totalPrice + " грн"} </div>
                    <div className="order_status" style={this.state.status == "Confirmed" ? ConfirmedOrder :  WaitingOrder}>{this.state.status} </div>
                </div>
                <div className="order_full">
                    {this.props.order.products.map(product => (
                        <OrderProduct product={product} longInfo={this.state.longInfo}/>
                    ))}
                </div>
            </div>
        )
    }
}