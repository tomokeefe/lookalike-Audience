import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Target,
  Activity,
  Calendar,
  Download,
  ArrowLeft,
  FileText,
  FileSpreadsheet,
} from "lucide-react";
import { Audience } from "@/hooks/useAudiences";
import { downloadCSV, downloadPDF } from "@/utils/exportUtils";
import { useToast } from "@/hooks/use-toast";

interface ComparisonData {
  metric: string;
  audience1: number;
  audience2: number;
  difference: number;
  trend: "up" | "down" | "stable";
}

const mockComparisonData: ComparisonData[] = [
  {
    metric: "Total Reach",
    audience1: 2100000,
    audience2: 1850000,
    difference: 13.5,
    trend: "up",
  },
  {
    metric: "Match Rate",
    audience1: 87.3,
    audience2: 82.1,
    difference: 6.3,
    trend: "up",
  },
  {
    metric: "Engagement Rate",
    audience1: 6.8,
    audience2: 7.2,
    difference: -5.6,
    trend: "down",
  },
  {
    metric: "Conversion Rate",
    audience1: 3.4,
    audience2: 2.9,
    difference: 17.2,
    trend: "up",
  },
];

const performanceComparison = [
  { date: "Week 1", audience1: 85, audience2: 78 },
  { date: "Week 2", audience1: 88, audience2: 82 },
  { date: "Week 3", audience1: 91, audience2: 79 },
  { date: "Week 4", audience1: 87, audience2: 84 },
];

interface AudienceComparisonProps {
  audiences: Audience[];
  onClose: () => void;
}

export const AudienceComparison = ({
  audiences,
  onClose,
}: AudienceComparisonProps) => {
  const [selectedAudience1, setSelectedAudience1] = useState<string>("");
  const [selectedAudience2, setSelectedAudience2] = useState<string>("");
  const { toast } = useToast();

  const audience1 = audiences.find(
    (a) => a.id.toString() === selectedAudience1,
  );
  const audience2 = audiences.find(
    (a) => a.id.toString() === selectedAudience2,
  );

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatPercentage = (num: number) => {
    const sign = num > 0 ? "+" : "";
    return `${sign}${num.toFixed(1)}%`;
  };

  const generateComparisonCSV = () => {
    if (!audience1 || !audience2) return "";

    const headers = [
      "Metric",
      `${audience1.name}`,
      `${audience2.name}`,
      "Difference (%)",
      "Trend",
    ];

    const csvData = [
      headers.join(","),
      ...mockComparisonData.map((data) =>
        [
          `"${data.metric}"`,
          data.metric.includes("Rate") ||
          data.metric.includes("Engagement") ||
          data.metric.includes("Conversion")
            ? `${data.audience1}%`
            : formatNumber(data.audience1),
          data.metric.includes("Rate") ||
          data.metric.includes("Engagement") ||
          data.metric.includes("Conversion")
            ? `${data.audience2}%`
            : formatNumber(data.audience2),
          formatPercentage(data.difference),
          data.trend,
        ].join(","),
      ),
    ].join("\n");

    return csvData;
  };

  const generateComparisonReport = () => {
    if (!audience1 || !audience2) return "";

    const reportDate = new Date().toLocaleDateString();

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Audience Comparison Report</title>
        <style>
          body {
            font-family: 'Open Sans', Arial, sans-serif;
            margin: 40px;
            color: #374151;
            line-height: 1.6;
          }
          .header {
            border-bottom: 3px solid #00997B;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          .title {
            font-size: 28px;
            font-weight: bold;
            color: #00997B;
            margin: 0;
          }
          .subtitle {
            color: #6B7280;
            margin: 5px 0;
          }
          .comparison-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            margin: 30px 0;
          }
          .audience-card {
            background: #F9FAFB;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #00997B;
          }
          .audience-title {
            font-size: 18px;
            font-weight: 600;
            color: #111827;
            margin-bottom: 15px;
          }
          .metric-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
          }
          .table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
          }
          .table th, .table td {
            border: 1px solid #E5E7EB;
            padding: 12px;
            text-align: left;
          }
          .table th {
            background: #F9FAFB;
            font-weight: 600;
          }
          .section-title {
            font-size: 20px;
            font-weight: 600;
            color: #111827;
            margin: 30px 0 15px 0;
          }
          .positive { color: #059669; }
          .negative { color: #DC2626; }
          .neutral { color: #6B7280; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1 class="title">Audience Comparison Report</h1>
          <div class="subtitle">Comparing: ${audience1.name} vs ${audience2.name}</div>
          <div class="subtitle">Generated on ${reportDate}</div>
        </div>

        <div class="comparison-grid">
          <div class="audience-card">
            <div class="audience-title">${audience1.name}</div>
            <div class="metric-row">
              <span>Source:</span>
              <span>${audience1.source}</span>
            </div>
            <div class="metric-row">
              <span>Size:</span>
              <span>${audience1.size}</span>
            </div>
            <div class="metric-row">
              <span>Status:</span>
              <span>${audience1.status}</span>
            </div>
            <div class="metric-row">
              <span>Created:</span>
              <span>${audience1.created}</span>
            </div>
          </div>

          <div class="audience-card">
            <div class="audience-title">${audience2.name}</div>
            <div class="metric-row">
              <span>Source:</span>
              <span>${audience2.source}</span>
            </div>
            <div class="metric-row">
              <span>Size:</span>
              <span>${audience2.size}</span>
            </div>
            <div class="metric-row">
              <span>Status:</span>
              <span>${audience2.status}</span>
            </div>
            <div class="metric-row">
              <span>Created:</span>
              <span>${audience2.created}</span>
            </div>
          </div>
        </div>

        <h2 class="section-title">Performance Comparison</h2>
        <table class="table">
          <thead>
            <tr>
              <th>Metric</th>
              <th>${audience1.name}</th>
              <th>${audience2.name}</th>
              <th>Difference</th>
              <th>Winner</th>
            </tr>
          </thead>
          <tbody>
            ${mockComparisonData
              .map(
                (data) => `
              <tr>
                <td>${data.metric}</td>
                <td>${data.metric.includes("Rate") || data.metric.includes("Engagement") || data.metric.includes("Conversion") ? `${data.audience1}%` : formatNumber(data.audience1)}</td>
                <td>${data.metric.includes("Rate") || data.metric.includes("Engagement") || data.metric.includes("Conversion") ? `${data.audience2}%` : formatNumber(data.audience2)}</td>
                <td class="${data.trend === "up" ? "positive" : data.trend === "down" ? "negative" : "neutral"}">${formatPercentage(data.difference)}</td>
                <td>${data.difference > 0 ? audience1.name : data.difference < 0 ? audience2.name : "Tie"}</td>
              </tr>
            `,
              )
              .join("")}
          </tbody>
        </table>

        <h2 class="section-title">Performance Timeline</h2>
        <table class="table">
          <thead>
            <tr>
              <th>Period</th>
              <th>${audience1.name}</th>
              <th>${audience2.name}</th>
            </tr>
          </thead>
          <tbody>
            ${performanceComparison
              .map(
                (data) => `
              <tr>
                <td>${data.date}</td>
                <td>${data.audience1}%</td>
                <td>${data.audience2}%</td>
              </tr>
            `,
              )
              .join("")}
          </tbody>
        </table>

        <div style="margin-top: 50px; padding-top: 20px; border-top: 1px solid #E5E7EB; font-size: 12px; color: #6B7280;">
          <p>This comparison report was generated automatically by the Audience Management System.</p>
          <p>For questions or support, please contact your system administrator.</p>
        </div>
      </body>
      </html>
    `;
  };

  const handleExportCSV = () => {
    if (!audience1 || !audience2) {
      toast({
        title: "Cannot export",
        description: "Please select two audiences to compare before exporting.",
        variant: "destructive",
      });
      return;
    }

    const csvContent = generateComparisonCSV();
    const timestamp = new Date().toISOString().split("T")[0];
    downloadCSV(csvContent, `audience-comparison-${timestamp}.csv`);

    toast({
      title: "Export successful",
      description: "Comparison data has been downloaded as CSV.",
    });
  };

  const handleExportPDF = async () => {
    if (!audience1 || !audience2) {
      toast({
        title: "Cannot export",
        description: "Please select two audiences to compare before exporting.",
        variant: "destructive",
      });
      return;
    }

    const htmlContent = generateComparisonReport();
    const timestamp = new Date().toISOString().split("T")[0];
    await downloadPDF(htmlContent, `audience-comparison-${timestamp}.pdf`);

    toast({
      title: "Export successful",
      description: "Comparison report has been generated as PDF.",
    });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F8FBF7" }}>
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4 lg:py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={onClose}
            size="sm"
            className="flex items-center gap-2 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <div>
            <h1 className="mb-2">Audience Comparison</h1>
            <p className="text-gray-600">
              Compare performance metrics between two audiences
            </p>
          </div>
        </div>

        {/* Audience Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Select First Audience</CardTitle>
            </CardHeader>
            <CardContent>
              <Select
                value={selectedAudience1}
                onValueChange={setSelectedAudience1}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose an audience" />
                </SelectTrigger>
                <SelectContent>
                  {audiences.map((audience) => (
                    <SelectItem
                      key={audience.id}
                      value={audience.id.toString()}
                      disabled={audience.id.toString() === selectedAudience2}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            audience.status === "active"
                              ? "bg-brand-primary"
                              : "bg-orange-500"
                          }`}
                        />
                        {audience.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {audience1 && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge
                      variant={
                        audience1.status === "active" ? "default" : "secondary"
                      }
                      className={
                        audience1.status === "active"
                          ? "bg-brand-primary text-white"
                          : ""
                      }
                    >
                      {audience1.status}
                    </Badge>
                    <span className="text-sm text-gray-600">
                      {audience1.created}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <div>Source: {audience1.source}</div>
                    <div>Size: {audience1.size}</div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Select Second Audience</CardTitle>
            </CardHeader>
            <CardContent>
              <Select
                value={selectedAudience2}
                onValueChange={setSelectedAudience2}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose an audience" />
                </SelectTrigger>
                <SelectContent>
                  {audiences.map((audience) => (
                    <SelectItem
                      key={audience.id}
                      value={audience.id.toString()}
                      disabled={audience.id.toString() === selectedAudience1}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            audience.status === "active"
                              ? "bg-brand-primary"
                              : "bg-orange-500"
                          }`}
                        />
                        {audience.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {audience2 && (
                <div className="mt-4 p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge
                      variant={
                        audience2.status === "active" ? "default" : "secondary"
                      }
                      className={
                        audience2.status === "active"
                          ? "bg-brand-primary text-white"
                          : ""
                      }
                    >
                      {audience2.status}
                    </Badge>
                    <span className="text-sm text-gray-600">
                      {audience2.created}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <div>Source: {audience2.source}</div>
                    <div>Size: {audience2.size}</div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Comparison Results */}
        {audience1 && audience2 && (
          <div className="space-y-8">
            {/* Metrics Comparison */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Key Metrics Comparison</CardTitle>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {mockComparisonData.map((data) => (
                    <div
                      key={data.metric}
                      className="p-4 border border-gray-200 rounded-lg"
                    >
                      <div className="text-sm font-medium text-gray-700 mb-2">
                        {data.metric}
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-blue-600">
                            {audience1.name.slice(0, 15)}...
                          </span>
                          <span className="font-medium">
                            {data.metric.includes("Rate") ||
                            data.metric.includes("Engagement") ||
                            data.metric.includes("Conversion")
                              ? `${data.audience1}%`
                              : formatNumber(data.audience1)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-green-600">
                            {audience2.name.slice(0, 15)}...
                          </span>
                          <span className="font-medium">
                            {data.metric.includes("Rate") ||
                            data.metric.includes("Engagement") ||
                            data.metric.includes("Conversion")
                              ? `${data.audience2}%`
                              : formatNumber(data.audience2)}
                          </span>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center gap-1">
                        {data.trend === "up" ? (
                          <TrendingUp className="w-3 h-3 text-green-600" />
                        ) : data.trend === "down" ? (
                          <TrendingDown className="w-3 h-3 text-red-600" />
                        ) : (
                          <div className="w-3 h-3 bg-gray-400 rounded-full" />
                        )}
                        <span
                          className={`text-xs ${
                            data.trend === "up"
                              ? "text-green-600"
                              : data.trend === "down"
                                ? "text-red-600"
                                : "text-gray-600"
                          }`}
                        >
                          {formatPercentage(data.difference)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Performance Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={performanceComparison}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="date"
                      axisLine={true}
                      tickLine={true}
                      tick={true}
                    />
                    <YAxis axisLine={true} tickLine={true} tick={true} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="audience1"
                      stroke="#3B82F6"
                      strokeWidth={3}
                      name={audience1.name}
                    />
                    <Line
                      type="monotone"
                      dataKey="audience2"
                      stroke="#10B981"
                      strokeWidth={3}
                      name={audience2.name}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Side-by-Side Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-blue-600">
                    {audience1.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-blue-600" />
                        <span className="text-sm">Reach</span>
                      </div>
                      <span className="font-medium">2.1M</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-blue-600" />
                        <span className="text-sm">Match Rate</span>
                      </div>
                      <span className="font-medium">87.3%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-blue-600" />
                        <span className="text-sm">Engagement</span>
                      </div>
                      <span className="font-medium">6.8%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-blue-600" />
                        <span className="text-sm">Last Updated</span>
                      </div>
                      <span className="font-medium">2 hrs ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-green-600">
                    {audience2.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-green-600" />
                        <span className="text-sm">Reach</span>
                      </div>
                      <span className="font-medium">1.85M</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-green-600" />
                        <span className="text-sm">Match Rate</span>
                      </div>
                      <span className="font-medium">82.1%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-green-600" />
                        <span className="text-sm">Engagement</span>
                      </div>
                      <span className="font-medium">7.2%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-green-600" />
                        <span className="text-sm">Last Updated</span>
                      </div>
                      <span className="font-medium">4 hrs ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!audience1 || !audience2 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <Target className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Select Two Audiences to Compare
              </h3>
              <p className="text-gray-600">
                Choose two audiences from the dropdowns above to see detailed
                performance comparisons
              </p>
            </CardContent>
          </Card>
        ) : null}
      </div>
    </div>
  );
};
