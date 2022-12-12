import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SignUp from "./user/SignUp";
import Login from "./user/Login";

let Home = () => {
  const [status, setStatus] = useState({
    login: false,
    signUp: false,
  });

  return (
    <main>
      <section className="py-5 text-center container">
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-bold"> Mylog </h1>
            <p className="lead text-muted">Hi</p>
            <p>
              <button
                onClick={() => {
                  setStatus({
                    login: true,
                    signUp: false,
                  });
                }}
                className="btn btn-primary my-2 m-1"
              >
                로그인
              </button>
              <button
                onClick={() => {
                  setStatus({
                    login: false,
                    signUp: true,
                  });
                }}
                className="btn btn-secondary my-2 m-1"
              >
                회원가입
              </button>
            </p>
          </div>
        </div>
      </section>
      <div className={"container"}>
        {status.signUp === true ? <SignUp /> : <></>}
        {status.login === true ? <Login /> : <></>}
      </div>
    </main>
  );
};
export default Home;
