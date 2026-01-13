import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Header from "./shared/components/Layout/Header";
import Menu from "./shared/components/Layout/Menu";
import Slider from "./shared/components/Layout/Slider";
import Banner from "./shared/components/Layout/Banner";
import Footer from "./shared/components/Layout/Footer";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Category from "./pages/Category";
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/ProductDetail";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Search from "./pages/Search";
import Success from "./pages/Success";
import { store } from "./redux-setup/store";
import { Provider } from "react-redux";

function App() {
  return (
    <>
      <BrowserRouter>
        <Provider store={store}>
        <div>
          <Header />
          {/*	Body	*/}
          <div id="body">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <Menu />
                </div>
              </div>
              <div className="row">
                <div id="main" className="col-lg-8 col-md-12 col-sm-12">
                  {/*	Slider	*/}
                  <Slider />
                  {/*	End Slider	*/}
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/category/:id" element={<Category />} />
                    <Route path="/product-detail/:id" element={<ProductDetail />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/success" element={<Success />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<NotFound />} />

                  </Routes>
                </div>
                <Banner />
              </div>
            </div>
          </div>
          {/*	End Body	*/}
          <Footer />
          {/*	End Footer	*/}
        </div>
        </Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
