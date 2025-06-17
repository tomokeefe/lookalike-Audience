import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  Check,
  Users,
  UserCheck,
  AlertCircle,
  Smartphone,
  Monitor,
  Download,
} from "lucide-react";
import { FileUpload } from "@/components/FileUpload";
import { FormatGuidelinesDialog } from "@/components/FormatGuidelinesDialog";
import { CustomerListSelect } from "@/components/CustomerListSelect";
import { AudienceSizeSlider } from "@/components/AudienceSizeSlider";
import { useAudienceContext } from "@/contexts/AudienceContext";
import { useToast } from "@/hooks/use-toast";

type Step = 1 | 2 | 3 | 4;

interface ResponsiveCreateAudienceProps {
  isMobile?: boolean;
}

export const ResponsiveCreateAudience = ({
  isMobile = false,
}: ResponsiveCreateAudienceProps) => {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [sourceType, setSourceType] = useState("customer-list");
  const [audienceName, setAudienceName] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [selectedCustomerList, setSelectedCustomerList] = useState("");
  const [audienceSize, setAudienceSize] = useState(5);
  const [isCreating, setIsCreating] = useState(false);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [createdAudience, setCreatedAudience] = useState<any>(null);
  const navigate = useNavigate();
  const { createAudience } = useAudienceContext();
  const { toast } = useToast();

  const validateStep = (step: Step): boolean => {
    const errors: string[] = [];

    switch (step) {
      case 1:
        if (!sourceType) {
          errors.push("Please select a source type");
        }
        break;
      case 2:
        if (!audienceName.trim()) {
          errors.push("Audience name is required");
        }
        if (audienceName.length > 100) {
          errors.push("Audience name must be less than 100 characters");
        }
        if (sourceType === "customer-list" && !uploadedFile) {
          errors.push("Please upload a CSV file");
        }
        if (sourceType === "lookalike-audience" && !selectedCustomerList) {
          errors.push("Please select a source customer list");
        }
        break;
    }

    setFormErrors(errors);
    return errors.length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep) && currentStep < 4) {
      setCurrentStep((prev) => (prev + 1) as Step);
      setFormErrors([]);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as Step);
      setFormErrors([]);
    }
  };

  const handleCreate = async () => {
    if (!validateStep(3)) return;

    setIsCreating(true);
    try {
      // Actually create the audience
      const newAudience = await createAudience({
        name: audienceName,
        source:
          sourceType === "customer-list"
            ? "Customer List"
            : "Lookalike Audience",
        uploadedFile,
      });

      setCreatedAudience(newAudience);

      toast({
        title: "Audience created successfully!",
        description:
          "Your lookalike audience is now being processed and will appear in your dashboard.",
      });

      setCurrentStep(4);
    } catch (error) {
      toast({
        title: "Error creating audience",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
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
        className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center text-sm font-medium border-2 ${
          isCompleted
            ? "bg-brand-primary border-brand-primary text-white"
            : isActive
              ? "border-brand-primary text-brand-primary bg-white"
              : "border-gray-300 text-gray-400 bg-white"
        }`}
      >
        {isCompleted ? <Check className="w-4 h-4 lg:w-5 lg:h-5" /> : step}
      </div>
      <div
        className={`text-xs lg:text-sm mt-1 lg:mt-2 ${
          isActive || isCompleted ? "text-gray-900" : "text-gray-400"
        }`}
      >
        {step === 1 && "Source"}
        {step === 2 && "Setup"}
        {step === 3 && "Review"}
      </div>
    </div>
  );

  return (
    <div
      className="min-h-screen font-sans"
      style={{ backgroundColor: "#F8FBF7" }}
    >
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="p-1"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold">
              {sourceType === "lookalike-audience"
                ? "Create Lookalike Audience"
                : "Create Audience"}
            </h1>
            <div className="text-xs text-gray-500">Step {currentStep} of 3</div>
          </div>
        </div>

        {/* Mobile Progress Bar */}
        <div className="mt-3">
          <Progress value={(currentStep / 3) * 100} className="h-2" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 lg:px-6 py-4 lg:py-8">
        {/* Desktop Back Button */}
        <div className="hidden lg:block mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            size="sm"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:block text-center mb-12">
          <h1 className="mb-2">
            {sourceType === "lookalike-audience"
              ? "Create Lookalike Audience"
              : "Create Customer List"}
          </h1>
          <p className="text-gray-600">
            Find new potential customers who are similar to your best customers
          </p>
        </div>

        {/* Step Indicator - Desktop */}
        {currentStep < 4 && (
          <div className="hidden lg:flex justify-center items-center mb-12">
            <div className="flex items-center gap-8">
              <StepIndicator
                step={1}
                isActive={currentStep === 1}
                isCompleted={currentStep > 1}
              />
              <div
                className={`w-16 h-0.5 ${
                  currentStep > 1 ? "bg-brand-primary" : "bg-gray-300"
                }`}
              />
              <StepIndicator
                step={2}
                isActive={currentStep === 2}
                isCompleted={currentStep > 2}
              />
              <div
                className={`w-16 h-0.5 ${
                  currentStep > 2 ? "bg-brand-primary" : "bg-gray-300"
                }`}
              />
              <StepIndicator
                step={3}
                isActive={currentStep === 3}
                isCompleted={currentStep > 3}
              />
            </div>
          </div>
        )}

        {/* Step Content */}
        <div className="max-w-2xl mx-auto">
          {/* Step 1: Source Selection */}
          {currentStep === 1 && (
            <div>
              <div className="mb-6 lg:mb-8 lg:hidden">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Select Your Source
                </h2>
                <p className="text-gray-600 text-sm">
                  Choose the data source for your lookalike audience
                </p>
              </div>

              <div className="hidden lg:block mb-8">
                <h2 className="mb-2">Select Your Source Audience</h2>
                <p className="text-gray-600">
                  Choose the source audience that will be used to create your
                  lookalike audience
                </p>
              </div>

              <RadioGroup
                value={sourceType}
                onValueChange={setSourceType}
                className="space-y-3 lg:space-y-4"
              >
                <Card
                  className={`border-2 transition-colors cursor-pointer ${
                    sourceType === "customer-list"
                      ? "border-brand-primary"
                      : "border-gray-200 hover:border-brand-primary"
                  }`}
                >
                  <CardContent className="p-4 lg:p-6">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem
                        value="customer-list"
                        id="customer-list"
                      />
                      <Label
                        htmlFor="customer-list"
                        className="flex-1 cursor-pointer"
                      >
                        <div className="flex items-center gap-3 lg:gap-4">
                          <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg bg-blue-50 flex items-center justify-center">
                            <Users className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-gray-900 text-sm lg:text-base">
                              Customer List
                            </div>
                            <div className="text-gray-600 text-xs lg:text-sm">
                              Use your existing customer data
                            </div>
                          </div>
                          <div className="text-xs lg:text-sm text-gray-500">
                            2.5M users
                          </div>
                        </div>
                      </Label>
                    </div>
                  </CardContent>
                </Card>

                <Card
                  className={`border-2 transition-colors cursor-pointer ${
                    sourceType === "lookalike-audience"
                      ? "border-brand-primary"
                      : "border-gray-200 hover:border-brand-primary"
                  }`}
                >
                  <CardContent className="p-4 lg:p-6">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem
                        value="lookalike-audience"
                        id="lookalike-audience"
                      />
                      <Label
                        htmlFor="lookalike-audience"
                        className="flex-1 cursor-pointer"
                      >
                        <div className="flex items-center gap-3 lg:gap-4">
                          <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg bg-green-50 flex items-center justify-center">
                            <UserCheck className="w-5 h-5 lg:w-6 lg:h-6 text-green-600" />
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-gray-900 text-sm lg:text-base">
                              Lookalike Audience
                            </div>
                            <div className="text-gray-600 text-xs lg:text-sm">
                              Use a customer list as seed
                            </div>
                          </div>
                          <div className="text-xs lg:text-sm text-gray-500">
                            1.8M users
                          </div>
                        </div>
                      </Label>
                    </div>
                  </CardContent>
                </Card>
              </RadioGroup>

              <div className="flex justify-end mt-6 lg:mt-8">
                <Button
                  onClick={handleNext}
                  className="bg-brand-primary hover:bg-brand-600 text-white px-6 lg:px-8 py-2"
                >
                  Continue
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Setup */}
          {currentStep === 2 && (
            <div className="space-y-6 lg:space-y-8">
              <div className="mb-6 lg:mb-8 lg:hidden">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {sourceType === "lookalike-audience"
                    ? "Configure Parameters"
                    : "Setup Your Audience"}
                </h2>
                <p className="text-gray-600 text-sm">
                  {sourceType === "lookalike-audience"
                    ? "Configure the settings for your lookalike audience"
                    : "Configure the details and upload your data"}
                </p>
              </div>

              <div className="hidden lg:block mb-8">
                <h2 className="mb-2">Configure Customer List Parameters</h2>
                <p className="text-gray-600">
                  Adjust the settings to control the size of your lookalike
                  audience.
                </p>
              </div>

              {/* Select Source Customer List - Only for Lookalike Audience */}
              {sourceType === "lookalike-audience" && (
                <div>
                  <Label className="text-base font-semibold text-gray-900 mb-3 block">
                    Select Source Customer List
                  </Label>
                  <CustomerListSelect
                    value={selectedCustomerList}
                    onValueChange={setSelectedCustomerList}
                  />
                </div>
              )}

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
                  placeholder={
                    sourceType === "lookalike-audience"
                      ? "Lookalike Audience (Jun 16, 2025)"
                      : "Customer List Lookalike (Jun 16, 2025)"
                  }
                  className="w-full"
                  maxLength={100}
                />
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>
                    Choose a descriptive name to help you identify this audience
                    later
                  </span>
                  <span>{audienceName.length}/100</span>
                </div>
              </div>

              {/* Audience Size Slider - Only for Lookalike Audience */}
              {sourceType === "lookalike-audience" && (
                <AudienceSizeSlider
                  value={audienceSize}
                  onValueChange={setAudienceSize}
                />
              )}

              {/* Upload Customer Data - Only for Customer List */}
              {sourceType === "customer-list" && (
                <div>
                  <Label className="text-base font-semibold text-gray-900 mb-3 block">
                    Upload Customer Data
                  </Label>
                  <p className="text-sm text-gray-600 mb-4">
                    Upload a CSV file containing your customer data. Make sure
                    it follows our format guidelines.
                  </p>

                  <FileUpload
                    onFileUpload={setUploadedFile}
                    uploadedFile={uploadedFile}
                    onFileRemove={() => setUploadedFile(null)}
                    templateType="customer-list"
                  />
                </div>
              )}

              {/* Form Errors */}
              {formErrors.length > 0 && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <div className="space-y-1">
                      {formErrors.map((error, index) => (
                        <div key={index}>• {error}</div>
                      ))}
                    </div>
                  </AlertDescription>
                </Alert>
              )}

              <div className="flex justify-between mt-6 lg:mt-8">
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
                  disabled={
                    !audienceName ||
                    (sourceType === "customer-list" && !uploadedFile) ||
                    (sourceType === "lookalike-audience" &&
                      !selectedCustomerList)
                  }
                  className="bg-brand-primary hover:bg-brand-600 text-white px-6 lg:px-8 py-2"
                >
                  Continue
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="mb-6 lg:mb-8 lg:hidden">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Review & Create
                </h2>
                <p className="text-gray-600 text-sm">
                  Check your settings before creating
                </p>
              </div>

              <div className="hidden lg:block mb-8">
                <h2 className="mb-2">Review & Create</h2>
                <p className="text-gray-600">
                  Review your lookalike audience settings before creating it.
                </p>
              </div>

              {/* Review Content */}
              <div className="space-y-4 lg:space-y-6">
                <Card>
                  <CardContent className="p-4 lg:p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">
                      Audience Name
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-3 lg:p-4">
                      <div className="font-medium text-gray-900">
                        {audienceName || "testing"}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 lg:p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">
                      Source Audience
                    </h3>
                    <div className="flex items-center gap-3 lg:gap-4 p-3 lg:p-4 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg bg-brand-primary flex items-center justify-center">
                        <Users className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
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
                  </CardContent>
                </Card>

                <Card className="border-brand-primary">
                  <CardContent className="p-4 lg:p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-6 h-6 rounded-full bg-brand-primary flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="font-semibold text-brand-primary">
                        Estimated Audience Size
                      </h3>
                    </div>
                    <p className="text-gray-600 text-sm lg:text-base">
                      Based on your settings, your lookalike audience will
                      contain approximately <strong>3,525,453 people</strong>.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-between mt-6 lg:mt-8">
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
                  disabled={isCreating}
                  className="bg-brand-primary hover:bg-brand-600 text-white px-6 lg:px-8 py-2"
                >
                  {isCreating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Creating...
                    </>
                  ) : (
                    "Create Audience"
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Success */}
          {currentStep === 4 && (
            <div className="text-center">
              <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-brand-primary flex items-center justify-center mx-auto mb-4 lg:mb-6">
                <Check className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
              </div>

              <h2 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-3 lg:mb-4">
                Audience Created!
              </h2>
              <p className="text-gray-600 mb-6 lg:mb-8 text-sm lg:text-base">
                Your new lookalike audience has been successfully created and is
                now processing.
              </p>

              <Card>
                <CardContent className="p-4 lg:p-6 text-left">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm lg:text-base">
                      <span className="text-gray-600">Audience Name</span>
                      <span className="font-medium text-gray-900">
                        {createdAudience?.name || audienceName || "testing"}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm lg:text-base">
                      <span className="text-gray-600">Source</span>
                      <span className="font-medium text-gray-900">
                        {createdAudience?.source || "Customer List"}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm lg:text-base">
                      <span className="text-gray-600">Created</span>
                      <span className="font-medium text-gray-900">
                        {createdAudience?.created ||
                          new Date().toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm lg:text-base">
                      <span className="text-gray-600">Status</span>
                      <span className="inline-flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
                        <span className="font-medium text-gray-900">
                          Processing
                        </span>
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex flex-col lg:flex-row justify-center gap-3 lg:gap-4 mt-6 lg:mt-8">
                <Button
                  variant="outline"
                  onClick={() => window.location.reload()}
                  className="w-full lg:w-auto"
                >
                  Create Another
                </Button>
                <Button
                  onClick={() => navigate("/")}
                  className="bg-brand-primary hover:bg-brand-600 text-white w-full lg:w-auto"
                >
                  View Dashboard
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
