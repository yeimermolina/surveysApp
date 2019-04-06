import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import formFields from "./formFields";
import * as actions from "../../actions";

const SurveyFormReview = ({ onCancel, form, submitSurvey, history }) => {
  const reviewFields = _.map(formFields, ({ label, name }) => (
    <div key={name}>
      <label>{label}</label>
      <div>{form[name]}</div>
    </div>
  ));

  return (
    <div>
      <h5>Please confirm your entries</h5>
      {reviewFields}
      <button
        onClick={onCancel}
        className="yellow white-text darken-3 btn-flat"
      >
        Back
      </button>
      <button
        className="green btn-flat right white-text"
        onClick={() => submitSurvey(form, history)}
      >
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

const mapStateToProps = ({ form }) => ({
  form: form.surveyForm.values
});

export default connect(
  mapStateToProps,
  actions
)(withRouter(SurveyFormReview));
