import React, { useEffect, useState } from "react";
import { getProductCategory } from "../../services/Api";
import ProductItems from "../../shared/components/product-items";
import { useParams } from "react-router-dom";
import { getCategory } from "../../services/Api";
import pagination from "../../shared/ultils/pagination";

const Category = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(1);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { id } = useParams();
  const limit = 9;
  useEffect(() => {
    // fetch products for the category
    const fetchProducts = async () => {
      try {
        if (page === 1) setLoadingProducts(true);
        else setLoadingMore(true);
        const { data } = await getProductCategory(id, { params: { limit, page } });
        const items = data.data || [];
        setTotalItems(data.pages ? data.pages.totalItems : 0);
        if (page === 1) setProducts(items);
        else setProducts((prev) => [...prev, ...items]);
        const totalPages = data.pages ? data.pages.totalPages : Math.ceil((data.pages?.totalItems || items.length) / limit);
        setHasMore(page < totalPages);
      } catch (err) {
        console.log(err);
      } finally {
        setLoadingProducts(false);
        setLoadingMore(false);
      }
    };
    fetchProducts();

    getCategory(id)
      .then(({ data }) => setCategory(data.data))
      .catch((error) => console.log(error));
  }, [id, page]);

  // infinite scroll: load next page when near bottom
  useEffect(() => {
    const onScroll = () => {
      if (!hasMore || loadingMore) return;
      const scrollPos = window.innerHeight + window.scrollY;
      const threshold = document.body.offsetHeight - 300;
      if (scrollPos >= threshold) {
        setPage((p) => p + 1);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [hasMore, loadingMore]);
  return (
    <>
      <div>
        {/*	List Product	*/}
        <div className="products">
          <h3>{category.name} (hiện có {totalItems} sản phẩm)</h3>
          <div className="product-list card-deck">
            {loadingProducts ? (
              <div style={{ width: "100%", textAlign: "center", padding: "40px 0" }}>
                <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ) : (
              products.map((item, index) => {
                return <ProductItems key={index} item={item} />;
              })
            )}
          </div>
          {loadingMore && (
            <div style={{ width: "100%", textAlign: "center", padding: "20px 0" }}>
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          )}
        </div>
        {/*	End List Product	*/}
        <div id="pagination">
          <ul className="pagination">
            <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => setPage((p) => Math.max(1, p - 1))}>
                Trang trước
              </button>
            </li>
            {(() => {
              // show numbered pagination only if you prefer; for lazy loading we still keep numbers
              const totalPages = Math.max(1, Math.ceil(totalItems / limit));
              const pages = pagination({ page, totalPages, totalItems, limit, delta: 2 });
              return pages.map((p, idx) => {
                if (p === "...") {
                  return (
                    <li key={`dots-${idx}`} className="page-item disabled">
                      <span className="page-link">...</span>
                    </li>
                  );
                }
                return (
                  <li key={p} className={`page-item ${page === p ? "active" : ""}`}>
                    <button className="page-link" onClick={() => setPage(p)}>{p}</button>
                  </li>
                );
              });
            })()}
            <li className={`page-item ${page >= Math.ceil(totalItems / limit) ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => setPage((p) => Math.min(Math.ceil(totalItems / limit), p + 1))}>
                Trang sau
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Category;
