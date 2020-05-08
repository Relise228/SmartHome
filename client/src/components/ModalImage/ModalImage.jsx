import React from 'react';
import './ModalImage.scss';

export class ModalImage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
           images: this.props.images,
           firstSrc: this.props.firstSrc

        }

    }

    


        
   

  



    render() {
        return(
            <div className="modal">
                <img className="modal_image"  src={this.state.firstSrc}/>
                <span className="modal_cross" onClick={this.props.closeModal}>🞬</span>
            </div>
        );
    }
}