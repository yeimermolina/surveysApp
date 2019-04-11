import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";

class SurveyList extends Component {
  renderSurveys() {
    return this.props.surveys.reverse().map(survey => (
      <div className="card darken-1" key={survey._id}>
        <div className="card-content">
          <span className="card-title">{survey.title}</span>
          <p>{survey.body}</p>
          <p className="right">
            Sent On: {new Date(survey.dateSent).toLocaleDateString()}
          </p>
        </div>
        <div className="card-action">
          <a>Yes: {survey.yes}</a>
          <a>No: {survey.no}</a>
        </div>
      </div>
    ));
  }

  componentDidMount() {
    this.props.fetchSurveys();
  }

  render() {
    return <div>{this.renderSurveys()}</div>;
  }
}

const mapStateToProps = ({ surveys }) => ({
  surveys: surveys.surveys
});

export default connect(
  mapStateToProps,
  actions
)(SurveyList);
