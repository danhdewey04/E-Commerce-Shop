import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux-setup/reducers/auth";
import { useNavigate, Link } from "react-router-dom";
import { loginCustomer } from "../../services/Api";
const Login = () => {
    const [inputsLogin, setInputsLogin] = useState({});
    const [txtAlert, setTxtAlert] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const changeInputLogin = (e) => {
      const {name, value} = e.target;
      return setInputsLogin({...inputsLogin, [name]:value});
    };
    const clickLogin = () => {
      loginCustomer(inputsLogin)
      .then(({data})=>{
        console.log(data);

        if (data.status === "success"){
          dispatch(loginSuccess(data));
          return navigate("/");
        }
      })
      .catch((error) => {
        if(error.response.data.message === "Invalid email")
          return setTxtAlert("Email khong hop le")
        if(error.response.data.message === "Invalid password")
          return setTxtAlert("Mat khau khong hop le")
        return console.log(error);
      });
    }
    
    return (<>   
<div id="customer">
  {/* Thông báo lỗi */}
  {txtAlert && (
    <div className="alert alert-danger text-center">{txtAlert}</div>
  )}

  <h3 className="text-center">Đăng nhập</h3>

  <form method="post">
    <div className="row">
      {/* Email */}
      <div id="customer-mail" className="col-lg-6 col-md-6 col-sm-12">
        <input
          onChange={changeInputLogin}
          type="email"
          name="email"
          className="form-control"
          placeholder="Email (bắt buộc)"
          required
          value={inputsLogin?.email || ""}
        />
      </div>

      {/* Mật khẩu */}
      <div id="customer-pass" className="col-lg-6 col-md-6 col-sm-12">
        <input
          onChange={changeInputLogin}
          type="password"
          name="password"
          className="form-control"
          placeholder="Mật khẩu (bắt buộc)"
          required
          value={inputsLogin?.password || ""}
        />
      </div>
    </div>
  </form>

  {/* Nút hành động */}
  <div className="row">
    <div className="by-now col-lg-6 col-md-6 col-sm-12">
      <Link onClick={clickLogin} to="#">
        <b>Đăng nhập ngay</b>
      </Link>
    </div>

    <div className="by-now col-lg-6 col-md-6 col-sm-12">
      <Link to="/">
        <b>Quay về trang chủ</b>
      </Link>
    </div>
  </div>
</div>
{/* End Login Form */}

    </>);
};
export default Login;