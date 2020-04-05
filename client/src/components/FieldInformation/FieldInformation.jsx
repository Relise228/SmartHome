import React from 'react';
import './FieldInformation.scss';

export class FieldInformation extends React.Component {
    
    render() {
    return(
        <div className="info_block-wrapper">
            <div className="info_block">
                <p className="info_inf">{this.props.inf}</p>
            </div>
            <div className="info_block">
                <p className="info_value">{this.props.value}</p>
            </div>
            <div className="info_block">
                <button className="info_button-change" onClick={this.props.clickBtn}>Змінити</button>
            </div>



                            
        </div>    
        
    );
    }

}