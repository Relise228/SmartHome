import React from "react";
import './SortBar.scss';


export class SortBar extends React.Component {
   constructor(props) {
       super(props);
       this.inelsRef = React.createRef();
       this.fibaroRef = React.createRef();
       this.aeotecRef = React.createRef();
       this.orviboRef = React.createRef();
       this.priceFromRef = React.createRef();
       this.priceToRef = React.createRef();

       this.state = {
           checked: [],
           priceFrom: 0,
           priceTo: 10000
       }
       this.onSubmitBar = this.onSubmitBar.bind(this);
       this.onChangePriceFrom = this.onChangePriceFrom.bind(this);
       this.onChangePriceTo = this.onChangePriceTo.bind(this);

       
   }

   componentDidMount() {
       console.log(this.inelsRef);

        this.state.checked.map( item => {
            item.current.checked = true;
        });

        // this.inelsRef.current.checked = true;

   }

   onChangePriceFrom (e) {
    const priceFrom = e.currentTarget.value;
    this.setState({ priceFrom });
   } 

   onChangePriceTo (e) {
    const priceTo = e.currentTarget.value;
    this.setState({ priceTo });
   } 

   onSubmitBar(e) {
      
        
   }

   

 

    render() {
        return(
            <div className="main_sortbar" onSubmit={this.onSubmitBar}>
                <p className="main_sortbar-producer">Виробник</p>
                    <form method="post" >
                            <input type="checkbox" ref={this.inelsRef} name="producer" value="inels" id="checkbox1" className="check"/>
                            <label htmlFor="checkbox1" className="main_sortbar-producer_item">INELS</label><br/>
                            <input type="checkbox" ref={this.fibaroRef} name="producer" value="fibaro" id="checkbox2" />
                            <label htmlFor="checkbox2" className="main_sortbar-producer_item">FIBARO</label><br/>
                            <input type="checkbox" ref={this.aeotecRef} name="producer" value="aeotec" id="checkbox3"/>
                            <label htmlFor="checkbox3" className="main_sortbar-producer_item">AEOTEC</label><br/>
                            <input type="checkbox" ref={this.orviboRef} name="producer" value="orvibo" id="checkbox4"/>
                            <label htmlFor="checkbox4" className="main_sortbar-producer_item">ORVIBO</label><br/>
                        <p className="main_sortbar-price">Ціна</p>
                            <label className="label_for-price">від</label>
                            <input type="text" ref={this.priceFromRef} name="priceFrom" value={this.state.priceFrom} onChange={this.onChangePriceFrom}  className="main_sortbar-price_input"/><br/>
                            <label className="label_for-price">до</label>
                            <input type="text" ref={this.priceToRef} name="priceTo" value={this.state.priceTo} onChange={this.onChangePriceTo} className="main_sortbar-price_input price_input"/>
                        <button className="button-search">Застосувати</button> 
                    </form>
            </div>
        );
    }
}