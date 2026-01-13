const { BASE_URL } = require("../constants/app");
const moment = require ("moment");
export const getImageProduct = (imageName) => {
  return `${BASE_URL}/assets/uploads/products/${imageName}`;
};

export const getImageBanner = (imageName) => {
  return `${BASE_URL}/assets/uploads/banners/${imageName}`;
};

export const getImageSlider = (imageName) => {
  return `${BASE_URL}/assets/uploads/sliders/${imageName}`;
};

export const buildUrlPagination = (pathname, searchParams, newPage) => {
  const params = new URLSearchParams(searchParams);
  params.set("page", newPage);  
  return `${pathname}?${params}`;
}

export const formatPrice = (price) => {
  if (price == null) return "";
  return Number(price).toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
};

export const formatDate = (data) => {
  if (data == null) return "";
  return moment(data).format("DD-MM-YYYY H:m:s");
};
