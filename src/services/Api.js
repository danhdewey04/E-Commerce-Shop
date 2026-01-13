import Htttp from "./Http";
export const getProducts = (config) => Htttp.get("/products", config);
export const getCategories = () => Htttp.get("/categories");
export const getProduct = (id) => Htttp.get(`/products/${id}`);
export const getProductCategory = (id, config) =>
  Htttp.get(`/categories/${id}/products`, config);
export const getCategory = (id) => Htttp.get(`/categories/${id}`);
export const getComments = (id, config) =>
  Htttp.get(`/products/${id}/comments`, config);
export const createComment = (id, data) =>
  Htttp.post(`/products/${id}/comments`, data);
export const createOrder = (data) => Htttp.post("/customers/orders", data);
export const getBanners = (config) => Htttp.get("/banners", config);
export const getSliders = (config) => Htttp.get("/sliders", config);
export const sendOrderEmail = (data) => Htttp.post("/send-order-email", data);
export const registerCustomer = (data) => 
  Htttp.post("/auth/customers/register", data);
export const loginCustomer = (data) => 
  Htttp.post("/auth/customers/login", data);