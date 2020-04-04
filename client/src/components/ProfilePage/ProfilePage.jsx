import React from 'react';
import './ProfilePage.jsx';


export class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state= {

        }

        this.logOut = this.logOut.bind(this);
    }
    
    logOut() {
        localStorage.removeItem("token");
        this.props.history.push('/');
        window.location.reload();
    }
    
    render() {
        return(
            <div>
                <button onClick={this.logOut}>LOGOUT</button>
            </div>
        )
    }
}