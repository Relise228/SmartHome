import React from "react";
import {Helmet} from "react-helmet";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Main } from "./components/Main";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ProductPage } from "./components/ProductPage";
import { Authorization } from "./components/Authorization/Authorization";
import { ProfilePage } from "./components/ProfilePage";
import { Registration } from "./components/Registration/Registration";
import { Cart } from "./components/Cart/Cart";
import { AdminPanel } from "./components/AdminPanel/AdminPanel";

export class App extends React.Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                <Helmet title="Smart Home" />
                <Header/>
                    <Switch>
                        <Route  exact={true} path='/' component={Main} />
                         <Route  path='/?manufacturer=Inels' component={Main} /> 
                        <Route path='/smarthome/:productID' component={ProductPage} />
                        <Route path='/client/login' component={Authorization} />
                        <Route path='/client/profile' component={ProfilePage} />
                        <Route path='/client/signup' component={Registration} />
                        <Route path='/client/cart' component={Cart} />
                        <Route path='/admin' component={AdminPanel} />
                        {/* <Redirect to='/404' /> */}
                    </Switch>
                {/* <Footer/> */}
                </BrowserRouter>
            </div>
        );

    }
}

export default App;