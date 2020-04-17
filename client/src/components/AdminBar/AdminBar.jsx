import React from 'react';
import './AdminBar.scss';


export class AdminBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className='abar'>
                <button className="abar_button" onClick={this.props.getOrder}>Знайти замовлення за номером</button>
                <button className="abar_button" onClick={this.props.confirmedOrder}>Підтверджені замовлення</button>
                <button className="abar_button" onClick={this.props.finishedOrder}>Завершені замовлення</button>
                <button className="abar_button" onClick={this.props.inDeliveryOrder}>Замовлення в доставці</button>    
            </div>
        )
    }
}