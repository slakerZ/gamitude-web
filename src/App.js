import React from "react";
import { Route, Switch } from "react-router-dom";
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

const App = () => {
    return (
        <div className="app">
            <Navigation />

            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/projects" component={ProjectsPage} />
                <Route path="/bulletJournal" component={BulletJournalPage} />
                <Route path="/profile" component={ProfilePage} />
                <Route path="/signInSignUp" component={SignInSignUpPage} />
            </Switch>
        </div>
    );
};

export default App;
