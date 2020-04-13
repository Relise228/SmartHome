import React from 'react';
import './FieldInformation.scss';

export class FieldInformation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isVis: false,
            textFieldValue: ''
        }
        this.fieldRef = React.createRef();
        this.buttonRef = React.createRef();
        this.showField = this.showField.bind(this);
        this.onChangeField = this.onChangeField.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.value !== prevProps.value) {
          this.setState({ textFieldValue: this.props.value });
        }

      }

   
        

    showField () {
            this.setState({ isVis: true});  
            
            if(this.state.isVis === true) {
                this.props.clickBtn(this.state.textFieldValue);
            }
                 
    }

    onChangeField(e) {
        const textFieldValue = e.currentTarget.value;
        this.setState({ textFieldValue }); 
    }

  
    
    render() {
    return(
        <div className="info_block-wrapper">
            <div className="info_block">
                <p className="info_inf">{this.props.inf}</p>
            </div>
            <div className="info_block">
                {this.state.isVis ? <input className="input-field" onChange={this.onChangeField} ref={this.fieldRef} type="text" value={this.state.textFieldValue} /> : <p className="info_value">{this.props.value}</p> }
            </div>
            <div className="info_block">
                 <button className="info_button-change"  onClick={this.showField}>Змінити</button> 
            </div>
        
        </div>    
        
    );
    }

}