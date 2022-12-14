import List from "./List";
import styled from "styled-components";

import { useNavigate } from "react-router-dom";
import AddTodo from "./AddTodo";
import { useState } from "react";

import axios from "axios";
import server from "./../../config/server.json";

let Title = styled.div`
  text-decoration: line-through;
`;

let Item = ({
  data,
  completeBtn,
  editBtn,
  deleteTodo,
  todoData,
  setTodoData,
}) => {
  const token = localStorage.getItem("token");

  const [todoUpdateState, setTodoUpdateState] = useState({
    todo: "",
    isCompleted: todoData.isCompleted,
  });

  let changeInputData = (e) => {
    console.log(e.target.value);
    setTodoData({
      ...todoData,
      [e.target.name]: e.target.value,
    });
    setTodoUpdateState({
      ...todoUpdateState,
      [e.target.name]: e.target.value,
    });
  };

  //투두를 작성하여 보내는 함수
  let updateTodo = async (id) => {
    console.log("투두", todoUpdateState);
    if (todoUpdateState.todo === "") {
      alert("내용을 입력해주세요.");
      return;
    }

    return await // https://pre-onboarding-selection-task.shop/todos
    axios.put(`${server.url}/todos/${id}`, todoUpdateState, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  return (
    <>
      <>
        {todoData.isEdit ? (
          todoData.id === data.id ? (
            <>
              <input
                type="text"
                className="form-control"
                placeholder={todoData.todo}
                value={todoUpdateState.todo}
                name="todo"
                onChange={changeInputData}
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                id="button-addon2"
                onClick={() => {
                  //삭제를 시키는 실질적인 코드
                  updateTodo(todoData.id)
                    .then((res) => {
                      console.log("수정", res);
                      if (res.data.status) {
                      }
                      window.location.reload();
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }}
              >
                제출
              </button>
              <button
                className="btn btn-outline-secondary"
                type="button"
                id="button-addon2"
                onClick={()=> {
                  window.location.reload();
                }}
              >
                취소
              </button>
            </>
          ) : (
            <></>
          )
        ) : data.isCompleted ? (
          <>
            
            <div className="col-3">
            <Title>{data.todo}</Title>
            </div>
            <div className="col">
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={() => editBtn(data)}
              >
                {console.log("ss", todoData)}
                수정
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={() => {
                  //삭제를 시키는 실질적인 코드
                  deleteTodo(data.id, data.todo)
                    .then((res) => {
                      console.log("삭제", res);
                      if (res.data.status) {
                      }
                      window.location.reload();
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }}
              >
                삭제
              </button>
            </div>
          </>
        ) : (
          <>
          <div className="col-3">
            {data.todo}
            </div>
            <div className="col">
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={() => editBtn(data)}
              >
                {console.log("ss", todoData)}
                수정
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={() => {
                  //삭제를 시키는 실질적인 코드
                  deleteTodo(data.id, data.todo)
                    .then((res) => {
                      console.log("삭제", res);
                      if (res.data.status) {
                      }
                      window.location.reload();
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }}
              >
                삭제
              </button>
            </div>
          </>
        )}
      </>
    </>
  );
};
export default Item;
