import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Wifi,
  WifiOff,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
} from "lucide-react";

interface NotificationSystemProps {
  isConnected: boolean;
  lastUpdate: Date | null;
  processingCount: number;
  onlineUsers?: number;
}

export const NotificationSystem = ({
  isConnected,
  lastUpdate,
  processingCount,
  onlineUsers = 1,
}: NotificationSystemProps) => {
  const { toast } = useToast();

  useEffect(() => {
    if (lastUpdate) {
      toast({
        title: "Audience updated",
        description: "Real-time data has been refreshed",
        duration: 3000,
      });
    }
  }, [lastUpdate, toast]);

  return (
    <div className="fixed bottom-4 left-4 z-50 space-y-2">
      {/* Connection Status */}
      <Card className="w-64 shadow-lg">
        <CardContent className="p-3">
          <div className="flex items-center gap-2">
            {isConnected ? (
              <>
                <Wifi className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-600 font-medium">
                  Live updates active
                </span>
              </>
            ) : (
              <>
                <WifiOff className="w-4 h-4 text-red-600" />
                <span className="text-sm text-red-600 font-medium">
                  Connection lost
                </span>
              </>
            )}
          </div>
          {lastUpdate && (
            <div className="text-xs text-gray-500 mt-1">
              Last update: {lastUpdate.toLocaleTimeString()}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Processing Status */}
      {processingCount > 0 && (
        <Card className="w-64 shadow-lg border-orange-200">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-600" />
              <span className="text-sm text-orange-600 font-medium">
                {processingCount} audience{processingCount > 1 ? "s" : ""}{" "}
                processing
              </span>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Estimated completion: 2-5 minutes
            </div>
          </CardContent>
        </Card>
      )}

      {/* Online Users */}
      <Card className="w-64 shadow-lg">
        <CardContent className="p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm text-gray-600">
                {onlineUsers} user{onlineUsers > 1 ? "s" : ""} online
              </span>
            </div>
            <Badge variant="secondary" className="text-xs">
              Live
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Real-time metrics widget
export const LiveMetricsWidget = ({
  totalReach,
  growthRate = 0,
}: {
  totalReach: number;
  growthRate?: number;
}) => {
  return (
    <Card className="border-green-200 bg-green-50/50">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-600 mb-1">Total Reach (Live)</div>
            <div className="text-2xl font-bold text-gray-900">
              {totalReach.toLocaleString()}
            </div>
          </div>
          <div className="flex items-center gap-1 text-green-600">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">+{growthRate}%</span>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs text-gray-500">Updated live</span>
        </div>
      </CardContent>
    </Card>
  );
};

// Processing status indicator
export const ProcessingIndicator = ({
  audienceName,
  progress = 0,
  estimatedTime = "2-5 minutes",
}: {
  audienceName: string;
  progress?: number;
  estimatedTime?: string;
}) => {
  return (
    <Card className="border-orange-200 bg-orange-50/50">
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-2">
          <Clock className="w-5 h-5 text-orange-600" />
          <div className="flex-1">
            <div className="font-medium text-gray-900">{audienceName}</div>
            <div className="text-sm text-gray-600">Processing...</div>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
          <div
            className="bg-orange-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-xs text-gray-500">
          Estimated time remaining: {estimatedTime}
        </div>
      </CardContent>
    </Card>
  );
};
