import React from "react";
import { Header } from "../Header";
import { MainContent } from "../Main-Content";


export class Main extends React.Component {
    render() {
        return(
            <div>
                <Header/>
                <div className="wrapper">
                    <MainContent/>
                </div>
            </div>
        );
    }
}