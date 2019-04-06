import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";

import Landing from "./Landing";
import Header from "./Header";
import Dashboard from "./Dashboard";
import SurveyNew from "./surveys/SurveyNew";
import * as actions from "../actions";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Header auth={this.props.auth} />
          <main>
            <Route exact path="/surveys" component={Dashboard} />
            <Route exact path="/surveys/new" component={SurveyNew} />
            <Route exact path="/" component={Landing} />
          </main>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  auth: auth.user
});

export default connect(
  mapStateToProps,
  actions
)(App);
