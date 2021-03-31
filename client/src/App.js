import logo from './logo.svg';
import './App.css';
import React, {Component} from "react";
import TokenCreator from "./components/TokenCreator";
import About from "./components/about";
//import Metadata from "./components/metadata";

import NavBar from "./components/NavBar";





class App extends Component{

    render() {


        return (
            <div className="App">


                <h1> ERC 1155 Creator</h1>

                <TokenCreator/>

            </div>
        );
    }
}

export default App;