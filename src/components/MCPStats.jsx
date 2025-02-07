import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const MCPStats = ({ data }) => {
  // Calculate MCP statistics
  const calculateStats = (mcpData) => {
    const stats = {
      entities: 0,
      relations: 0,
      observations: 0,
      entityTypes: new Set(),
      relationTypes: new Set()
    };

    // Handle array of objects or single object
    const items = Array.isArray(mcpData) ? mcpData : [mcpData];

    items.forEach(item => {
      if (item.type === 'entity') {
        stats.entities++;
        if (item.entityType) {
          stats.entityTypes.add(item.entityType);
        }
        if (item.observations) {
          stats.observations += item.observations.length;
        }
      } else if (item.type === 'relation') {
        stats.relations++;
        if (item.relationType) {
          stats.relationTypes.add(item.relationType);
        }
      }
    });

    return {
      ...stats,
      entityTypes: Array.from(stats.entityTypes),
      relationTypes: Array.from(stats.relationTypes)
    };
  };

  const stats = calculateStats(data);

  return (
    <div className="mb-6">
      <Card>
        <CardHeader>
          <CardTitle>MCP Data Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Entities</h3>
              <p className="text-2xl font-bold">{stats.entities}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Relations</h3>
              <p className="text-2xl font-bold">{stats.relations}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Observations</h3>
              <p className="text-2xl font-bold">{stats.observations}</p>
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Entity Types</h3>
              <div className="mt-1 text-sm">
                {stats.entityTypes.map(type => (
                  <span key={type} className="inline-block bg-gray-100 rounded px-2 py-1 mr-2 mb-2">
                    {type}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Relation Types</h3>
              <div className="mt-1 text-sm">
                {stats.relationTypes.map(type => (
                  <span key={type} className="inline-block bg-gray-100 rounded px-2 py-1 mr-2 mb-2">
                    {type}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MCPStats;