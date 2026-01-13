import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateCart, deleteItemCart, clearCart } from "../../redux-setup/reducers/cart";
import { getImageProduct, formatPrice } from "../../shared/ultils";
import { createOrder, sendOrderEmail } from "../../services/Api";

const Cart = () => {
  const [customerInfo, setCustomerInfo] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector(({cart}) => cart.items);
  const newItems = items.map((item) => ({ prd_id: item.prd_id, qty: item.qty }));
  const totalPrice = items.reduce((sum, item) => sum + item.qty * item.price, 0);

  const changeCustomerInfo = (e) => {
    const { name, value } = e.target;
    return setCustomerInfo({
      ...customerInfo,
      [name]: value
    });
  }
  const [ordering, setOrdering] = useState(false);

  const clickOrder = async () => {
    console.log({ items: newItems, totalPrice, ...customerInfo });
    if (!customerInfo?.email) {
      return alert("Vui lòng nhập email để nhận thông tin đơn hàng");
    }
    try {
      setOrdering(true);
      const { data } = await createOrder({ items: newItems, totalPrice, ...customerInfo });
      console.log(data);
      if (data.status === "success") {
        try {
          // attempt to send order email (backend must support /send-order-email)
          await sendOrderEmail({ email: customerInfo.email, order: data.data });
          console.log("Order confirmation email requested");
        } catch (e) {
          console.warn("sendOrderEmail failed", e);
        }
        dispatch(clearCart());
        navigate("/Success");
      } else {
        alert("Đặt hàng không thành công");
      }
    } catch (error) {
      console.log(error.response || error);
      alert("Đặt hàng gặp lỗi, thử lại sau");
    } finally {
      setOrdering(false);
    }
  };
  const changeQuantity = (e, id) => {
    if(Number(e.target.value) <= 0) {
      const isConfirm = window.confirm("Bạn có muốn xóa sản phẩm khỏi giỏ hàng?");
        return isConfirm ? dispatch(deleteItemCart({prd_id: id})): false;
      }
      return dispatch(
        updateCart({
          prd_id: id, 
          qty: Number(e.target.value)
      }));
  };

  const clickDeleteItemCart = (id) => {
    const isConfirm = window.confirm("Bạn có muốn xóa sản phẩm khỏi giỏ hàng?");
    return isConfirm ? dispatch(deleteItemCart({prd_id: id})): false;
  }
  return (
    <>
      <div>
        {/*	Cart	*/}
        <div id="my-cart">
          <div className="row">
            <div className="cart-nav-item col-lg-7 col-md-7 col-sm-12">
              Thông tin sản phẩm
            </div>
            <div className="cart-nav-item col-lg-2 col-md-2 col-sm-12">
              Tùy chọn
            </div>
            <div className="cart-nav-item col-lg-3 col-md-3 col-sm-12">Giá</div>
          </div>
          <form method="post">
            {
            items?.map((item, index) => (
              <div key={index} className="cart-item row">
              <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
                <img src={getImageProduct(item.image)} />
                <h4>{item.name}</h4>
              </div>
              <div className="cart-quantity col-lg-2 col-md-2 col-sm-12">
                <input
                  type="number"
                  id="quantity"
                  className="form-control form-blue quantity"
                  value={item.qty}
                  onChange={(e) => changeQuantity(e, item.prd_id)}
                />
              </div>
              <div className="cart-price col-lg-3 col-md-3 col-sm-12">
                <b>{formatPrice(item.qty*item.price)}</b>
                  <Link onClick={() => clickDeleteItemCart(item.prd_id)} to="#">
                Xóa
                </Link>
              </div>
            </div>
            ))}            
            
            <div className="row">
              <div className="cart-thumb col-lg-7 col-md-7 col-sm-12" />
              <div className="cart-total col-lg-2 col-md-2 col-sm-12">
                <b>Tổng cộng:</b>
              </div>
              <div className="cart-price col-lg-3 col-md-3 col-sm-12">
                <b>{
                formatPrice(
                  items.reduce(
                    (total, item) => total + item.qty * item.price, 0
                    ))}
                </b>
              </div>
            </div>
          </form>
        </div>
        {/*	End Cart	*/}
        {/*	Customer Info	*/}
        <div id="customer">
          <form method="post">
            <div className="row">
              <div id="customer-name" className="col-lg-4 col-md-4 col-sm-12">
                <input
                  onChange={changeCustomerInfo}
                  placeholder="Họ và tên (bắt buộc)"
                  type="text"
                  name="fullName"
                  className="form-control"
                  required
                />
              </div>
              <div id="customer-phone" className="col-lg-4 col-md-4 col-sm-12">
                <input
                  onChange={changeCustomerInfo}
                  placeholder="Số điện thoại (bắt buộc)"
                  type="text"
                  name="phone"
                  className="form-control"
                  required
                />
              </div>
              <div id="customer-mail" className="col-lg-4 col-md-4 col-sm-12">
                <input
                  onChange={changeCustomerInfo}
                  placeholder="Email (bắt buộc)"
                  type="text"
                  name="email"
                  className="form-control"
                  required
                />
              </div>
              <div id="customer-add" className="col-lg-12 col-md-12 col-sm-12">
                <input
                  onChange={changeCustomerInfo}
                  placeholder="Địa chỉ nhà riêng hoặc cơ quan (bắt buộc)"
                  type="text"
                  name="address"
                  className="form-control"
                  required
                />
              </div>
            </div>
          </form>
          <div className="row">
            <div className="by-now col-lg-6 col-md-6 col-sm-12">
              <button onClick={clickOrder} className="btn btn-danger" disabled={ordering}>
                {ordering ? (
                  <>
                    <span className="spinner-border spinner-border-sm mr-2" role="status" />
                    Đang gửi đơn
                  </>
                ) : (
                  <>
                    <b>Mua ngay</b>
                    <span>Giao hàng tận nơi siêu tốc</span>
                  </>
                )}
              </button>
            </div>
            <div className="by-now col-lg-6 col-md-6 col-sm-12">
              <a href="#">
                <b>Trả góp Online</b>
                <span>Vui lòng call (+84) 0988 550 553</span>
              </a>
            </div>
          </div>
        </div>
        {/*	End Customer Info	*/}
      </div>
    </>
  );
};

export default Cart;
