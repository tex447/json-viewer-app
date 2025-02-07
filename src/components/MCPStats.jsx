import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip } from '@/components/ui/tooltip';

const MCPStats = ({ data }) => {
  // Calculate statistics
  const stats = {
    entities: data.filter(item => item.type === 'entity').length,
    relations: data.filter(item => item.type === 'relation').length,
    observations: data.reduce((acc, item) => {
      return acc + (item.observations?.length || 0);
    }, 0),
    entityTypes: [...new Set(data
      .filter(item => item.type === 'entity')
      .map(item => item.entityType))],
    relationTypes: [...new Set(data
      .filter(item => item.type === 'relation')
      .map(item => item.relationType))]
  };

  return (
    <Card className="w-full mb-4 bg-white shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-bold">MCP Data Structure</CardTitle>
        <CardDescription>Statistical overview of the MCP file structure</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <h3 className="text-sm font-medium text-gray-500">Entities</h3>
            <p className="text-2xl font-bold">{stats.entities}</p>
          </div>
          <div className="text-center">
            <h3 className="text-sm font-medium text-gray-500">Relations</h3>
            <p className="text-2xl font-bold">{stats.relations}</p>
          </div>
          <div className="text-center">
            <h3 className="text-sm font-medium text-gray-500">Observations</h3>
            <p className="text-2xl font-bold">{stats.observations}</p>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Entity Types</h3>
            <ScrollArea className="h-20">
              <div className="flex flex-wrap gap-2">
                {stats.entityTypes.map(type => (
                  <Tooltip key={type} content={`${data.filter(item => item.entityType === type).length} instances`}>
                    <Badge variant="secondary" className="cursor-help">
                      {type}
                    </Badge>
                  </Tooltip>
                ))}
              </div>
            </ScrollArea>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Relation Types</h3>
            <ScrollArea className="h-20">
              <div className="flex flex-wrap gap-2">
                {stats.relationTypes.map(type => (
                  <Tooltip key={type} content={`${data.filter(item => item.relationType === type).length} instances`}>
                    <Badge variant="outline" className="cursor-help">
                      {type}
                    </Badge>
                  </Tooltip>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MCPStats;
