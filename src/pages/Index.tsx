import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAudienceContext } from "@/contexts/AudienceContext";
import { DashboardSkeleton, EmptyState } from "@/components/LoadingStates";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { ResponsiveDashboard } from "@/components/ResponsiveDashboard";
import { AudienceComparison } from "@/components/AudienceComparison";
import { NotificationSystem } from "@/components/NotificationSystem";
import { useToast } from "@/hooks/use-toast";
import { exportAudienceData } from "@/utils/exportUtils";
import { RefreshCw, BarChart3 } from "lucide-react";

const Index = () => {
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    audienceId?: number;
    audienceName?: string;
  }>({ open: false });
  const [showComparison, setShowComparison] = useState(false);
  const navigate = useNavigate();
  const {
    audiences,
    loading,
    error,
    stats,
    deleteAudience,
    refetch,
    isConnected,
    lastUpdate,
  } = useAudienceContext();
  const { toast } = useToast();

  const handleDelete = async (id: number) => {
    try {
      await deleteAudience(id);
      toast({
        title: "Audience deleted",
        description: "The audience has been successfully deleted.",
      });
      setDeleteDialog({ open: false });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete audience. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleExport = async (format: "csv" | "pdf") => {
    try {
      await exportAudienceData(audiences, format, true);
      toast({
        title: "Export successful",
        description: `Your ${format.toUpperCase()} file has been downloaded.`,
      });
    } catch (error) {
      toast({
        title: "Export failed",
        description: "Failed to export data. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return (
      <div
        className="min-h-screen font-sans"
        style={{ backgroundColor: "#F8FBF7" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-8">
          <EmptyState
            title="Error loading audiences"
            description={error}
            action={
              <Button
                onClick={refetch}
                className="bg-brand-primary hover:bg-brand-600 text-white"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            }
          />
        </div>
      </div>
    );
  }

  if (showComparison) {
    return (
      <AudienceComparison
        audiences={audiences}
        onClose={() => setShowComparison(false)}
      />
    );
  }

  return (
    <>
      <ResponsiveDashboard
        audiences={audiences}
        stats={stats}
        onDeleteAudience={(id) =>
          setDeleteDialog({
            open: true,
            audienceId: id,
            audienceName: audiences.find((a) => a.id === id)?.name,
          })
        }
        onCreateAudience={() => navigate("/create-audience")}
        onCompareAudiences={() => setShowComparison(true)}
      />

      <ConfirmDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog({ open })}
        title="Delete Audience"
        description={`Are you sure you want to delete "${deleteDialog.audienceName}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
        onConfirm={() =>
          deleteDialog.audienceId && handleDelete(deleteDialog.audienceId)
        }
      />

      <NotificationSystem
        isConnected={isConnected}
        lastUpdate={lastUpdate}
        processingCount={stats.processing}
      />
    </>
  );
};

export default Index;
