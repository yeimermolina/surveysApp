import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import formFields from "./formFields";

const SurveyFormReview = ({ onCancel, form }) => {
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
      <button onClick={onCancel} className="yellow darken-3 btn-flat">
        Back
      </button>
    </div>
  );
};

const mapStateToProps = ({ form }) => ({
  form: form.surveyForm.values
});

export default connect(mapStateToProps)(SurveyFormReview);
