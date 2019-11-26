import React from "react";
// Components
import HomePage from "./pages/home/home.page.jsx";
// Styles
import "./App.css";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="app">
                <HomePage />
            </div>
        );
    }
}

export default App;
