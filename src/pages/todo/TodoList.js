import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TestItem from "./TodoItem";
import server from "../../config/server.json";
import AddTodo from "./AddTodo";

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

export default function TodoList() {
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  const [todoList, setTodoList] = useState([]); //배열로 초기화

  useEffect(() => {
    //리스트 페이지로 들어 올 경우, 로그인 되어있는 사용자인지 확인하는 부분.
    if (token === null) {
      alert("로그인이 필요합니다.");
      navigate("/");
      return;
    }

    //투두 리스트를 가져오는 부분
    getListTodos()
      .then((res) => {
        console.log(res.data);
        setTodoList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //투두 리스트를 가져오는 서버 요청 함수 https://pre-onboarding-selection-task.shop/auth/todos
  let getListTodos = async () => {
    return await axios.get(server.url + "/todos", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  

  return (
    <section className="vh-100" style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className=" justify-content-center align-items-center">
          <MDBCol md="8" xl="6">
            <MDBCard className="rounded-15">
              <MDBCardBody className="p-4">
                <h4 className="text-center my-3 pb-3">✔️</h4>
                <p className="text-center my-3 pb-3">
                  당신의 할일을 기록하세요👍
                </p>
                <MDBRow className="row-cols-sm-auto g-3 justify-content-center align-items-center">
                  {/* 투두 리스트를 추가하는 AddTodo */}
                  <AddTodo />
                </MDBRow>
                <MDBTable className="mb-4 text-center">
                  <MDBTableHead>
                    <tr>
                      <th>완료 여부</th>
                      <th scope="col">할 일</th>
                      <th scope="col">상태</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    {
                      //가져온 투두 리스트를 보여주는 코드
                      todoList.map((data) => (
                        <tr>
                          <TestItem
                            key={data.id}
                            data={data}
                            todoList={todoList}
                            setTodoList={setTodoList}
                          />
                        </tr>
                      ))
                    }
                  </MDBTableBody>
                </MDBTable>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
