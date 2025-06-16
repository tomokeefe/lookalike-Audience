import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

interface AudienceSizeSliderProps {
  value: number;
  onValueChange: (value: number) => void;
}

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
          <Slider
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
