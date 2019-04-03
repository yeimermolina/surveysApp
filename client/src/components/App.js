import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";

import Landing from "./Landing";
import Header from "./Header";
import * as actions from "../actions";

const Dashboard = () => <h2>Dashboard</h2>;
const SurveryNew = () => <h2>SurveryNew</h2>;

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <Header auth={this.props.auth} />
          <main>
            <Route exact path="/surveys" component={Dashboard} />
            <Route exact path="/surveys/new" component={SurveryNew} />
            <Route exact path="/" component={Landing} />
          </main>
        </BrowserRouter>
      </div>
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
