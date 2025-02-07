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

const TreeView = ({ data }) => {
  // Handle both single object and array of objects
  const items = Array.isArray(data) ? data : [data];
  
  // Group items by entityType
  const groupedItems = items.reduce((groups, item) => {
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

  // Sort relations separately if they exist
  const relations = items.filter(item => item.type === 'relation');

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