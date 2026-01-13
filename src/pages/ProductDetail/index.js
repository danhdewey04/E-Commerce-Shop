import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProduct, getComments, createComment, getProductCategory, getProducts } from "../../services/Api";
import { getImageProduct } from "../../shared/ultils";
import { formatDate } from "../../shared/ultils";
import { formatPrice } from "../../shared/ultils";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux-setup/reducers/cart";
import pagination from "../../shared/ultils/pagination";
const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [comments, setComments] = useState([]);
  const [inputComment, setInputComment] = useState({});
  const [commentId, setCommentId] = useState("");
  const [commentsTotal, setCommentsTotal] = useState(0);
  const [commentsPage, setCommentsPage] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [productsInCategory, setProductsInCategory] = useState([]);

  const changeInput = (e) => {
    const { name, value } = e.target;
    setInputComment({ ...inputComment, [name]: value });
  };
  const ClickAddToCat = (type) => {
    // show short loading effect when adding to cart
    setAdding(true);
    dispatch(
      addToCart({
        prd_id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        qty: 1,
      })
    );
    // small delay to let user see loading state
    setTimeout(() => {
      setAdding(false);
      if (type === "buy-now") navigate("/cart");
    }, 300);
  };
  const [adding, setAdding] = useState(false);
  const clickComment = () => {
    createComment(id, inputComment)
      .then(({ data }) => {
        if (data.status === "success") {
          setInputComment({});
          setCommentId(data.data._id);
        }
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    setLoadingProduct(true);
    getProduct(id)
      .then(({ data }) => setProduct(data.data))
      .catch((error) => console.log(error))
      .finally(() => setLoadingProduct(false));

    getComments(id, {
      params: {
        limit: 5,
        page: commentsPage,
        sort: -1,
      },
    })
      .then(({ data }) => {
        setComments(data.data);
        setCommentsTotal(data.pages ? data.pages.totalItems : 0);
      })
      .catch((error) => console.log(error));
  }, [commentId, id, commentsPage]);

  // fetch all products in the same category to allow product-level pagination
  useEffect(() => {
    const loadCategoryProducts = async () => {
      try {
        // determine category id from product object using common keys
        const categoryId = product?.category?._id || product?.categoryId || product?.category || product?.category_id || product?.categoryId;
        if (!categoryId) return setProductsInCategory([]);
        // try getProductCategory (categories/:id/products)
        try {
          const { data } = await getProductCategory(categoryId, { params: { limit: 1000, page: 1 } });
          const items = data.data || [];
          setProductsInCategory(items);
          return;
        } catch (e) {
          // fallback to getProducts with category param
        }
        try {
          const { data } = await getProducts({ params: { category: categoryId, limit: 1000 } });
          const items = data.data || [];
          setProductsInCategory(items);
        } catch (e) {
          setProductsInCategory([]);
        }
      } catch (e) {
        setProductsInCategory([]);
      }
    };
    loadCategoryProducts();
  }, [product]);

  return (
    <>
      <div>
        {/*	List Product	*/}
        <div id="product">
          {loadingProduct ? (
            <div style={{ width: "100%", textAlign: "center", padding: "80px 0" }}>
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <>
              <div id="product-head" className="row">
                <div id="product-img" className="col-lg-6 col-md-6 col-sm-12">
                  <img src={`${getImageProduct(product?.image)}`} />
                </div>
                <div id="product-details" className="col-lg-6 col-md-6 col-sm-12">
                  <h1>{product?.name}</h1>
                  <ul>
                    <li>
                      <span>Bảo hành:</span> 12 Tháng
                    </li>
                    <li>
                      <span>Đi kèm:</span> {product?.accessories}
                    </li>
                    <li>
                      <span>Tình trạng:</span> {product?.status}
                    </li>
                    <li>
                      <span>Khuyến Mại:</span> Dán Màn Hình 3 lớp
                    </li>
                    <li id="price">Giá Bán (chưa bao gồm VAT)</li>
                    <li id="price-number">{formatPrice(product?.price)}</li>
                    <li
                      id="status"
                      className={product?.is_stock ? "" : "text-danger"}
                    >
                      {product?.is_stock ? "Còn hàng" : "Hết hàng"}
                    </li>
                  </ul>
                  {product?.is_stock && (
                    <div id="add-cart">
                      <button
                        onClick={() => ClickAddToCat("buy-now")}
                        className="btn btn-warning mr-2"
                        disabled={adding}
                      >
                        {adding ? (
                          <>
                            <span className="spinner-border spinner-border-sm mr-2" role="status" />
                            Đang xử lý...
                          </>
                        ) : (
                          "Mua ngay"
                        )}
                      </button>

                      <button onClick={() => ClickAddToCat()} className="btn btn-info" disabled={adding}>
                        {adding ? (
                          <>
                            <span className="spinner-border spinner-border-sm mr-2" role="status" />
                            Đang thêm
                          </>
                        ) : (
                          "Thêm vào giỏ hàng"
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
          <div id="product-body" className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <h3>Đánh giá về {product?.name}</h3>
              <p>{product?.details}</p>
            </div>
          </div>
          {/*	Comment	*/}
          <div id="comment" className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <h3>Bình luận sản phẩm</h3>
              <form method="post">
                <div className="form-group">
                  <label>Tên:</label>
                  <input
                    onChange={changeInput}
                    name="name"
                    required
                    type="text"
                    className="form-control"
                    value={inputComment?.name || ""}
                  />
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    onChange={changeInput}
                    name="email"
                    value={inputComment?.email || ""}
                    required
                    type="email"
                    className="form-control"
                    id="pwd"
                  />
                </div>
                <div className="form-group">
                  <label>Nội dung:</label>
                  <textarea
                    onChange={changeInput}
                    name="content"
                    required
                    rows={8}
                    className="form-control"
                    value={inputComment?.content || ""}
                  />
                </div>
                <button
                  type="button"
                  onClick={clickComment}
                  name="sbm"
                  className="btn btn-primary"
                >
                  Gửi
                </button>
              </form>
            </div>
          </div>
          {/*	End Comment	*/}
          {/*	Comments List	*/}
          <div id="comments-list" className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              {comments?.map((item, index) => {
                return (
                  <div key={index} className="comment-item">
                    <ul>
                      <li>
                        <b>{item.name}</b>
                      </li>
                      <li>{formatDate(item.createdAt)}</li>
                      <li>
                        <p>{item.content}</p>
                      </li>
                    </ul>
                  </div>
                );
              })}
              <div id="pagination-comments" style={{marginTop: '10px'}}> 
                <ul className="pagination">
                  <li className={`page-item ${commentsPage === 1 ? "disabled" : ""}`}>
                    <button className="page-link" onClick={() => setCommentsPage((p) => Math.max(1, p - 1))}>Trang trước</button>
                  </li>
                  {Array.from({ length: Math.max(1, Math.ceil(commentsTotal / 5)) }).map((_, idx) => (
                    <li key={idx} className={`page-item ${commentsPage === idx + 1 ? "active" : ""}`}>
                      <button className="page-link" onClick={() => setCommentsPage(idx + 1)}>{idx + 1}</button>
                    </li>
                  ))}
                  <li className={`page-item ${commentsPage >= Math.ceil(commentsTotal / 5) ? "disabled" : ""}`}>
                    <button className="page-link" onClick={() => setCommentsPage((p) => p + 1)}>Trang sau</button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/*	End Comments List	*/}
        </div>
        {/*	End Product	*/}
        <div id="pagination">
          <ul className="pagination">
            {/** product-level pagination within same category **/}
            {productsInCategory && productsInCategory.length ? (
              (() => {
                const totalItemsLocal = productsInCategory.length;
                const totalPages = Math.max(1, totalItemsLocal);
                // find current index
                const currentIndex = productsInCategory.findIndex((p) => p._id === product?._id);
                const currentPage = currentIndex >= 0 ? currentIndex + 1 : 1;
                const pages = pagination({ page: currentPage, totalPages, totalItems: totalItemsLocal, limit: 1, delta: 2 });
                return (
                  <>
                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                      <button
                        className="page-link"
                        onClick={() => {
                          if (currentPage > 1) navigate(`/product-detail/${productsInCategory[currentPage - 2]._id}`);
                        }}
                      >
                        Trang trước
                      </button>
                    </li>
                    {pages.map((p, idx) => {
                      if (p === "...") {
                        return (
                          <li key={`dots-${idx}`} className="page-item disabled">
                            <span className="page-link">...</span>
                          </li>
                        );
                      }
                      const prod = productsInCategory[p - 1];
                      return (
                        <li key={p} className={`page-item ${currentPage === p ? "active" : ""}`}>
                          <button
                            className="page-link"
                            onClick={() => {
                              if (prod && prod._id !== product?._id) {
                                navigate(`/product-detail/${prod._id}`);
                              }
                            }}
                          >
                            {p}
                          </button>
                        </li>
                      );
                    })}
                    <li className={`page-item ${currentPage >= totalPages ? "disabled" : ""}`}>
                      <button
                        className="page-link"
                        onClick={() => {
                          if (currentPage < totalPages) navigate(`/product-detail/${productsInCategory[currentPage]._id}`);
                        }}
                      >
                        Trang sau
                      </button>
                    </li>
                  </>
                );
              })()
            ) : (
              <></>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
