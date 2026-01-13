export default ({
  hasNextPage,
  hasPrevPage,
  limit,
  nextPage,
  page,
  prevPage,
  totalItems,
  totalPages,
  delta,
}) => {
  const pageHtml = [];
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      i === page ||
      (i >= page - delta && i <= page + delta)
    ) {
      pageHtml.push(i);
    }
    else if (
      i === page - delta - 1 ||
      i === page + delta + 1
    ) {
      pageHtml.push("...");
    }
  }
  return pageHtml;
};
