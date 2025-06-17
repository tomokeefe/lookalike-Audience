import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface AudienceSizeSliderProps {
  value: number;
  onValueChange: (value: number) => void;
}

const BrandSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className,
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-gray-200">
      <SliderPrimitive.Range className="absolute h-full bg-brand-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-brand-primary bg-white ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-brand-50" />
  </SliderPrimitive.Root>
));
BrandSlider.displayName = SliderPrimitive.Root.displayName;

export const AudienceSizeSlider = ({
  value,
  onValueChange,
}: AudienceSizeSliderProps) => {
  const handleSliderChange = (values: number[]) => {
    onValueChange(values[0]);
  };

  return (
    <div>
      <Label className="text-base font-semibold text-gray-900 mb-3 block">
        Audience Size
      </Label>

      <div className="mb-4">
        <div className="text-sm font-medium text-gray-700 mb-2">
          Audience Size: {value}%
        </div>

        <div className="relative">
          <BrandSlider
            value={[value]}
            onValueChange={handleSliderChange}
            max={10}
            min={1}
            step={0.5}
            className="w-full"
          />

          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>1%</span>
            <span>10%</span>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-600">
        A smaller percentage creates an audience more similar to your source. A
        larger percentage reaches more people but may be less similar.
      </p>
    </div>
  );
};
