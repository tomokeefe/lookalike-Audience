import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  ArrowLeft,
  Download,
  Edit2,
  Users,
  TrendingUp,
  Target,
  Calendar,
  Globe,
  Activity,
} from "lucide-react";
import { useAudiences } from "@/hooks/useAudiences";
import { DashboardSkeleton } from "@/components/LoadingStates";

const performanceData = [
  { date: "Jan 1", reach: 1200000, engagement: 85000, conversions: 2400 },
  { date: "Jan 8", reach: 1350000, engagement: 92000, conversions: 2800 },
  { date: "Jan 15", reach: 1500000, engagement: 105000, conversions: 3200 },
  { date: "Jan 22", reach: 1680000, engagement: 118000, conversions: 3600 },
  { date: "Jan 29", reach: 1850000, engagement: 125000, conversions: 4100 },
  { date: "Feb 5", reach: 2100000, engagement: 142000, conversions: 4800 },
];

const demographicsData = [
  { name: "18-24", value: 25, color: "#00997B" },
  { name: "25-34", value: 35, color: "#2DD4BF" },
  { name: "35-44", value: 22, color: "#5EEAD4" },
  { name: "45-54", value: 12, color: "#99F6E4" },
  { name: "55+", value: 6, color: "#CCFBF1" },
];

const geographyData = [
  { country: "United States", users: 45, color: "#00997B" },
  { country: "Canada", users: 18, color: "#2DD4BF" },
  { country: "United Kingdom", users: 15, color: "#5EEAD4" },
  { country: "Australia", users: 12, color: "#99F6E4" },
  { country: "Others", users: 10, color: "#CCFBF1" },
];

const AudienceDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { audiences, loading } = useAudiences();
  const [audience, setAudience] = useState<any>(null);

  useEffect(() => {
    if (audiences && id) {
      const foundAudience = audiences.find((a) => a.id === parseInt(id));
      setAudience(foundAudience);
    }
  }, [audiences, id]);

  if (loading) {
    return <DashboardSkeleton />;
  }

  if (!audience) {
    return (
      <div
        className="min-h-screen font-sans"
        style={{ backgroundColor: "#F8FBF7" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center py-12">
            <h2 className="mb-2">Audience not found</h2>
            <p className="text-gray-600 mb-6">
              The audience you're looking for doesn't exist.
            </p>
            <Button
              onClick={() => navigate("/")}
              className="bg-brand-primary hover:bg-brand-600 text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
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
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="p-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1>{audience.name}</h1>
                <Badge
                  variant={
                    audience.status === "active" ? "default" : "secondary"
                  }
                  className={
                    audience.status === "active"
                      ? "bg-brand-primary text-white"
                      : "bg-orange-100 text-orange-800"
                  }
                >
                  {audience.status}
                </Badge>
              </div>
              <p className="text-gray-600">
                Created on {audience.created} • {audience.source}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export Data
            </Button>
            <Button className="bg-brand-primary hover:bg-brand-600 text-white flex items-center gap-2">
              <Edit2 className="w-4 h-4" />
              Edit Audience
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-gray-600 font-medium">Total Reach</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {audience.reach ? audience.reach.toLocaleString() : "2,100,000"}
              </div>
              <div className="text-sm text-green-600 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +12.5% from last week
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                  <Target className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-gray-600 font-medium">Match Rate</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">87.3%</div>
              <div className="text-sm text-green-600 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +2.1% from last week
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-purple-600" />
                </div>
                <span className="text-gray-600 font-medium">Engagement</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">6.8%</div>
              <div className="text-sm text-green-600 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +0.3% from last week
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-orange-600" />
                </div>
                <span className="text-gray-600 font-medium">Last Updated</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">2 hrs</div>
              <div className="text-sm text-gray-500">ago</div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Tabs */}
        <Tabs defaultValue="performance" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="demographics">Demographics</TabsTrigger>
            <TabsTrigger value="geography">Geography</TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Audience Performance Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="reach"
                      stroke="#00997B"
                      strokeWidth={2}
                      name="Reach"
                    />
                    <Line
                      type="monotone"
                      dataKey="engagement"
                      stroke="#2DD4BF"
                      strokeWidth={2}
                      name="Engagement"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Conversion Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="conversions" fill="#00997B" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="demographics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Age Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={demographicsData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {demographicsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Demographic Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {demographicsData.map((item) => (
                      <div
                        key={item.name}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="font-medium">{item.name}</span>
                        </div>
                        <span className="text-gray-600">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="geography" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Geographic Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {geographyData.map((item) => (
                    <div
                      key={item.country}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="font-medium">{item.country}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full"
                            style={{
                              backgroundColor: item.color,
                              width: `${item.users}%`,
                            }}
                          />
                        </div>
                        <span className="text-gray-600 text-sm w-8">
                          {item.users}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AudienceDetails;
