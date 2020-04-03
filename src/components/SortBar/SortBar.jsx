import React from "react";
import './SortBar.scss';


export class SortBar extends React.Component {
   constructor(props) {
       super(props);
       this.state = {
           checked: [],
           priceFrom: 0,
           priceTo: 10000
       }

       this.onChengePriceFrom = this.onChengePriceFrom.bind(this);
       this.onChengePriceTo = this.onChengePriceTo.bind(this);
   }

   onChengePriceFrom (e) {
    const priceFrom = e.currentTarget.value;
    this.setState({ priceFrom });
   } 

   onChengePriceTo (e) {
    const priceTo = e.currentTarget.value;
    this.setState({ priceTo });
   } 

    render() {
        return(
            <div className="main_sortbar">
                <p className="main_sortbar-producer">Виробник</p>
                    <form method="post" >
                            <input type="checkbox" name="producer" value="inels" id="checkbox1" className="check"/>
                            <label htmlFor="checkbox1" className="main_sortbar-producer_item">INELS</label><br/>
                            <input type="checkbox" name="producer" value="fibaro" id="checkbox2" />
                            <label htmlFor="checkbox2" className="main_sortbar-producer_item">FIBARO</label><br/>
                            <input type="checkbox" name="producer" value="aeotec" id="checkbox3"/>
                            <label htmlFor="checkbox3" className="main_sortbar-producer_item">AEOTEC</label><br/>
                            <input type="checkbox" name="producer" value="orvibo" id="checkbox4"/>
                            <label htmlFor="checkbox4" className="main_sortbar-producer_item">ORVIBO</label><br/>
                        <p className="main_sortbar-price">Ціна</p>
                            <label className="label_for-price">від</label>
                            <input type="text"  value={this.state.priceFrom} onChange={this.onChengePriceFrom}  className="main_sortbar-price_input"/><br/>
                            <label className="label_for-price">до</label>
                            <input type="text"  value={this.state.priceTo} onChange={this.onChengePriceTo} className="main_sortbar-price_input price_input"/>
                        <input type="button" value="Застосувати" className="button-search"/>
                    </form>
            </div>
        );
    }
}