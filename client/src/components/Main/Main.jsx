import React from "react";
import { Header } from "../Header";
import { MainContent } from "../Main-Content";
import { Footer } from "../Footer";


export class Main extends React.Component {
    render() {
        return(
            <div>
                <Header/>
                <div className="wrapper">
                    <MainContent/>
                </div>
                <Footer/>
            </div>
        );
    }
}