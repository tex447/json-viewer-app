export const isMCPFormat = (data) => {
  // Handle both array and single object
  const items = Array.isArray(data) ? data : [data];
  
  // Check if every item follows MCP format
  return items.every(item => {
    // Check for required fields based on type
    if (item.type === 'entity') {
      return (
        typeof item.name === 'string' &&
        typeof item.entityType === 'string' &&
        Array.isArray(item.observations)
      );
    } else if (item.type === 'relation') {
      return (
        typeof item.from === 'string' &&
        typeof item.to === 'string' &&
        typeof item.relationType === 'string'
      );
    }
    return false;
  });
};

export const validateMCPData = (data) => {
  try {
    // First check if it's valid JSON
    const parsedData = typeof data === 'string' ? JSON.parse(data) : data;
    
    // Then check if it follows MCP format
    if (isMCPFormat(parsedData)) {
      return {
        isValid: true,
        data: parsedData,
        error: null
      };
    }
    
    return {
      isValid: false,
      data: null,
      error: 'Invalid MCP format'
    };
  } catch (error) {
    return {
      isValid: false,
      data: null,
      error: 'Invalid JSON format'
    };
  }
};