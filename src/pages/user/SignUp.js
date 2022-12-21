import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import server from "./../../config/server.json";

let SignUp = ({setStatus}) => {
  const navigate = useNavigate();
  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    console.log(signUpData);
  }, [signUpData]);

  //input의 값을 입력 했을 경우 signUpData의 값을 넣어줌.
  let changeSignUpData = (e) => {
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value,
    });
  };

  const isValidEmail =
    signUpData.email.includes("@") && signUpData.email.includes(".");

  const isValidPassword = signUpData.password.length >= 8;

  const isValidConfirmPassword = signUpData.password === signUpData.confirmPassword


  // 유효성 검사 후 서버에 요청
  let clickSignUpBtn = async () => {
    if (signUpData.email === "") {
      alert("이메일을 입력해주세요.");
      return;
    }

    if (signUpData.password === "") {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    if (!isValidEmail) {
      alert("이메일 형식을 맞춰주세요");
      return;
    }

    if (!isValidPassword) {
      alert("비밀번호를 8자 이상 입력해주세요");
      return;
    }

    if (!isValidConfirmPassword){
      alert("비밀번호를 확인해주세요");
      return;
    }

    delete signUpData.confirmPassword;

    console.log(signUpData)

    return await axios.post(server.url + "/auth/signup", signUpData);
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
            value={signUpData.email}
            onChange={changeSignUpData}
            className="form-control"
            name="email"
            id="email"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            비밀번호
          </label>
          <input
            type="password"
            value={signUpData.password}
            onChange={changeSignUpData}
            className="form-control"
            name="password"
            id="password"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            비밀번호 확인
          </label>
          <input
            type="password"
            value={signUpData.confirmPassword}
            onChange={changeSignUpData}
            className="form-control"
            name="confirmPassword"
            id="confirmPassword"
          />
        </div>

        <div className="mb-3">
          <p className="text-danger">{errorMsg}</p>
        </div>
        <button
          type="button"
          onClick={() => {
            clickSignUpBtn()
              .then((res) => {
                console.log(res);
                if (res.status) {
                  alert("회원가입이 완료되었습니다.");
                  setStatus({
                    login: true,
                    signUp: false,
                  });
                } else {
                  setErrorMsg(res.data.message);
                  setSignUpData({
                    email: "",
                    password: "",
                    confirmPassword:"",
                  });
                }
              })
              .catch((e) => {
                console.log(e);
              });
          }}
          className="btn btn-primary"
        >
          회원가입
        </button>
      </form>
    </>
  );
};

export default SignUp;
