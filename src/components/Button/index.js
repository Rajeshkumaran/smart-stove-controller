import React, { useState } from 'react';
import styled, { css, cx } from 'react-emotion';
import { primary } from '../../constants';
import { MontserratBold } from '../../utils/fonts';
const Wrap = styled('button')`
  outline: none;
  background: #fff;
  border: 1px solid ${primary};
  padding: 8px 12px;
  color: #000;
  border-radius: 1rem;
  font-size: 14px;
  font-family: ${MontserratBold};
  cursor: pointer;
  @media (max-width: 992px) {
    cursor: default;
  }
`;
function Button({ className, children, ignoreHoverState = false, ...otherProps }) {
  const [hoveredState, setHoverState] = useState(false);

  return (
    <Wrap
      className={cx(
        className,
        hoveredState && !ignoreHoverState
          ? css`
              background: ${primary};
              color: #fff;
            `
          : '',
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
