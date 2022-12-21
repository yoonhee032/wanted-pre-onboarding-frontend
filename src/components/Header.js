import { Link, useNavigate } from "react-router-dom";

let Header = () => {

   //토큰 사용
    const token = localStorage.getItem("token")
    const navigate = useNavigate();

    //로그아웃 버튼을 눌렀을 경우,
    //localstorage에서 토큰 삭제
    let logOutBtn = () => {
        localStorage.removeItem("token");
        //그 후 home페이지로 이동
        navigate("/");
    }

    return (
        <>
            <header>
                <div className="bg-dark collapse" id="navbarHeader">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-8 col-md-7 py-4">
                                <h4 className="text-white">About</h4>
                                <p className="text-muted">Add some information about the album below, the author, or any other background context. Make it a few sentences long so folks can pick up some informative tidbits. Then, link them off to some social networking sites or contact information.</p>
                            </div>
                            <div className="col-sm-4 offset-md-1 py-4">
                                <h4 className="text-white">Contact</h4>
                                <ul className="list-unstyled">
                                    <li><a href="#" className="text-white">Follow on Twitter</a></li>
                                    <li><a href="#" className="text-white">Like on Facebook</a></li>
                                    <li><a href="#" className="text-white">Email me</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="navbar navbar-dark bg-dark shadow-sm">
                    <div className="container">
                        <a href="#" className="navbar-brand d-flex align-items-center">
                            {/* <svg >로고자리</svg> */}
                            <strong>Things to do</strong>
                        </a>
                        <div style={{
                            width: "23%",
                            display: "flex",
                            justifyContent: "space-between"
                        }}>
                            {
                                //만약 localStorage에 token이 존재하지 않는다면 로그아웃 버튼을 보여주지 않음.
                                   token === null ? (<></>) : (
                                    <button className="btn btn-danger" onClick={logOutBtn}>로그아웃</button>
                                )
                            }
                            <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header;