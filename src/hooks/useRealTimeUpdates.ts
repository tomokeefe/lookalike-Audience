import { useState, useEffect, useCallback } from "react";
import { Audience } from "./useAudiences";

interface RealTimeUpdate {
  type: "status_change" | "reach_update" | "new_audience" | "audience_deleted";
  audienceId: number;
  data: Partial<Audience>;
  timestamp: Date;
}

// Simulate WebSocket connection for real-time updates
export const useRealTimeUpdates = (
  audiences: Audience[],
  onAudienceUpdate: (updates: Partial<Audience> & { id: number }) => void,
) => {
  const [isConnected, setIsConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const simulateUpdate = useCallback(() => {
    if (audiences.length === 0) return;

    // Randomly select an audience to update
    const randomAudience =
      audiences[Math.floor(Math.random() * audiences.length)];

    // Simulate different types of updates
    const updateTypes = [
      {
        type: "reach_update",
        data: {
          reach: randomAudience.reach
            ? randomAudience.reach + Math.floor(Math.random() * 10000)
            : 1000000,
        },
      },
      {
        type: "status_change",
        data: {
          status:
            randomAudience.status === "processing"
              ? ("active" as const)
              : randomAudience.status,
        },
      },
    ];

    const randomUpdate =
      updateTypes[Math.floor(Math.random() * updateTypes.length)];

    onAudienceUpdate({
      id: randomAudience.id,
      ...randomUpdate.data,
    });

    setLastUpdate(new Date());
  }, [audiences, onAudienceUpdate]);

  useEffect(() => {
    // Simulate WebSocket connection
    setIsConnected(true);

    // Simulate periodic updates every 10-30 seconds
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        // 30% chance of update
        simulateUpdate();
      }
    }, 10000);

    return () => {
      clearInterval(interval);
      setIsConnected(false);
    };
  }, [simulateUpdate]);

  const forceUpdate = useCallback(() => {
    simulateUpdate();
  }, [simulateUpdate]);

  return {
    isConnected,
    lastUpdate,
    forceUpdate,
  };
};

// Hook for processing status simulation
export const useProcessingSimulation = (
  audiences: Audience[],
  onStatusChange: (audienceId: number, status: Audience["status"]) => void,
) => {
  useEffect(() => {
    const processingAudiences = audiences.filter(
      (a) => a.status === "processing",
    );

    processingAudiences.forEach((audience) => {
      // Simulate processing completion after 30-60 seconds
      const completionTime = 30000 + Math.random() * 30000;

      setTimeout(() => {
        onStatusChange(audience.id, "active");
      }, completionTime);
    });
  }, [audiences, onStatusChange]);
};
