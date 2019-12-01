import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Components
import Navigation from "./components/navigation/navigation.component.jsx";
// Pages
import HomePage from "./pages/home/home.page.jsx";
import ProjectsPage from "./pages/projects/projects.page.jsx";
import BulletJournalPage from "./pages/bullet-journal/bullet-journal.page.jsx";
import SignInSignUpPage from "./pages/signInSignUp/sign-in-sign-up.page.jsx";
import ProfilePage from "./pages/profile/profile.page.jsx";

// Styles
import "./App.css";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <Router>
                <div className="app">
                    <Navigation />

                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route path="/projects" component={ProjectsPage} />
                        <Route
                            path="/bulletJournal"
                            component={BulletJournalPage}
                        />
                        <Route path="/profile" component={ProfilePage} />
                        <Route
                            path="/signInSignUp"
                            component={SignInSignUpPage}
                        />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
