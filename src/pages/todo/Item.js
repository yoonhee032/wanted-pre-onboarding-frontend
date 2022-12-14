import List from "./List";
import styled from "styled-components";

import { useNavigate } from "react-router-dom";

let Title = styled.li`
  text-decoration: line-through;
`;

let Item = ({ data }) => {
  console.log("데이터", data.isCompleted);
  return (
    <>{data.isCompleted ? <Title>{data.todo}</Title> : <li>{data.todo}</li>}</>
  );
};
export default Item;
