import React, { useEffect, useState } from "react";
import { getProducts } from "../../services/Api";
import ProductItems from './../../shared/components/product-items';
const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  useEffect(() => {
    getProducts({ params: { is_featured: true, limit: 6 } })
      .then((response) => {
        setFeaturedProducts(response.data?.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the products!", error);
      });
  }, []);

  useEffect(() => {
    getProducts({params: {limit: 6}})
      .then((response) => {
        setNewProducts(response.data?.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the products!", error);
      });
  }, []);

  return (
    <>
      {/*	Feature Product	*/}
      <div className="products">
        <h3>Sản phẩm nổi bật</h3>
        <div className="product-list card-deck">
          {
            featuredProducts.map((product, index) =>{
              return (
                <ProductItems key={index} item={product} />
              )
            }) 
          }
        </div>
      </div>
      {/*	End Feature Product	*/}
      {/*	Latest Product	*/}
      <div className="products">
        <h3>Sản phẩm mới</h3>
        <div className="product-list card-deck">
          {
            newProducts.map((product, index) =>{
              return (
                <ProductItems key={index} item={product} />
              )
            }) 
          }
        </div>
      </div>
      {/*	End Latest Product	*/}
    </>
  );
};

export default Home;
