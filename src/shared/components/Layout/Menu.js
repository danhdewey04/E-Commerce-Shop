import React, { useEffect, useState } from "react";
import { getCategories } from "../../../services/Api";
import { Link } from 'react-router-dom';

const Menu = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const load = () => {
    setLoading(true);
    setError(false);
    getCategories()
      .then(({ data }) => setCategories(data.data || []))
      .catch((err) => {
        console.error("Failed to load categories:", err);
        setError(true);
        setCategories([]);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <nav>
      <div id="menu" className="collapse navbar-collapse">
        {loading ? (
          <div style={{ padding: 12 }}>
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : error ? (
          <div style={{ padding: 12 }}>
            <div style={{ marginBottom: 8 }}>Không thể tải danh mục.</div>
            <button className="btn btn-sm btn-outline-secondary" onClick={load}>Thử lại</button>
          </div>
        ) : (
          <ul>
            {categories.map((item, index) => {
              return (
                <li key={index} className="menu-item">
                  <Link to={`/category/${item._id}`}>{item.name}</Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Menu;
