import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Main } from "./components/Main";


export class App extends React.Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Switch>
                        <Route exact={true} path='/' component={Main} />
                        {/* <Redirect to='/404' /> */}
                    </Switch>
                </BrowserRouter>
            </div>
        );

    }
}

export default App;