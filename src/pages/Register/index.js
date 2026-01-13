import { useState } from "react";
import { Link } from "react-router-dom";
import { registerCustomer } from "../../services/Api";
const Register = () => {
  const [inputRegister, setInputRegister] = useState({});
  const [txtAlert, setTxtAlert] = useState(false);
  const [sttAlert, setSttAlert] = useState(false);
  const changeInputsRegister = (e) => {
    const {name, value} = e.target;
    return setInputRegister({...inputRegister,[name]: value});
  };
  const clickRegister = () => {
    registerCustomer(inputRegister)
    .then(({data}) => {
      if (data.status === "success"){
        setTxtAlert("Đăng ký tài khoản thành công!");
        setSttAlert(true);
        return setInputRegister({});
      }
    })
    .catch((error)=>{
      if (error.response.data.message === "Email already exists"){
        setTxtAlert("Email đã tồn tại");
        return setSttAlert(false);
      }
        
       if (error.response.data.message === "Phone already exists"){
        setTxtAlert("Số điện thoại đã tồn tại");
        return setSttAlert(false);
       }
    });
  }

    return (
    <>
    {/* Register Form */}
<div id="customer">
  {/* Thông báo lỗi */}
      {
      txtAlert && (
        <div className={`alert alert-${
          sttAlert ? "success" : "danger"} 
          text-center`}>{txtAlert}</div>
      )}
  <h3 className="text-center">Đăng ký</h3>

  <form method="post">
    <div className="row">
      {/* Họ và tên */}
      <div id="customer-name" className="col-lg-6 col-md-6 col-sm-12">
        <input
          onChange={changeInputsRegister}
          type="text"
          name="fullName"
          className="form-control"
          placeholder="Họ và tên (bắt buộc)"
          required
          value={inputRegister?.fullName || ""}
        />
      </div>

      {/* Mật khẩu */}
      <div id="customer-pass" className="col-lg-6 col-md-6 col-sm-12">
        <input
          onChange={changeInputsRegister}
          type="password"
          name="password"
          className="form-control"
          placeholder="Mật khẩu (bắt buộc)"
          required
          value={inputRegister?.password || ""}
        />
      </div>

      {/* Email */}
      <div id="customer-mail" className="col-lg-6 col-md-6 col-sm-12">
        <input
          onChange={changeInputsRegister}
          type="email"
          name="email"
          className="form-control"
          placeholder="Email (bắt buộc)"
          required
          value={inputRegister?.email || ""}
        />
      </div>

      {/* Số điện thoại */}
      <div id="customer-phone" className="col-lg-6 col-md-6 col-sm-12">
        <input
          onChange={changeInputsRegister}
          type="text"
          name="phone"
          className="form-control"
          placeholder="Số điện thoại (bắt buộc)"
          required
          value={inputRegister?.phone || ""}
        />
      </div>

      {/* Địa chỉ */}
      <div id="customer-add" className="col-lg-12 col-md-12 col-sm-12">
        <input
          onChange={changeInputsRegister}
          type="text"
          name="address"
          className="form-control"
          placeholder="Địa chỉ nhà riêng hoặc cơ quan (bắt buộc)"
          required
          value={inputRegister?.address || ""}
        />
      </div>
    </div>
  </form>

  {/* Nút hành động */}
  <div className="row">
    <div className="by-now col-lg-6 col-md-6 col-sm-12">
      <Link onClick={clickRegister} to="#">
        <b>Đăng ký ngay</b>
      </Link>
    </div>

    <div className="by-now col-lg-6 col-md-6 col-sm-12">
      <Link to="/">
        <b>Quay về trang chủ</b>
      </Link>
    </div>
  </div>
</div>
{/* End Register Form */}
    </>
)};
export default Register;