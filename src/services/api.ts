export const fetchProductDetails = async () => {
    try {
      const response = await fetch('https://s8hemrsz5o.to.intercept.rest/productDetails');
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error('Error fetching product details:', error);
      return null;
    }
  };
  