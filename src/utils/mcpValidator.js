// Function to extract timestamp from observation strings
const extractTimestamp = (observations) => {
  const timestampRegex = /(?:Timestamp|Last updated|Date):\s*([A-Za-z]+\s+\d{1,2},\s+\d{4}(?:\s+\d{1,2}:\d{2}(?::\d{2})?\s*(?:AM|PM|ET|CT|GMT)?)?)/i;
  
  for (const observation of observations) {
    const match = observation.match(timestampRegex);
    if (match) {
      return new Date(match[1]).getTime();
    }
  }
  return 0; // Default to 0 if no timestamp found
};

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
      // If it's an array, process each item
      const processedData = Array.isArray(parsedData) 
        ? parsedData.map(item => {
            if (item.type === 'entity') {
              return {
                ...item,
                timestamp: extractTimestamp(item.observations)
              };
            }
            return item;
          })
        : parsedData;

      return {
        isValid: true,
        data: processedData,
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