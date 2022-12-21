import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import server from "./../../config/server.json";
import { MDBBtn, MDBCol, MDBInput, MDBInputGroup } from "mdb-react-ui-kit";

let AddTodo = ({ todoData }) => {
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  const [todoState, setTodoState] = useState({
    todo: "",
  });

  let changeInputData = (e) => {
    console.log(e.target.value);
    setTodoState({
      ...todoState,
      [e.target.name]: e.target.value,
    });
  };

  //투두를 작성하여 보내는 함수
  let createTodo = async () => {
    console.log("투두", todoState);
    if (todoState.todo === "") {
      alert("내용을 입력해주세요.");
      return;
    }

    return await // https://pre-onboarding-selection-task.shop/todos
    axios.post(server.url + "/todos", todoState, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  return (
    <>
     <MDBInputGroup className='mb-3 p-3'>
        <input 
        className='form-control' 
        placeholder="할일을 입력하세요"
        value={todoState.todo}
        name="todo"
        onChange={changeInputData} 
        type='text'
         />
        <MDBBtn outline
         type="submit"
         id="button-addon2"
         onClick={() => {
           createTodo()
             .then((res) => {
               console.log("응답", res.status);
               if (res.status) {
                 window.location.reload();
               }
             })
             .catch((err) => {
               console.log(err);
             });
         }}>Button</MDBBtn>
      </MDBInputGroup>
    </>
  );
};
export default AddTodo;


