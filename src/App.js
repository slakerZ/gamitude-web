import React from "react";
// Components
import Navigation from "./components/navigation/navigation.component.jsx";
// Pages
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
                <Navigation />
                <HomePage />
            </div>
        );
    }
}

export default App;
