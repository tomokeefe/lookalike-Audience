import { useState, useEffect, useCallback } from "react";
import {
  useRealTimeUpdates,
  useProcessingSimulation,
} from "./useRealTimeUpdates";

export interface Audience {
  id: number;
  name: string;
  source: string;
  size: string;
  created: string;
  status: "active" | "processing" | "error";
  reach?: number;
}

// Simulated API data
const mockAudiences: Audience[] = [
  {
    id: 1,
    name: "test",
    source: "Customer List",
    size: "5%",
    created: "Jun 16, 2025",
    status: "active",
    reach: 2500000,
  },
  {
    id: 2,
    name: "This is test",
    source: "Customer List",
    size: "5%",
    created: "Jun 16, 2025",
    status: "active",
    reach: 1800000,
  },
  {
    id: 3,
    name: "Loyal Customers Lookalike",
    source: "Customer List",
    size: "7%",
    created: "May 25, 2025",
    status: "active",
    reach: 3200000,
  },
  {
    id: 4,
    name: "High Value Customers Lookalike",
    source: "Customer List",
    size: "5%",
    created: "May 20, 2025",
    status: "processing",
    reach: 0,
  },
  {
    id: 5,
    name: "New Customer Lookalike",
    source: "Customer List",
    size: "3%",
    created: "May 15, 2025",
    status: "processing",
    reach: 0,
  },
];

export const useAudiences = () => {
  const [audiences, setAudiences] = useState<Audience[]>(mockAudiences);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  // Simple initialization - no complex loading
  useEffect(() => {
    // Ensure data is available immediately
    if (audiences.length === 0) {
      setAudiences(mockAudiences);
    }
  }, []);

  const deleteAudience = async (id: number) => {
    setAudiences((prev) => prev.filter((audience) => audience.id !== id));
  };

  const createAudience = async (audienceData: {
    name: string;
    source: string;
    uploadedFile: File | null;
  }) => {
    const newAudience: Audience = {
      id: Date.now(), // Simple ID generation
      name: audienceData.name,
      source: audienceData.source,
      size: "5%", // Default size
      created: new Date().toLocaleDateString(),
      status: "processing",
      reach: 0,
    };

    setAudiences((prev) => [newAudience, ...prev]);

    // Simulate processing completion after 3-5 seconds
    setTimeout(
      () => {
        updateAudienceStatus(newAudience.id, "active");
        updateAudience({
          id: newAudience.id,
          reach: Math.floor(Math.random() * 2000000) + 1000000, // Random reach between 1M-3M
        });
      },
      3000 + Math.random() * 2000,
    );

    return newAudience;
  };

  const updateAudienceStatus = useCallback(
    async (id: number, status: Audience["status"]) => {
      setAudiences((prev) =>
        prev.map((audience) =>
          audience.id === id ? { ...audience, status } : audience,
        ),
      );
    },
    [],
  );

  const updateAudience = useCallback(
    (updates: Partial<Audience> & { id: number }) => {
      setAudiences((prev) =>
        prev.map((audience) =>
          audience.id === updates.id ? { ...audience, ...updates } : audience,
        ),
      );
    },
    [],
  );

  // Simple real-time simulation without complex hooks
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly update audience reach
      if (Math.random() > 0.8) {
        const randomAudience =
          audiences[Math.floor(Math.random() * audiences.length)];
        if (randomAudience) {
          updateAudience({
            id: randomAudience.id,
            reach:
              (randomAudience.reach || 1000000) +
              Math.floor(Math.random() * 5000),
          });
          setLastUpdate(new Date());
        }
      }
    }, 15000); // Update every 15 seconds

    return () => clearInterval(interval);
  }, [audiences, updateAudience]);

  // Calculate stats
  const stats = {
    totalReach: audiences.reduce(
      (sum, audience) => sum + (audience.reach || 0),
      0,
    ),
    processing: audiences.filter((a) => a.status === "processing").length,
    active: audiences.filter((a) => a.status === "active").length,
    total: audiences.length,
  };

  const forceUpdate = useCallback(() => {
    const randomAudience =
      audiences[Math.floor(Math.random() * audiences.length)];
    if (randomAudience) {
      updateAudience({
        id: randomAudience.id,
        reach:
          (randomAudience.reach || 1000000) + Math.floor(Math.random() * 10000),
      });
      setLastUpdate(new Date());
    }
  }, [audiences, updateAudience]);

  return {
    audiences,
    loading,
    error,
    stats,
    deleteAudience,
    createAudience,
    updateAudienceStatus,
    updateAudience,
    isConnected,
    lastUpdate,
    forceUpdate,
    refetch: () => {
      setAudiences([...mockAudiences]);
    },
  };
};
