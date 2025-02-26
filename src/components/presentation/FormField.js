import React from "react";

const FormField = ({ label, attributes, id }) => {
  return (
    <div className="form-group row">
      <label htmlFor={id} className="col-xs-4">
        {label}
      </label>
      <input {...attributes} id={id} className="form-control col-xs-8" />
    </div>
  );
};

export default FormField;
