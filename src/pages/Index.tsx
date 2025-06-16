import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
} from "lucide-react";

const audienceData = [
  {
    id: 1,
    name: "test",
    source: "Customer List",
    size: "5%",
    created: "Jun 16, 2025",
    status: "active",
  },
  {
    id: 2,
    name: "This is test",
    source: "Customer List",
    size: "5%",
    created: "Jun 16, 2025",
    status: "active",
  },
  {
    id: 3,
    name: "Loyal Customers Lookalike",
    source: "Customer List",
    size: "7%",
    created: "May 25, 2025",
    status: "active",
  },
  {
    id: 4,
    name: "High Value Customers Lookalike (click to view analytics)",
    source: "Customer List",
    size: "5%",
    created: "May 20, 2025",
    status: "processing",
  },
  {
    id: 5,
    name: "New Customer Lookalike (click to view analytics)",
    source: "Customer List",
    size: "3%",
    created: "May 15, 2025",
    status: "processing",
  },
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredAudiences = audienceData.filter((audience) =>
    audience.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-white font-sans">
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
            You have 5 audiences in total
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
                  14,485,110
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
                <div className="text-2xl font-bold text-gray-900">3</div>
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
                <div className="text-2xl font-bold text-gray-900">2</div>
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
                  className="border-b border-gray-100"
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-brand-primary"></div>
                      <span className="font-medium text-gray-900">
                        {audience.name}
                      </span>
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
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-1 h-8 w-8 text-gray-500 hover:text-gray-700"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-1 h-8 w-8 text-gray-500 hover:text-red-600"
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
      </div>
    </div>
  );
};

export default Index;
