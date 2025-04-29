export const getPriceQueryParams = (searchParams, key, value) => {
    const hasValueInParam = searchParams.has(key);
  
    if ((value !== null && value !== undefined) && hasValueInParam) {
      searchParams.set(key, value); // Update the existing parameter
    } else if (value !== null && value !== undefined) {
      searchParams.append(key, value); // Append a new parameter with both key and value
    } else if (hasValueInParam) {
      searchParams.delete(key); // Remove the parameter if no valid value is provided
    }
  
    return searchParams;
  };
  