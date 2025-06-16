import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  Users,
  Clock,
  Activity,
  ChevronDown,
  Eye,
  Edit2,
  Trash2,
  RefreshCw,
} from "lucide-react";
import { useAudiences } from "@/hooks/useAudiences";
import { DashboardSkeleton, EmptyState } from "@/components/LoadingStates";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    audienceId?: number;
    audienceName?: string;
  }>({ open: false });
  const navigate = useNavigate();
  const { audiences, loading, error, stats, deleteAudience, refetch } =
    useAudiences();
  const { toast } = useToast();

  const filteredAudiences = audiences.filter((audience) =>
    audience.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

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

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
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

  return (
    <div
      className="min-h-screen font-sans"
      style={{ backgroundColor: "#F8FBF7" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              My Audiences
            </h1>
            <p className="text-gray-600 text-sm">
              Manage your lookalike audiences and track their performance
            </p>
          </div>
          <Button
            className="bg-brand-primary hover:bg-brand-600 text-white px-6 py-2 rounded-lg font-medium"
            onClick={() => navigate("/create-audience")}
          >
            Create New Audience
          </Button>
        </div>

        {/* Audience Overview */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Audience Overview
          </h2>
          <p className="text-gray-600 text-sm mb-6">
            You have {stats.total} audience{stats.total !== 1 ? "s" : ""} in
            total
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border border-gray-200 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-gray-600 font-medium">Total Reach</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {formatNumber(stats.totalReach)}
                </div>
                <div className="text-sm text-gray-500">
                  People across all audiences
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-orange-600" />
                  </div>
                  <span className="text-gray-600 font-medium">Processing</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {stats.processing}
                </div>
                <div className="text-sm text-gray-500">
                  Audiences being created
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                    <Activity className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="text-gray-600 font-medium">Active</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {stats.active}
                </div>
                <div className="text-sm text-gray-500">
                  Ready to use audiences
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Search and Table */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search audiences..."
                  className="pl-10 w-80 border-gray-300"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>All Statuses</span>
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-200">
                <TableHead className="text-gray-700 font-medium">
                  Audience Name
                </TableHead>
                <TableHead className="text-gray-700 font-medium">
                  Source
                </TableHead>
                <TableHead className="text-gray-700 font-medium">
                  Size
                </TableHead>
                <TableHead className="text-gray-700 font-medium">
                  Created
                </TableHead>
                <TableHead className="text-gray-700 font-medium">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAudiences.map((audience) => (
                <TableRow
                  key={audience.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          audience.status === "active"
                            ? "bg-brand-primary"
                            : audience.status === "processing"
                              ? "bg-orange-500"
                              : "bg-red-500"
                        }`}
                      ></div>
                      <span className="font-medium text-gray-900">
                        {audience.name}
                      </span>
                      {audience.status === "processing" && (
                        <Badge variant="secondary" className="text-xs">
                          Processing
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {audience.source}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {audience.size}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {audience.created}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-1 h-8 w-8 text-gray-500 hover:text-gray-700"
                        title="View details"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-1 h-8 w-8 text-gray-500 hover:text-gray-700"
                        title="Edit audience"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-1 h-8 w-8 text-gray-500 hover:text-red-600"
                        title="Delete audience"
                        onClick={() =>
                          setDeleteDialog({
                            open: true,
                            audienceId: audience.id,
                            audienceName: audience.name,
                          })
                        }
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredAudiences.length === 0 && searchTerm && (
          <EmptyState
            title="No audiences found"
            description={`No audiences match "${searchTerm}". Try adjusting your search.`}
            action={
              <Button variant="outline" onClick={() => setSearchTerm("")}>
                Clear search
              </Button>
            }
          />
        )}
      </div>

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
    </div>
  );
};

export default Index;
