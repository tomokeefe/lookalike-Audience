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
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Required Format
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-gray-400 mt-1.5">•</span>
                CSV file format with header row
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-400 mt-1.5">•</span>
                UTF-8 encoding recommended
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-400 mt-1.5">•</span>
                First row must contain column headers
              </li>
            </ul>
          </div>

          {/* Required Columns */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Required Columns
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-gray-400 mt-1.5">•</span>
                <span>
                  <strong>MAIDS</strong> - Mobile Advertising IDs
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-400 mt-1.5">•</span>
                <span>
                  <strong>Email</strong> - Customer email address
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-400 mt-1.5">•</span>
                <span>
                  <strong>Hashed_Email</strong> - MD5 or SHA-256 hashed email
                  for privacy
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-400 mt-1.5">•</span>
                <span>
                  <strong>first_name</strong> - Customer first name
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-400 mt-1.5">•</span>
                <span>
                  <strong>last_name</strong> - Customer last name
                </span>
              </li>
            </ul>
          </div>

          {/* Recommended Columns */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Recommended Columns
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-gray-400 mt-1.5">•</span>
                <span>
                  <strong>purchase_value</strong> - Total purchase amount
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-400 mt-1.5">•</span>
                <span>
                  <strong>last_purchase_date</strong> - Date of most recent
                  purchase (YYYY-MM-DD)
                </span>
              </li>
            </ul>
          </div>

          {/* Best Practices */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-gray-700">
              <strong>
                For best results, include at least 1,000 customer records.
              </strong>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
