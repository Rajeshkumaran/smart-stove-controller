import React, { useState } from "react";
import styled from "react-emotion";
import PropTypes from "prop-types";
import downarrow from "../../images/downarrow.png";
import { ALLY_BLUE } from "../../constants";
const Wrap = styled("div")`
  background: #fff;
  margin: 2rem;
  padding: 1rem 2rem;
  box-shadow: 0px 2px 7px #e2e2e2;
  @media (min-width: 760px) {
    width: 60rem;
  }
`;
const ElementWrap = styled("div")`
  display: flex;
`;
const ArrowWrap = styled("div")`
  width: 1rem;
  margin: 0 0.5rem;
  @media (max-width: 992px) {
    width: 1rem;
    height: 1rem;
  }
`;
const Arrow = styled("img")`
  width: 100%;
  height: 100%;
  cursor: pointer;
`;
const ObjValue = styled("p")`
  font-size: 1.4rem;
  margin-left: 2rem;
  list-style-type: decimal;
  font-weight: bold;
  @media (max-width: 992px) {
    font-size: 1.2rem;
  }
  @media (max-width: 420px) {
    margin-left: 0rem;
  }
`;
const ObjectivesWrap = styled("div")`
  margin-left: 4.8rem;
`;
const ObjectiveWrap = styled("li")`
  font-size: 1.4rem;
  text-align: left;
  margin: 2rem 0;
  padding: 0 1rem;
  list-style-type: lower-latin;
  cursor: pointer;
  @media (max-width: 992px) {
    font-size: 1.2rem;
    cursor: default;
  }
`;
const NoData = styled("span")`
  font-size: 1.4rem;
  color: ${ALLY_BLUE};
  margin: 2rem;
  display: inline-block;
  @media (max-width: 992px) {
    font-size: 1.2rem;
  }
`;
function Objective({
  id,
  title,
  childObjectives = [],
  showObjectiveInfo = () => {},
}) {
  const [expand, onExpand] = useState(true);
  const displayObjectives = () => {
    if (childObjectives.length <= 0)
      return <NoData>No objectives found</NoData>;
    return childObjectives.map((childObj, index) => (
      <ObjectiveWrap
        key={`${title}-child-${index.toString()}`}
        onClick={() => {
          const {
            id: ID,
            category: Category,
            title: Title,
            metric_name: MetricName,
            metric_start: MetricStart,
            metric_target: MetricTarget,
          } = childObj || {};
          const info = {
            Parent: title,
            ID,
            Category,
            Title,
            MetricName,
            MetricStart,
          };
          showObjectiveInfo(info);
        }}
      >
        {childObj.title}
      </ObjectiveWrap>
    ));
  };
  return (
    <Wrap>
      <ElementWrap>
        <ArrowWrap>
          <Arrow src={downarrow} onClick={() => onExpand(!expand)} />
        </ArrowWrap>
        <ObjValue>{`${id}. ${title}`}</ObjValue>
      </ElementWrap>
      {expand && <ObjectivesWrap>{displayObjectives()}</ObjectivesWrap>}
    </Wrap>
  );
}
Objective.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  childObjectives: PropTypes.array,
  showObjectiveInfo: PropTypes.func,
};
export default Objective;
