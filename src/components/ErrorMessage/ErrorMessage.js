import React from "react";

function ErrorMessage({ error_message }) {
  return (
    <div>
      <p className="text-danger">{error_message}</p>
    </div>
  );
}

export default ErrorMessage;
