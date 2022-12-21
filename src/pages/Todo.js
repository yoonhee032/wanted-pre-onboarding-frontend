import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TestItem from "./TestItem";
import server from "./../../config/server.json";
import AddTodo from "./AddTodo";
import Button from "../../components/Button";
import { MDBIcon } from "mdb-react-ui-kit";

import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from "mdb-react-ui-kit";
import TestTodo from "./todo/TodoList";

export default function Todo() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [todoList, setTodoList] = useState([]); //배열로 초기화

  return (
    <section className="vh-100" style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="d-flex justify-content-center align-items-center">
          <MDBCol lg="9" xl="7">
            <MDBCard className="rounded-3">
              <MDBCardBody className="p-4">
                <h4 className="text-center my-3 pb-3">To Do App</h4>
                <MDBRow className="row-cols-lg-auto g-3 justify-content-center align-items-center mb-4 pb-2">
                  {/* 투두 리스트를 추가하는 AddTodo */}
                  <AddTodo todoList={todoList} setTodoList={setTodoList} />
                </MDBRow>

                {/* 할 일 item 리스트 */}
                <TestTodo
                  todoList={todoList}
                  setTodoList={setTodoList}
                  checkedList={false}
                />

                {/* 완료한 item 리스트 */}
                <TestTodo
                  todoList={todoList}
                  setTodoList={setTodoList}
                  checkedList={false}
                />
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
