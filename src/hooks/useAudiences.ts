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
  const [audiences, setAudiences] = useState<Audience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Simulate API call
  useEffect(() => {
    const fetchAudiences = async () => {
      try {
        setLoading(true);
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setAudiences(mockAudiences);
      } catch (err) {
        setError("Failed to load audiences");
      } finally {
        setLoading(false);
      }
    };

    fetchAudiences();
  }, []);

  const deleteAudience = async (id: number) => {
    setAudiences((prev) => prev.filter((audience) => audience.id !== id));
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

  // Real-time updates
  const { isConnected, lastUpdate, forceUpdate } = useRealTimeUpdates(
    audiences,
    updateAudience,
  );

  // Processing simulation
  useProcessingSimulation(audiences, updateAudienceStatus);

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

  return {
    audiences,
    loading,
    error,
    stats,
    deleteAudience,
    updateAudienceStatus,
    updateAudience,
    isConnected,
    lastUpdate,
    forceUpdate,
    refetch: () => {
      setLoading(true);
      setTimeout(() => {
        setAudiences([...mockAudiences]);
        setLoading(false);
      }, 1000);
    },
  };
};
