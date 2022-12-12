import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import server from "./../../config/server.json";

let Login = () => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  // loginData에 input 값을 넣어줌
  let changeLoginData = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  //로그인 버튼 클릭했을때
  let clickLoginBtn = async () => {
    if (loginData.email === "") {
      alert("이메일을 입력해주세요.");
      return;
    }
    if (loginData.password === "") {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    //axios를 사용해서 에 요청을 하는 부분 https://pre-onboarding-selection-task.shop/auth/signin
    return await axios.post(server.url + "/auth/signin", loginData);
  };
  return (
    <>
      <form>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            이메일
          </label>
          <input
            type="email"
            value={loginData.email}
            onChange={changeLoginData}
            className="form-control"
            name={"email"}
            id="email"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            비밀번호
          </label>
          <input
            type="password"
            value={loginData.password}
            onChange={changeLoginData}
            className="form-control"
            name="password"
            id="password"
          />
        </div>
        <div className="mb-3">
          <p className="text-danger">{errorMsg}</p>
        </div>
        <button
          type="button"
          onClick={() => {
            //실질적으로 로그인 버튼을 클릭 했을때 작동
            clickLoginBtn()
              .then((res) => {
                //로그인에대한 응답 처리
                console.log(res.data.access_token);
                if (res.data.access_token) {
                  localStorage.setItem("token", res.data.access_token);
                  navigate("/todo");
                } else {
                  //로그인 실패
                  //만약 로그인에 실패했을경우, 실패한 이유를 출력
                  setErrorMsg(res.data.message);
                }
              })
              .catch((err) => {
                console.log(err);
                alert("로그인 정보가 틀렸습니다.");
                navigate("/");
              });
          }}
          className="btn btn-primary"
        >
          로그인
        </button>
      </form>
    </>
  );
};
export default Login;
