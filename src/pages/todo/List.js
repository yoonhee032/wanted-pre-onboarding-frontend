import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Item from "./Item";
import server from "./../../config/server.json";
import AddTodo from "./AddTodo";

let List = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  //투두 리스트 담아두는 곳
  const [todoList, setTodoList] = useState([]); //배열로 초기화

  const [todoData, setTodoData] = useState({
    kind: "",
    todo: "",
    userId: 0,
    id: 0,
    isCompleted: false,
  });

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

  console.log(todoList);

  let changeTodoData = (e) => {
    console.log(e.target.value);
    setTodoData({
      ...todoData,
      [e.target.name]: e.target.value,
    });
  };

  const completeBtn = (data) => {
    console.log("데이터 아이디", data.id);
    setTodoList(
      todoList.map((item) => {
        if (item.id === data.id) {
          item.isCompleted = !item.isCompleted;
        }
        return item;
      })
    );
  };

  //투두 리스트를 가져오는 서버 요청 함수 https://pre-onboarding-selection-task.shop/auth/todos
  let getListTodos = async () => {
    return await axios.get(server.url + "/todos", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  //일기장을 삭제하는 서버 요청 함수
  let deleteTodo = async (id, todo) => {
    if (window.confirm(`${todo}를 삭제하시겠습니까?`)) {
      return await //http://localhost:8080/todos/:id
      axios.delete(`${server.url}/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  };

  return (
    <main>
      <div className="container text-center m-5 p-2 rounded mx-auto bg-light shadow">
        <h1 className="fw-bold"> todoList </h1>
        <p className="lead text-muted">Hi</p>
        <AddTodo todoData={todoData} changeTodoData={changeTodoData}></AddTodo>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          <ul className="list-group">
            {todoList.map((data) => (
              <div className="col" key={data.id}>
                <div className="card shadow-sm">
                  <Item data={data} />
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => completeBtn(data)}
                    >
                      완료
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => {
                        //일기장 수정 버튼을 눌렀을 경우,
                        //수정을 원하는 일기장의 정보를 저장함
                        setTodoData({
                          id: data.id,
                          kind: "isEdit",
                          todo: data.todo,
                          isCompleted: data.isCompleted,
                          userId: data.userId,
                        });
                        console.log("수정", todoData);
                      }}
                    >
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
                </div>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
};
export default List;
