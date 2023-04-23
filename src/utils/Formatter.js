const formatProductName = (text, maxLength) => {
  return text.slice(0, maxLength) + (text.length > maxLength ? "..." : "");
};

export { formatProductName };
