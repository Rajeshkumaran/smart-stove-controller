import React, { useState } from "react";
import styled, { css, cx } from "react-emotion";
import { RL_PINK } from "../../constants";
import { MontserratBold } from "../../utils/fonts";
const Wrap = styled("button")`
  outline: none;
  background: #fff;
  border: 1px solid ${RL_PINK};
  padding: 1.2rem;
  color: #000;
  border-radius: 1rem;
  font-size: 1.4rem;
  font-family: ${MontserratBold};
  cursor: pointer;
  @media (max-width: 992px) {
    cursor: default;
  }
`;
function Button({ className, children, ...otherProps }) {
  const [hoveredState, setHoverState] = useState(false);

  return (
    <Wrap
      className={cx(
        className,
        hoveredState
          ? css`
              background: ${RL_PINK};
              color: #fff;
            `
          : "",
      )}
      onMouseOver={() => setHoverState(true)}
      onMouseLeave={() => setHoverState(false)}
      {...otherProps}
    >
      {children}
    </Wrap>
  );
}
export default Button;
