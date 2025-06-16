import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Check,
  Upload,
  Users,
  UserCheck,
  File,
  Download,
  HelpCircle,
  X,
} from "lucide-react";

type Step = 1 | 2 | 3 | 4;

const CreateAudience = () => {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [sourceType, setSourceType] = useState("customer-list");
  const [audienceName, setAudienceName] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [audienceSize, setAudienceSize] = useState(5);
  const [isCreated, setIsCreated] = useState(false);
  const navigate = useNavigate();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => (prev + 1) as Step);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as Step);
    }
  };

  const handleCreate = () => {
    setIsCreated(true);
    setCurrentStep(4);
  };

  const StepIndicator = ({
    step,
    isActive,
    isCompleted,
  }: {
    step: number;
    isActive: boolean;
    isCompleted: boolean;
  }) => (
    <div className="flex flex-col items-center">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium border-2 ${
          isCompleted
            ? "bg-brand-primary border-brand-primary text-white"
            : isActive
              ? "border-brand-primary text-brand-primary bg-white"
              : "border-gray-300 text-gray-400 bg-white"
        }`}
      >
        {isCompleted ? <Check className="w-5 h-5" /> : step}
      </div>
      <div
        className={`text-sm mt-2 ${isActive || isCompleted ? "text-gray-900" : "text-gray-400"}`}
      >
        {step === 1 && "Source"}
        {step === 2 && "Parameters"}
        {step === 3 && "Review"}
      </div>
    </div>
  );

  return (
    <div
      className="min-h-screen font-sans"
      style={{ backgroundColor: "#F8FBF7" }}
    >
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Create Lookalike Audience
          </h1>
          <p className="text-gray-600">
            Find new potential customers who are similar to your best customers
          </p>
        </div>

        {/* Step Indicator */}
        {currentStep < 4 && (
          <div className="flex justify-center items-center mb-12">
            <div className="flex items-center gap-8">
              <StepIndicator
                step={1}
                isActive={currentStep === 1}
                isCompleted={currentStep > 1}
              />
              <div
                className={`w-16 h-0.5 ${currentStep > 1 ? "bg-brand-primary" : "bg-gray-300"}`}
              />
              <StepIndicator
                step={2}
                isActive={currentStep === 2}
                isCompleted={currentStep > 2}
              />
              <div
                className={`w-16 h-0.5 ${currentStep > 2 ? "bg-brand-primary" : "bg-gray-300"}`}
              />
              <StepIndicator
                step={3}
                isActive={currentStep === 3}
                isCompleted={currentStep > 3}
              />
            </div>
          </div>
        )}

        {/* Step 1: Source Selection */}
        {currentStep === 1 && (
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Select Your Source Audience
              </h2>
              <p className="text-gray-600">
                Choose the source audience that will be used to create your
                lookalike audience
              </p>
            </div>

            <RadioGroup
              value={sourceType}
              onValueChange={setSourceType}
              className="space-y-4"
            >
              <Card className="border-2 border-gray-200 hover:border-brand-primary transition-colors cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="customer-list" id="customer-list" />
                    <Label
                      htmlFor="customer-list"
                      className="flex-1 cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
                          <Users className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">
                            Customer List
                          </div>
                          <div className="text-gray-600 text-sm">
                            Use your existing customer data to create a
                            lookalike audience
                          </div>
                        </div>
                        <div className="ml-auto text-sm text-gray-500">
                          2.5M users
                        </div>
                      </div>
                    </Label>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-gray-200 hover:border-brand-primary transition-colors cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem
                      value="lookalike-audience"
                      id="lookalike-audience"
                    />
                    <Label
                      htmlFor="lookalike-audience"
                      className="flex-1 cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center">
                          <UserCheck className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">
                            Lookalike Audience
                          </div>
                          <div className="text-gray-600 text-sm">
                            Use an existing lookalike audience as a seed to
                            create a new audience
                          </div>
                        </div>
                        <div className="ml-auto text-sm text-gray-500">
                          1.8M users
                        </div>
                      </div>
                    </Label>
                  </div>
                </CardContent>
              </Card>
            </RadioGroup>

            <div className="flex justify-end mt-8">
              <Button
                onClick={handleNext}
                className="bg-brand-primary hover:bg-brand-600 text-white px-8 py-2"
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Parameters */}
        {currentStep === 2 && (
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Configure Customer List Parameters
              </h2>
              <p className="text-gray-600">
                Adjust the settings to control the size of your lookalike
                audience.
              </p>
            </div>

            <div className="space-y-8">
              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download Template
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4" />
                  See Format Guidelines
                </Button>
              </div>

              {/* Name Your Audience */}
              <div>
                <Label
                  htmlFor="audience-name"
                  className="text-base font-semibold text-gray-900 mb-3 block"
                >
                  Name Your Audience
                </Label>
                <Input
                  id="audience-name"
                  value={audienceName}
                  onChange={(e) => setAudienceName(e.target.value)}
                  placeholder="Customer List Lookalike (Jun 16, 2025)"
                  className="w-full"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Choose a descriptive name to help you identify this audience
                  later
                </p>
              </div>

              {/* Upload Customer Data */}
              <div>
                <Label className="text-base font-semibold text-gray-900 mb-3 block">
                  Upload Customer Data
                </Label>
                <p className="text-sm text-gray-600 mb-4">
                  Upload a CSV file containing your customer data. This will be
                  used to create your lookalike audience.
                </p>

                {uploadedFile ? (
                  <Card className="border-2 border-brand-primary bg-green-50">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-brand-primary flex items-center justify-center">
                            <File className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">
                              {uploadedFile.name}
                            </div>
                            <div className="text-sm text-gray-600">
                              {(uploadedFile.size / 1024).toFixed(2)} KB •
                              Uploaded {new Date().toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setUploadedFile(null)}
                          className="text-gray-500 hover:text-red-600"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <div
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-brand-primary transition-colors"
                  >
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <div className="text-lg font-medium text-gray-900 mb-2">
                      Drag and drop your CSV file here
                    </div>
                    <div className="text-gray-600 mb-4">
                      or browse to upload
                    </div>
                    <input
                      type="file"
                      accept=".csv"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <Label
                      htmlFor="file-upload"
                      className="inline-flex items-center px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-600 cursor-pointer"
                    >
                      Browse Files
                    </Label>
                    <div className="text-sm text-gray-500 mt-4">
                      CSV files containing customer data (max 10MB)
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handleBack}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={!audienceName || !uploadedFile}
                className="bg-brand-primary hover:bg-brand-600 text-white px-8 py-2"
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Review */}
        {currentStep === 3 && (
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Review & Create
              </h2>
              <p className="text-gray-600">
                Review your lookalike audience settings before creating it.
              </p>
            </div>

            <div className="space-y-6">
              {/* Audience Name */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Audience Name
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="font-medium text-gray-900">
                      {audienceName || "testing"}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Source Audience */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Source Audience
                  </h3>
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 rounded-lg bg-brand-primary flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        Customer List
                      </div>
                      <div className="text-sm text-gray-600">
                        Your lookalike audience will be based on these users
                      </div>
                    </div>
                  </div>
                  {uploadedFile && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <File className="w-5 h-5 text-gray-600" />
                        <div>
                          <div className="font-medium text-gray-900">
                            {uploadedFile.name}
                          </div>
                          <div className="text-sm text-gray-600">
                            {(uploadedFile.size / 1024).toFixed(2)} KB •
                            Uploaded {new Date().toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Audience Parameters */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Audience Parameters
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Audience Size</span>
                      <span className="font-medium text-gray-900">5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Countries</span>
                      <span className="font-medium text-gray-900">US</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Match Preference</span>
                      <span className="font-medium text-gray-900">
                        Balanced
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Estimated Size */}
              <Card className="border-brand-primary">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-6 h-6 rounded-full bg-brand-primary flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="font-semibold text-brand-primary">
                      Estimated Audience Size
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-2">
                    Based on your settings, your lookalike audience will contain
                    approximately <strong>3,525,453 people</strong>.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handleBack}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <Button
                onClick={handleCreate}
                className="bg-brand-primary hover:bg-brand-600 text-white px-8 py-2"
              >
                Create Lookalike Audience
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Success */}
        {currentStep === 4 && isCreated && (
          <div className="max-w-lg mx-auto text-center">
            <div className="w-16 h-16 rounded-full bg-brand-primary flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-white" />
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Lookalike Audience Created!
            </h2>
            <p className="text-gray-600 mb-8">
              Your new lookalike audience has been successfully created and is
              now processing. You'll be notified when it's ready to use.
            </p>

            <Card>
              <CardContent className="p-6 text-left">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Audience Name</span>
                    <span className="font-medium text-gray-900">
                      {audienceName || "testing"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Audience Size</span>
                    <span className="font-medium text-gray-900">
                      2.8 million people
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status</span>
                    <span className="inline-flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                      <span className="font-medium text-gray-900">
                        Processing
                      </span>
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center gap-4 mt-8">
              <Button
                variant="outline"
                onClick={() => navigate("/create-audience")}
              >
                Create Another Audience
              </Button>
              <Button
                onClick={() => navigate("/")}
                className="bg-brand-primary hover:bg-brand-600 text-white"
              >
                View Dashboard
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateAudience;
