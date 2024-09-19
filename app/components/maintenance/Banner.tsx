
import React, { useState, useMemo } from 'react';
import { Card, CardBody, Button } from "@nextui-org/react";
import { useDeploymentTime } from './useDeploymentTime';

const Banner: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const { showBanner } = useDeploymentTime();
  const message = process.env.NEXT_PUBLIC_DEPLOYMENTMESSAGE || '';
  
  const truncatedMessage = useMemo(() => {
    if (message.length <= 100) return message;
    return message.slice(0, 97) + '...';
  }, [message]);

  if (!showBanner) return null;

  return (
    <Card className="w-full bg-yellow-100">
      <CardBody>
        <div className="flex flex-col">
          <div className={`transition-all duration-300 ease-in-out ${expanded ? '' : 'line-clamp-1'}`}>
            <p className="text-sm">
              {expanded ? message : truncatedMessage}
            </p>
          </div>
          {message.length > 100 && (
            <Button 
              size="sm"
              variant="light"
              onPress={() => setExpanded(!expanded)}
              className="self-end mt-2"
            >
              {expanded ? 'Collapse' : 'Expand'}
            </Button>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default Banner;