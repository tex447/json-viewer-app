import React, { useState } from 'react';

const TreeNode = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Extract the main identifiers we want to show
  const name = data.name || '';
  const entityType = data.entityType || '';
  const observations = data.observations || [];

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
    const type = item.entityType || 'Other';
    if (!groups[type]) {
      groups[type] = [];
    }
    groups[type].push(item);
    return groups;
  }, {});

  return (
    <div className="tree-view">
      {Object.entries(groupedItems).map(([type, items]) => (
        <div key={type} className="entity-group">
          <h3 className="group-header">{type}</h3>
          {items.map((item, index) => (
            <TreeNode key={index} data={item} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default TreeView;