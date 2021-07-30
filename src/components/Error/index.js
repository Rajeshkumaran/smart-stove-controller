import React from "react";
import styled from "react-emotion";
import PropTypes from "prop-types";
const Wrap = styled("div")``;
const ErrorSpan = styled("span")``;
function Error({ errorText }) {
  return (
    <Wrap>
      <ErrorSpan>{errorText}</ErrorSpan>
    </Wrap>
  );
}
Error.propTypes = {
  errorText: PropTypes.string,
};
export default Error;
