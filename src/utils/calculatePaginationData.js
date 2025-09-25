export const calculatePaginationData = (flowersCount, page, perPage) => {
  const totalPages = Math.ceil(flowersCount / perPage);
  const hasNextPage = Boolean(totalPages - page);
  const hasPreviousPage = page !== 1;

  return {
    page,
    perPage,
    totalItems: flowersCount,
    totalPages,
    hasNextPage,
    hasPreviousPage,
  };
};
