import React, { useEffect, useState } from "react";
import { useSearchParams, Link, useLocation } from "react-router-dom";
import ProductItems from "../../shared/components/product-items";
import { getProducts } from "../../services/Api";
import pagination from "../../shared/ultils/pagination";
import { buildUrlPagination } from "../../shared/ultils";
const Search = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [pages, setPages] = useState({});
  const {pathname, search} = location;
  const keyword = searchParams.get("keyword");
  const page = searchParams.get("page") || 1;
  const checkPageNumber = (e, item) => {
    if (item === "...") {
      return e.preventDefault();
    }
    return;
  }
  useEffect(() => {
    getProducts({
      params: {
        keyword,
        limit: 12,
        page,
      },
    })
      .then(({ data }) => {
        setProducts(data.data);
        setPages({ ...data.pages, delta: 2 });
      })
      .catch((error) => console.log(error));
  }, [keyword, page]);
  return (
    <>
      <div>
        {/*	List Product	*/}
        <div className="products">
          <div id="search-result">
            Kết quả tìm kiếm với sản phẩm <span>{keyword}</span>
          </div>
          <div className="product-list card-deck">
            {products.map((item, index) => {
              return <ProductItems key={index} item={item} />;
            })}
          </div>
        </div>
        {/*	End List Product	*/}
        <div id="pagination">
          <ul className="pagination">
            {pages.hasPrevPage && (
              <li className="page-item">
                <Link
                  className="page-link"
                  to={buildUrlPagination(pathname, search, pages.page - 1)}
                >
                  Trang trước
                </Link>
              </li>
            )}
            {pagination(pages).map((item, index) => {
              return (
                <li
                  key={index}
                  className={
                    item == pages.page ? "page-item active" : "page-item"
                  }
                >
                  <Link
                    onClick={(e) => checkPageNumber(e, item)}
                    className="page-link"
                    to={buildUrlPagination(pathname, search, item)}
                  >
                    {item}
                  </Link>
                </li>
              );
            })}
            {pages.hasNextPage && (
              <li className="page-item">
                <Link
                  className="page-link"
                  to={buildUrlPagination(pathname, search, pages.page + 1)}
                >
                  Trang sau
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Search;
