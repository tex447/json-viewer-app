import React, { useState } from 'react';

const TreeNode = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Extract the main identifiers we want to show
  const name = data.name || '';
  const entityType = data.entityType || '';
  const observations = data.observations || [];
  const timestamp = data.timestamp || 0;

  // Format timestamp if it exists
  const formattedDate = timestamp ? new Date(timestamp).toLocaleString() : '';

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="tree-node">
      <div 
        className="node-header"
        onClick={toggleExpand}
      >
        <span className="expand-icon">{isExpanded ? '▼' : '▶'}</span>
        <span className="entity-name">{name}</span>
        <span className="entity-type">{entityType}</span>
        {timestamp > 0 && (
          <span className="timestamp text-sm text-gray-500 ml-2">
            {formattedDate}
          </span>
        )}
      </div>
      
      {isExpanded && (
        <div className="node-content">
          {observations.map((observation, index) => (
            <div key={index} className="observation">
              {observation}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const TreeView = ({ data, searchTerm = '' }) => {
  // Handle both single object and array of objects
  const items = Array.isArray(data) ? data : [data];
  
  // Filter items based on search term
  const filterBySearch = (item) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    
    if (item.type === 'entity') {
      return (
        (item.name || '').toLowerCase().includes(term) ||
        (item.entityType || '').toLowerCase().includes(term) ||
        (item.observations || []).some(obs => 
          obs.toLowerCase().includes(term)
        )
      );
    }
    
    if (item.type === 'relation') {
      return (
        (item.from || '').toLowerCase().includes(term) ||
        (item.to || '').toLowerCase().includes(term) ||
        (item.relationType || '').toLowerCase().includes(term)
      );
    }
    
    return false;
  };

  // Filter items before grouping
  const filteredItems = items.filter(filterBySearch);
  
  // Group filtered items by entityType
  const groupedItems = filteredItems.reduce((groups, item) => {
    if (item.type !== 'entity') return groups;
    
    const type = item.entityType || 'Other';
    if (!groups[type]) {
      groups[type] = [];
    }
    groups[type].push(item);
    return groups;
  }, {});

  // Sort each group by timestamp (most recent first)
  Object.keys(groupedItems).forEach(type => {
    groupedItems[type].sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
  });

  // Filter relations
  const relations = filteredItems.filter(item => item.type === 'relation');

  // Don't render anything if no items match the search
  if (searchTerm && filteredItems.length === 0) {
    return (
      <div className="text-gray-500 p-4">
        No results found for "{searchTerm}"
      </div>
    );
  }

  return (
    <div className="tree-view">
      {Object.entries(groupedItems).map(([type, items]) => (
        <div key={type} className="entity-group mb-6">
          <h3 className="group-header text-xl font-semibold mb-2">{type}</h3>
          {items.map((item, index) => (
            <TreeNode key={item.name || index} data={item} />
          ))}
        </div>
      ))}
      
      {relations.length > 0 && (
        <div className="entity-group mb-6">
          <h3 className="group-header text-xl font-semibold mb-2">Relations</h3>
          {relations.map((item, index) => (
            <div key={index} className="relation-node p-2 border-b">
              <span className="font-medium">{item.from}</span>
              <span className="mx-2 text-gray-500">{item.relationType}</span>
              <span className="font-medium">{item.to}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeView;