import React from "react";
import Button from "react-bootstrap/Button";

const ConditionalButton = ({ condition, name, onClick }) => {
  const button = condition ? (
    <Button onClick={onClick} variant="secondary btn-sm">
      {name}
    </Button>
  ) : null;

  return button;
};

export default ConditionalButton;
