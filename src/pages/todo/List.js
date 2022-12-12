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
  const [todoList, setTodoList] = useState([]);

  const [todoData, setTodoData] = useState({
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

  //투두 리스트를 가져오는 서버 요청 함수 https://pre-onboarding-selection-task.shop/auth/todos
  let getListTodos = async () => {
    return await axios.get(server.url + "/todos", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  return (
    <ul className="list-group">
      <AddTodo></AddTodo>
      {todoList.map((data) => (
        <div className="col" key={data.id}>
          <div className="card shadow-sm">
            <Item data={data} />
          </div>
        </div>
      ))}
    </ul>
  );
};
export default List;
