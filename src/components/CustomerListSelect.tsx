import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CustomerListSelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

const customerLists = [
  { id: "list-1", name: "High Value Customers", users: "2.5M users" },
  { id: "list-2", name: "Recent Purchasers", users: "1.8M users" },
  { id: "list-3", name: "Loyal Customers", users: "3.2M users" },
  { id: "list-4", name: "Premium Subscribers", users: "950K users" },
];

export const CustomerListSelect = ({
  value,
  onValueChange,
}: CustomerListSelectProps) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a customer list" />
      </SelectTrigger>
      <SelectContent>
        {customerLists.map((list) => (
          <SelectItem key={list.id} value={list.id}>
            <div className="flex items-center justify-between w-full">
              <span>{list.name}</span>
              <span className="text-sm text-gray-500 ml-2">{list.users}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
