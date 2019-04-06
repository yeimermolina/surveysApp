import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import formFields from "./formFields";
import * as actions from "../../actions";

const SurveyFormReview = ({ onCancel, form, submitSurvey }) => {
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
        onClick={() => submitSurvey(form)}
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
)(SurveyFormReview);
