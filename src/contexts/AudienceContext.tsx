import React, { createContext, useContext } from "react";
import { useAudiences } from "@/hooks/useAudiences";

interface AudienceContextType {
  audiences: any[];
  loading: boolean;
  error: string | null;
  stats: any;
  deleteAudience: (id: number) => Promise<void>;
  createAudience: (data: any) => Promise<any>;
  updateAudienceStatus: (id: number, status: any) => Promise<void>;
  updateAudience: (updates: any) => void;
  isConnected: boolean;
  lastUpdate: Date | null;
  forceUpdate: () => void;
  refetch: () => void;
}

const AudienceContext = createContext<AudienceContextType | undefined>(
  undefined,
);

export const AudienceProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const audienceData = useAudiences();

  return (
    <AudienceContext.Provider value={audienceData}>
      {children}
    </AudienceContext.Provider>
  );
};

export const useAudienceContext = () => {
  const context = useContext(AudienceContext);
  if (context === undefined) {
    throw new Error(
      "useAudienceContext must be used within an AudienceProvider",
    );
  }
  return context;
};
