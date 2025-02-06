import React, { useState } from 'react';

const TreeNode = ({ data, level = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const indent = level * 20; // 20px indentation per level

  const hasChildren = data !== null && 
    typeof data === 'object' && 
    Object.keys(data).length > 0;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const renderValue = () => {
    if (data === null) return 'null';
    if (typeof data !== 'object') return String(data);
    return '';
  };

  return (
    <div style={{ marginLeft: `${indent}px` }}>
      {hasChildren ? (
        <>
          <span 
            onClick={toggleExpand} 
            style={{ cursor: 'pointer', userSelect: 'none' }}
          >
            {isExpanded ? '▼' : '▶'} 
            {Array.isArray(data) ? '[' : '{'} 
            {!isExpanded && `...${Array.isArray(data) ? ']' : '}'}`}
          </span>
          {isExpanded && (
            <div>
              {Object.entries(data).map(([key, value], index) => (
                <div key={key}>
                  <span style={{ color: '#7A3E9D' }}>{key}</span>: 
                  <TreeNode data={value} level={level + 1} />
                  {index < Object.keys(data).length - 1 && ','}
                </div>
              ))}
              <div style={{ marginLeft: `${indent}px` }}>
                {Array.isArray(data) ? ']' : '}'}
              </div>
            </div>
          )}
        </>
      ) : (
        <span style={{ color: typeof data === 'string' ? '#4A9D4A' : '#3E789D' }}>
          {renderValue()}
        </span>
      )}
    </div>
  );
};

const TreeView = ({ data }) => {
  return (
    <div className="tree-view">
      <TreeNode data={data} />
    </div>
  );
};

export default TreeView;