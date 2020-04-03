import React from "react";
import './MainContent.scss';
import { SortBar } from "../SortBar";


export class MainContent extends React.Component {
    render() {
        return(
            <div className="main_content">
                <SortBar/>
            </div>
        );
    }
}