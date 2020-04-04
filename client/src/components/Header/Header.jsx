import React from "react";
import { Link } from 'react-router-dom';
import './Header.scss';
import logo from '../../images/LOGO.png';

export class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: undefined,
        }
    }


    componentShouldUpdate(){
       
      }

    render() {
        return(
            <div className = "header">
                <div className="wrapper">
                    <div className="header_wrapper">
                    <div className="header_logo">
                    <Link to='/'><img src={logo} alt="home"/></Link>
                    </div>
                    <div className = "header_menu">
                        <nav >
                            <ul className = "menu_list">
                                <li><Link to='/' className="link_menu">Встановлення системи</Link></li>
                                <li><Link to={localStorage.token ?'/client/profile':'/client/login' } className="link_menu">Кабінет</Link></li>
                                <li><Link to='/client/cart' className="link_menu">Корзина</Link></li>
                            </ul>
                        </nav>
                    </div>
                </div>
              </div>
            </div>
        );
    }
}

