import List from './List'

import { useNavigate } from "react-router-dom";

let Item = ({data}) => {
    console.log(data);
    return(
        <li >{data.todo}</li>
    )
}
export default Item;