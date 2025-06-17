import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Users,
  Clock,
  Activity,
  Menu,
  Filter,
  Download,
  MoreVertical,
  Eye,
  Edit2,
  Trash2,
  Plus,
  BarChart3,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Audience } from "@/hooks/useAudiences";

interface ResponsiveDashboardProps {
  audiences: Audience[];
  stats: {
    totalReach: number;
    processing: number;
    active: number;
    total: number;
  };
  onDeleteAudience: (id: number) => void;
  onCreateAudience: () => void;
  onCompareAudiences: () => void;
}

export const ResponsiveDashboard = ({
  audiences,
  stats,
  onDeleteAudience,
  onCreateAudience,
  onCompareAudiences,
}: ResponsiveDashboardProps) => {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const navigate = useNavigate();

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const filteredAudiences = audiences.filter((audience) => {
    if (selectedFilter === "all") return true;
    return audience.status === selectedFilter;
  });

  // Mobile Card View
  const MobileAudienceCard = ({ audience }: { audience: Audience }) => (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <div
                className={`w-2 h-2 rounded-full ${
                  audience.status === "active"
                    ? "bg-brand-primary"
                    : audience.status === "processing"
                      ? "bg-orange-500"
                      : "bg-red-500"
                }`}
              />
              <h3 className="font-medium text-gray-900 text-sm leading-tight">
                {audience.name}
              </h3>
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-600">
              <span>{audience.source}</span>
              <span>{audience.size}</span>
              <span>{audience.created}</span>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => navigate(`/audience/${audience.id}`)}
              >
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              <div className="px-3 py-2 text-sm font-medium text-gray-700 border-b border-t">
                <div className="flex items-center">
                  <Plus className="mr-2 h-4 w-4" />
                  Add to Campaign
                </div>
              </div>
              <DropdownMenuItem>Summer Promotion 2025</DropdownMenuItem>
              <DropdownMenuItem>Holiday Season Campaign</DropdownMenuItem>
              <DropdownMenuItem>Back to School 2025</DropdownMenuItem>
              <DropdownMenuItem>New Product Launch</DropdownMenuItem>
              <DropdownMenuItem>Seasonal Clearance</DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600 border-t"
                onClick={() => onDeleteAudience(audience.id)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {audience.status === "processing" && (
          <Badge variant="secondary" className="text-xs">
            Processing
          </Badge>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F8FBF7" }}>
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">My Audiences</h1>
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Filter className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Filter Audiences</SheetTitle>
                  <SheetDescription>
                    Filter audiences by their current status
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  {[
                    { value: "all", label: "All Audiences" },
                    { value: "active", label: "Active" },
                    { value: "processing", label: "Processing" },
                  ].map((filter) => (
                    <Button
                      key={filter.value}
                      variant={
                        selectedFilter === filter.value ? "default" : "outline"
                      }
                      className="w-full justify-start"
                      onClick={() => setSelectedFilter(filter.value)}
                    >
                      {filter.label}
                    </Button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onCompareAudiences}
                className="flex items-center gap-1"
              >
                <BarChart3 className="h-4 w-4" />
                Compare
              </Button>
              <Button
                size="sm"
                onClick={onCreateAudience}
                className="bg-brand-primary hover:bg-brand-600 text-white"
              >
                <Plus className="h-4 w-4 mr-1" />
                Create
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4 lg:py-8">
        {/* Desktop Header */}
        <div className="hidden lg:flex justify-between items-center mb-8">
          <div>
            <h1 className="mb-2">My Audiences</h1>
            <p className="text-gray-600 text-sm">
              Manage your lookalike audiences and track their performance
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onCompareAudiences}
              className="flex items-center gap-2"
            >
              <BarChart3 className="w-4 h-4" />
              Compare Audiences
            </Button>
            <Button
              className="bg-brand-primary hover:bg-brand-600 text-white px-6 py-2 rounded-lg font-medium"
              onClick={onCreateAudience}
            >
              Create New Audience
            </Button>
          </div>
        </div>

        {/* Stats Grid - Responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-6 mb-6 lg:mb-8">
          <Card className="border border-gray-200 shadow-sm">
            <CardContent className="p-3 lg:p-6">
              <div className="flex items-center gap-2 lg:gap-3 mb-2">
                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                  <Users className="w-4 h-4 lg:w-5 lg:h-5 text-blue-600" />
                </div>
                <span className="text-gray-600 font-medium text-xs lg:text-sm">
                  <b>Total Reach</b>
                </span>
              </div>
              <div className="text-lg lg:text-2xl font-bold text-gray-900">
                {formatNumber(stats.totalReach)}
              </div>
              <div className="text-xs lg:text-sm text-gray-500">
                People across all audiences
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 shadow-sm">
            <CardContent className="p-3 lg:p-6">
              <div className="flex items-center gap-2 lg:gap-3 mb-2">
                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg bg-orange-50 flex items-center justify-center">
                  <Clock className="w-4 h-4 lg:w-5 lg:h-5 text-orange-600" />
                </div>
                <span className="text-gray-600 font-medium text-xs lg:text-sm">
                  <b>Processing</b>
                </span>
              </div>
              <div className="text-lg lg:text-2xl font-bold text-gray-900">
                {stats.processing}
              </div>
              <div className="text-xs lg:text-sm text-gray-500">
                Being created
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 shadow-sm">
            <CardContent className="p-3 lg:p-6">
              <div className="flex items-center gap-2 lg:gap-3 mb-2">
                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg bg-green-50 flex items-center justify-center">
                  <Activity className="w-4 h-4 lg:w-5 lg:h-5 text-green-600" />
                </div>
                <span className="text-gray-600 font-medium text-xs lg:text-sm">
                  Active
                </span>
              </div>
              <div className="text-lg lg:text-2xl font-bold text-gray-900">
                {stats.active}
              </div>
              <div className="text-xs lg:text-sm text-gray-500">
                Ready to use
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters - Desktop */}
        <div className="hidden lg:flex justify-between items-center mb-6">
          <div className="flex gap-2">
            {[
              { value: "all", label: "All" },
              { value: "active", label: "Active" },
              { value: "processing", label: "Processing" },
            ].map((filter) => (
              <Button
                key={filter.value}
                variant={
                  selectedFilter === filter.value ? "default" : "outline"
                }
                size="sm"
                onClick={() => setSelectedFilter(filter.value)}
                className={
                  selectedFilter === filter.value
                    ? "bg-brand-primary hover:bg-brand-600"
                    : ""
                }
              >
                {filter.label}
              </Button>
            ))}
          </div>
          <div className="text-sm text-gray-600">
            {filteredAudiences.length} of {stats.total} audiences
          </div>
        </div>

        {/* Audience List - Mobile Cards */}
        <div className="lg:hidden">
          {filteredAudiences.map((audience) => (
            <MobileAudienceCard key={audience.id} audience={audience} />
          ))}
        </div>

        {/* Desktop Table - Hidden on mobile */}
        <div className="hidden lg:block">
          <Card className="border border-gray-200 shadow-sm">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="text-left p-4 font-medium text-gray-700">
                        Audience Name
                      </th>
                      <th className="text-left p-4 font-medium text-gray-700">
                        Source
                      </th>
                      <th className="text-left p-4 font-medium text-gray-700">
                        Size
                      </th>
                      <th className="text-left p-4 font-medium text-gray-700">
                        Created
                      </th>
                      <th className="text-left p-4 font-medium text-gray-700">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAudiences.map((audience) => (
                      <tr
                        key={audience.id}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-2 h-2 rounded-full ${
                                audience.status === "active"
                                  ? "bg-brand-primary"
                                  : audience.status === "processing"
                                    ? "bg-orange-500"
                                    : "bg-red-500"
                              }`}
                            />
                            <span className="font-medium text-gray-900">
                              {audience.name}
                            </span>
                            {audience.status === "processing" && (
                              <Badge variant="secondary" className="text-xs">
                                Processing
                              </Badge>
                            )}
                          </div>
                        </td>
                        <td className="p-4 text-gray-600">{audience.source}</td>
                        <td className="p-4 text-gray-600">{audience.size}</td>
                        <td className="p-4 text-gray-600">
                          {audience.created}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="p-1 h-8 w-8 text-gray-500 hover:text-gray-700"
                              title="View details"
                              onClick={() =>
                                navigate(`/audience/${audience.id}`)
                              }
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="p-1 h-8 w-8 text-gray-500 hover:text-gray-700"
                                  title="Add to Campaign"
                                >
                                  <Plus className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <div className="px-3 py-2 text-sm font-medium text-gray-700 border-b">
                                  Add to Campaign
                                </div>
                                <DropdownMenuItem>
                                  Summer Promotion 2025
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  Holiday Season Campaign
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  Back to School 2025
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  New Product Launch
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  Seasonal Clearance
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="p-1 h-8 w-8 text-gray-500 hover:text-red-600"
                              title="Delete audience"
                              onClick={() => onDeleteAudience(audience.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Empty State */}
        {filteredAudiences.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <Users className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No audiences found
            </h3>
            <p className="text-gray-600 mb-6">
              {selectedFilter === "all"
                ? "Create your first audience to get started"
                : `No ${selectedFilter} audiences found`}
            </p>
            <Button
              onClick={onCreateAudience}
              className="bg-brand-primary hover:bg-brand-600 text-white"
            >
              Create New Audience
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
