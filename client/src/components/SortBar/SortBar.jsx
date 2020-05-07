import React from "react";
import './SortBar.scss';
import { useState } from "react";


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
           priceTo: 10000,
           url: '?'
       }
       this.onSubmitBar = this.onSubmitBar.bind(this);
       this.onChangePriceFrom = this.onChangePriceFrom.bind(this);
       this.onChangePriceTo = this.onChangePriceTo.bind(this);

       this.inelsCheck = this.inelsCheck.bind(this);
       this.fibaroCheck = this.fibaroCheck.bind(this);
       this.aeotecCheck = this.aeotecCheck.bind(this);
       this.orviboCheck = this.orviboCheck.bind(this);
       this.setSort = this.setSort.bind(this);

       
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
    this.setState({ priceFrom })
   } 

   onChangePriceTo (e) {
    const priceTo = e.currentTarget.value;
    this.setState({ priceTo });
   } 

   onSubmitBar(e) {
      e.preventDefault();
      let url = this.state.url;
      if(this.state.priceFrom != 0 || this.state.priceTo != 10000) {
            if(url[url.length-1] != '?') {
                    url += "&";
            }
            url += `priceFrom=${this.state.priceFrom}&priceTo=${this.state.priceTo}`
      }
      this.props.history.push(url); 
      window.location.reload();
   }

   inelsCheck() {
       let url = this.state.url;
        if(this.inelsRef.current.checked === true ) {
            if(url[url.length-1] != '?') {
                url += "&";
            }
           url += `manufacturer=Inels`;
            this.setState({ url });
        } else {
            if(this.inelsRef.current.checked === false) {
                if(url.includes('&manufacturer=Inels')) {
                    url = this.state.url.replace(`&manufacturer=Inels`,'');
                } else {
                    url = this.state.url.replace(`manufacturer=Inels`,'');
                }
                    this.setState({ url });
                }
        }
   }

   fibaroCheck() {
    let url = this.state.url;
     if(this.fibaroRef.current.checked === true ) {
         if(url[url.length-1] != '?') {
             url += "&";
         }
        url += `manufacturer=Fibaro`;
         this.setState({ url });
     } else {
         if(this.fibaroRef.current.checked === false) {
               
                if(url.includes('&manufacturer=Fibaro')) {
                    url = this.state.url.replace(`&manufacturer=Fibaro`,'');
                } else {
                    url = this.state.url.replace(`manufacturer=Fibaro`,'');
                }
                    this.setState({ url });
                }
             
              this.setState({ url });
            
         
     }
    }

    aeotecCheck() {
    let url = this.state.url;
     if(this.aeotecRef.current.checked === true ) {
         if(url[url.length-1] != '?') {
             url += "&";
         }
        url += `manufacturer=Aeotec`;
         this.setState({ url });
     } else {
         if(this.aeotecRef.current.checked === false) {
            if(url.includes('&manufacturer=Aeotec')) {
                url = this.state.url.replace(`&manufacturer=Aeotec`,'');
            } else {
                url = this.state.url.replace(`manufacturer=Aeotec`,'');
            }
           
              this.setState({ url });
         }
     }
    }

    orviboCheck() {
    let url = this.state.url;
     if(this.orviboRef.current.checked === true ) {
         if(url[url.length-1] != '?') {
             url += "&";
         }
        url += `manufacturer=Orvibo`;
         this.setState({ url });
     } else {
         if(this.orviboRef.current.checked === false) {
             
             if(url.includes('&manufacturer=Orvibo')) {
                url = this.state.url.replace(`&manufacturer=Orvibo`,'');
            } else {
                url = this.state.url.replace(`manufacturer=Orvibo`,'');
            }
              this.setState({ url });
         }
     }
    }

    setSort(e) {
        console.log(e.currentTarget.value);


        let url = this.state.url;


        if (url.includes('&order=price')){
            url = this.state.url.replace(`&order=price`,'');
        }

        if (url.includes('&order=-price')) {
            url = this.state.url.replace(`&order=-price`,'');
        }

        if(url.includes('order=price')) {
            url = this.state.url.replace(`order=price`,'');
            console.log(url);
        }
        
        if (url.includes('order=-price')) {
            url = this.state.url.replace(`order=-price`,'');
        } 
        

        this.setState({ url });
       

        if(e.currentTarget.value != "all") {
            if(url[url.length-1] != '?') {
                url += "&";
            }
            url += `order=${e.currentTarget.value}`;
            this.setState({ url });
        }

       
    }

   

 

    render() {
        return(
            <div className="main_sortbar" onSubmit={this.onSubmitBar}>
                <select className="main_sortbar-select" onChange={this.setSort}>
                    <option value="all" >All</option>
                    <option value="price">Price: Low to high</option>
                    <option value="-price" >Price: High to low</option>
                </select>
                <p className="main_sortbar-producer">Виробник</p>
                    <form method="post" >
                            <input type="checkbox" ref={this.inelsRef} onClick={this.inelsCheck} name="producer" value="inels" id="checkbox1" className="check"/>
                            <label htmlFor="checkbox1" className="main_sortbar-producer_item">INELS</label><br/>
                            <input type="checkbox" ref={this.fibaroRef}  onClick={this.fibaroCheck} name="producer" value="fibaro" id="checkbox2" />
                            <label htmlFor="checkbox2" className="main_sortbar-producer_item">FIBARO</label><br/>
                            <input type="checkbox" ref={this.aeotecRef} onClick={this.aeotecCheck} name="producer" value="aeotec" id="checkbox3"/>
                            <label htmlFor="checkbox3" className="main_sortbar-producer_item">AEOTEC</label><br/>
                            <input type="checkbox" ref={this.orviboRef} onClick={this.orviboCheck} name="producer" value="orvibo" id="checkbox4"/>
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