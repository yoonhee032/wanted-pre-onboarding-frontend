import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import server from "./../../config/server.json";

let AddTodo = ({todoData}) => {
  const token = localStorage.getItem("token");
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
    
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="할일을 입력하세요"
        value={todoState.todo}
        name="todo"
        onChange={changeInputData}
      />
      <button
        className="btn btn-outline-secondary"
        type="button"
        id="button-addon2"
        onClick={() => {
          createTodo().then((res) => {
            console.log("응답", res.status);
            if (res.status) {
              window.location.reload();
            }
          }).catch(err => {
            console.log(err)
          });
        }}
      >
        추가
      </button>
    </div>
    </>
  );
};
export default AddTodo;
