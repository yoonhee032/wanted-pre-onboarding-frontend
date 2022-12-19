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
    isEdit: false,
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

  //input값을 변경할 때, 각 input name에 맞는 value값을 넣어줌.
  let changeTodoData = (e) => {
    setTodoData({
      ...todoData,
      [e.target.name]: e.target.value,
    });
  };

  let isEdit = (data) => {
    setTodoData({
      isEdit: true,
      todo: data.todo,
      userId: data.userId,
      id: data.id,
      isCompleted: data.isCompleted,
    });
  };

  const editBtn = (data) => {
    //수정 버튼 클릭시 isEdit 실행
    isEdit(data);
  };

  //완료 버튼 토글기능 함수
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

  //일기장을 삭제하는 서버 요청 함수 //http://localhost:8080/todos/:id
  let deleteTodo = async (id, todo) => {
    if (window.confirm(`${todo}를 삭제하시겠습니까?`)) {
      return await axios.delete(`${server.url}/todos/${id}`, {
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
        <p className="lead text-muted">할 일을 입력하세요👍</p>
        <AddTodo todoData={todoData} changeTodoData={changeTodoData}></AddTodo>
        <div className="row p-3">
          <ul className="col">
            {
              //가져온 투두 리스트를 보여주는 코드
              todoList.map((data) => (
                <div className="col p-3" key={data.id}>
                  <div className="col-3 d-flex">
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      onClick={() => completeBtn(data)}
                    >
                      완료
                    </button>
                    
                    <Item
                      data={data}
                      completeBtn={completeBtn}
                      editBtn={editBtn}
                      deleteTodo={deleteTodo}
                      todoData={todoData}
                      setTodoData={setTodoData}
                    />
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    
                  </div>
                </div>
              ))
            }
          </ul>
        </div>
      </div>
    </main>
  );
};
export default List;
