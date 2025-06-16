import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import {
  Upload,
  File,
  X,
  CheckCircle,
  AlertCircle,
  Download,
} from "lucide-react";
import {
  validateCSVFile,
  downloadCSV,
  generateCSVTemplate,
} from "@/utils/csvTemplates";
import { FormatGuidelinesDialog } from "@/components/FormatGuidelinesDialog";

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  uploadedFile: File | null;
  onFileRemove: () => void;
  templateType?: "customer-list" | "lookalike";
}

export const FileUpload = ({
  onFileUpload,
  uploadedFile,
  onFileRemove,
  templateType = "customer-list",
}: FileUploadProps) => {
  const [validation, setValidation] = useState<{
    valid: boolean;
    errors: string[];
    preview?: any[];
  } | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileValidation = useCallback(
    async (file: File) => {
      setIsValidating(true);
      const result = await validateCSVFile(file);
      setValidation(result);
      setIsValidating(false);

      if (result.valid) {
        onFileUpload(file);
      }
    },
    [onFileUpload],
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileValidation(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type === "text/csv") {
      handleFileValidation(file);
    }
  };

  const handleDownloadTemplate = () => {
    const template = generateCSVTemplate(templateType);
    downloadCSV(template, `${templateType}-template.csv`);
  };

  const handleRemoveFile = () => {
    onFileRemove();
    setValidation(null);
  };

  if (uploadedFile && validation?.valid) {
    return (
      <Card className="border-2 border-brand-primary bg-green-50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-brand-primary flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-medium text-gray-900">
                  {uploadedFile.name}
                </div>
                <div className="text-sm text-gray-600">
                  {(uploadedFile.size / 1024).toFixed(2)} KB • Valid format
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemoveFile}
              className="text-gray-500 hover:text-red-600"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {validation.preview && validation.preview.length > 0 && (
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h4 className="font-medium text-gray-900 mb-3">
                File Preview (First 3 rows)
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      {Object.keys(validation.preview[0]).map((header) => (
                        <th
                          key={header}
                          className="text-left p-2 font-medium text-gray-700"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {validation.preview.map((row, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        {Object.values(row).map((value: any, cellIndex) => (
                          <td key={cellIndex} className="p-2 text-gray-600">
                            {String(value).length > 20
                              ? String(value).substring(0, 20) + "..."
                              : String(value)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <Button
          variant="outline"
          onClick={handleDownloadTemplate}
          className="flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Download Template
        </Button>
        <FormatGuidelinesDialog />
      </div>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
          isDragOver
            ? "border-brand-primary bg-green-50"
            : validation?.valid === false
              ? "border-red-300 bg-red-50"
              : "border-gray-300 hover:border-brand-primary"
        }`}
      >
        {isValidating ? (
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mx-auto">
              <File className="w-6 h-6 text-blue-600 animate-pulse" />
            </div>
            <div className="text-lg font-medium text-gray-900">
              Validating file...
            </div>
            <Progress value={65} className="w-64 mx-auto" />
          </div>
        ) : (
          <>
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <div className="text-lg font-medium text-gray-900 mb-2">
              Drag and drop your CSV file here
            </div>
            <div className="text-gray-600 mb-4">or browse to upload</div>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <Button
              asChild
              className="bg-brand-primary hover:bg-brand-600 text-white"
            >
              <label htmlFor="file-upload" className="cursor-pointer">
                Browse Files
              </label>
            </Button>
            <div className="text-sm text-gray-500 mt-4">
              CSV files only (max 10MB)
            </div>
          </>
        )}
      </div>

      {validation && !validation.valid && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <div className="space-y-1">
              <div className="font-medium">File validation failed:</div>
              {validation.errors.map((error, index) => (
                <div key={index} className="text-sm">
                  • {error}
                </div>
              ))}
            </div>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};
