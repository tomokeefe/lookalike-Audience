import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  HelpCircle,
  FileText,
  CheckCircle,
  AlertTriangle,
  Users,
} from "lucide-react";

interface FormatGuidelinesDialogProps {
  trigger?: React.ReactNode;
}

export const FormatGuidelinesDialog = ({
  trigger,
}: FormatGuidelinesDialogProps) => {
  const defaultTrigger = (
    <Button variant="outline" className="flex items-center gap-2">
      <HelpCircle className="w-4 h-4" />
      See Format Guidelines
    </Button>
  );

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-brand-primary" />
            CSV Format Guidelines
          </DialogTitle>
          <DialogDescription>
            Follow these guidelines to ensure your data is properly processed
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Required Format */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Required Format
                </h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                  CSV file format with header row
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                  UTF-8 encoding recommended
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                  First row must contain column headers
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Required Columns */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Required Columns
                </h3>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <code className="text-sm font-mono text-red-700">
                      MAIDS
                    </code>
                    <Badge variant="destructive" className="text-xs">
                      Required
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    Mobile Advertising IDs
                  </p>
                </div>

                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <code className="text-sm font-mono text-red-700">
                      Email
                    </code>
                    <Badge variant="destructive" className="text-xs">
                      Required
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    Customer email address
                  </p>
                </div>

                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <code className="text-sm font-mono text-red-700">
                      Hashed_Email
                    </code>
                    <Badge variant="destructive" className="text-xs">
                      Required
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    MD5 or SHA-256 hashed email for privacy
                  </p>
                </div>

                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <code className="text-sm font-mono text-red-700">
                      first_name
                    </code>
                    <Badge variant="destructive" className="text-xs">
                      Required
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">Customer first name</p>
                </div>

                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <code className="text-sm font-mono text-red-700">
                      last_name
                    </code>
                    <Badge variant="destructive" className="text-xs">
                      Required
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">Customer last name</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommended Columns */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Recommended Columns
                </h3>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <code className="text-sm font-mono text-blue-700">
                      purchase_value
                    </code>
                    <Badge variant="secondary" className="text-xs">
                      Optional
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">Total purchase amount</p>
                </div>

                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <code className="text-sm font-mono text-blue-700">
                      last_purchase_date
                    </code>
                    <Badge variant="secondary" className="text-xs">
                      Optional
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    Date of most recent purchase (YYYY-MM-DD)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Best Practices */}
          <Card className="border-brand-primary bg-green-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-brand-primary" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Best Practices
                </h3>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-700">
                  <strong>
                    For best results, include at least 1,000 customer records.
                  </strong>
                </p>
                <ul className="space-y-1 text-sm text-gray-600 ml-4">
                  <li className="list-disc">
                    More data improves audience quality
                  </li>
                  <li className="list-disc">
                    Recent customer data works better
                  </li>
                  <li className="list-disc">
                    Include diverse customer segments
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Example Format */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Example CSV Format
              </h3>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
                <pre className="text-xs">
                  {`MAIDS,Email,Hashed_Email,first_name,last_name,purchase_value,last_purchase_date
MAD123456,john@example.com,5d41402abc4b2a76b9719d911017c592,John,Doe,150.50,2024-01-15
MAD789012,jane@example.com,098f6bcd4621d373cade4e832627b4f6,Jane,Smith,89.99,2024-01-12`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};
