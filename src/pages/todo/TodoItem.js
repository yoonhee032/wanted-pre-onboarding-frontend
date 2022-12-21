import styled from "styled-components";

import { useNavigate } from "react-router-dom";
import AddTodo from "./AddTodo";
import { useEffect, useState } from "react";

import axios from "axios";
import server from "../../config/server.json";
import TestTodo from "./TodoList";
import Button from "../../components/Button";

import { MDBIcon, MDBBtn } from "mdb-react-ui-kit";

let Title = styled.div`
  text-decoration: line-through;
`;

let TodoItem = ({ data, todoList, setTodoList }) => {
  const token = localStorage.getItem("token");

  const [editMode, setEditMode] = useState(false); //수정모드
  const [editTodo, setEditTodo] = useState({
    id: data.id,
    todo: data.todo,
    isCompleted: data.isCompleted,
  });

  useEffect(() => {
    console.log("데이터", data);
    console.log("에딧", editTodo);
  }, []);

  //input 변화 감지
  const handleEditInput = (e) => {
    console.log(e.target.name);
    setEditTodo({
      ...editTodo,
      [e.target.name]: e.target.value,
    });
  };

  const editBtn = () => {
    setEditMode(true);
  };

  const onClickCancelButton = () => {
    setEditMode(false);
    setEditTodo(data.todo);
  };

  //완료 버튼 토글기능 함수
  const completeBtn = (data) => {
    setTodoList(
      todoList.map((item) => {
        if (item.id === data.id) {
          item.isCompleted = !item.isCompleted;
        }
        return item;
      })
    );
  };

  const editSubmitBtn = () => {
    updateTodo(editTodo.id)
      .then((res) => {
        if (res.data.status) {
          setEditTodo.todo(res.data.todo);
        }
        setEditMode(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let updateTodo = async (id) => {
    if (editTodo === "") {
      alert("내용을 입력해주세요.");
      return;
    }

    return await // https://pre-onboarding-selection-task.shop/todos
    axios.put(`${server.url}/todos/${id}`, editTodo, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  //일기장을 삭제하는 서버 요청 함수 //http://localhost:8080/todos/:id
  let deleteTodo = async (id, todo) => {
    console.log("삭제", id);
    if (window.confirm(`${todo}를 삭제하시겠습니까?`)) {
      return await axios.delete(`${server.url}/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  };

  return (
    <>
      <th className="align-items-center">
        {data.isCompleted ? (
          <MDBBtn
            type="submit"
            outline
            floating
            color="success"
            onClick={() => {
              completeBtn(data);
            }}
          >
            <MDBIcon fas icon="check" size="xs" />
          </MDBBtn>
        ) : (
          <MDBBtn
            type="submit"
            outline
            floating
            color="secondary"
            onClick={() => {
              completeBtn(data);
            }}
          >
            <MDBIcon fas icon="check" size="xs" />
          </MDBBtn>
        )}
      </th>
      {editMode ? (
        //수정모드 input
        <>
          <input
            type="text"
            className="todo-edit-input"
            name="todo"
            value={editTodo.todo}
            onChange={handleEditInput}
          />
        </>
      ) : (
        //읽기모드
        <>
          <th> {editTodo.todo} </th>
        </>
      )}
      {/* 수정 버튼 */}
      {editMode ? (
        <>
          <th>
            {/* 수정 저장 버튼 */}
            <MDBBtn
              type="submit"
              rounded
              color="warning"
              onClick={editSubmitBtn}
            >
              <MDBIcon fas icon="check" size="xs" />
            </MDBBtn>

            {/* 취소 버튼 */}
            <MDBBtn
              type="submit"
              rounded
              color="danger"
              onClick={onClickCancelButton}
            >
              <MDBIcon fas icon="chevron-left" size="xs" />
            </MDBBtn>
          </th>
        </>
      ) : (
        <>
          <th>
            {/* 완료여부 버튼 */}

            {/*수정 버튼 */}
            <MDBBtn type="submit" rounded color="warning" onClick={editBtn}>
              <MDBIcon fas icon="pen" size="xs" />
            </MDBBtn>

            {/* 삭제 버튼 */}
            <Button
              func={deleteTodo}
              data={data}
              color={"danger"}
              text={"삭제"}
              icon={"trash-alt"}
            />
          </th>
        </>
      )}
    </>
  );
};
export default TodoItem;
