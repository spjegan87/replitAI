import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

type TripType = 'one-way' | 'round-trip' | 'multi-city';

interface TripTypeSelectorProps {
  onChange: (tripType: TripType) => void;
}

export default function TripTypeSelector({ onChange }: TripTypeSelectorProps) {
  const [selectedType, setSelectedType] = useState<TripType>('round-trip');

  const handleChange = (value: string) => {
    const tripType = value as TripType;
    setSelectedType(tripType);
    onChange(tripType);
  };

  return (
    <div className="mb-6">
      <RadioGroup 
        defaultValue="round-trip" 
        className="flex space-x-4" 
        onValueChange={handleChange}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="one-way" id="one-way" />
          <Label htmlFor="one-way" className="text-sm text-sw-gray-700">One-way</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="round-trip" id="round-trip" />
          <Label htmlFor="round-trip" className="text-sm text-sw-gray-700">Round-Trip</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="multi-city" id="multi-city" />
          <Label htmlFor="multi-city" className="text-sm text-sw-gray-700">Multi-City</Label>
        </div>
      </RadioGroup>
    </div>
  );
}
