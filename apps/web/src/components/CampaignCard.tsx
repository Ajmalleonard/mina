import { useState } from "react";
import { Button } from "@/components/ui/Button";
import OptimizedImage from "@/components/OptimizedImage";

export interface Activity {
  id: string;
  title: string;
  description: string;
  image: string;
  goalAmount?: number;
  raisedAmount: number;
  slug: string;
  category: string;
  price?: number;
  isActive?: boolean;
}

interface CampaignCardProps {
  activity: Activity;
  onAddToCart: (activity: Activity, amount: number) => void;
}

export function CampaignCard({ activity, onAddToCart }: CampaignCardProps) {
  const [amount, setAmount] = useState<number>(1);

  const updateAmount = (delta: number) => {
    setAmount((prev) => Math.max(1, prev + delta));
  };

  const handleSetExactAmount = (val: number) => {
    setAmount(Math.max(1, val));
  };

  return (
    <div className="bg-[#f0f2f5] flex flex-col h-full overflow-hidden">
      <div className="aspect-4/3 relative overflow-hidden bg-gray-200 shrink-0">
        {activity.image ? (
          <OptimizedImage
            src={activity.image}
            alt={activity.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No image available
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col grow">
        <h3 className="text-[15px] font-bold mb-1 text-[#111111] leading-tight">
          {activity.title}
        </h3>
        
        {/* If it's a fixed price item, show price; otherwise show general donation label */}
        <p className="text-[15px] font-bold text-[#111111] mb-4">
          {activity.price ? `$${activity.price.toLocaleString()}` : "Any Amount"}
        </p>

        <p className="text-xs mb-6 grow leading-relaxed text-gray-600">
          {activity.description}
        </p>

        {/* Purpose/ID reference for realistic look */}
        <p className="text-xs font-bold text-[#111111] mb-4">
          Purpose: {activity.slug.slice(0, 8).toUpperCase()}
        </p>

        {/* Target Progress Bar matching the reference UI */}
        {activity.goalAmount && (
          <div className="mb-6">
            <div className="flex items-center justify-between text-[10px] font-bold text-[#111111] mb-1">
              <span>Raised: ${(activity.raisedAmount || 0).toLocaleString()}</span>
            </div>
            <div className="w-full bg-white h-2 rounded-none overflow-hidden">
              <div
                className="bg-[#95E18A] h-full"
                style={{
                  width: `${Math.min(
                    100,
                    ((activity.raisedAmount || 0) / activity.goalAmount) * 100
                  )}%`,
                }}
              />
            </div>
            <p className="text-[10px] font-bold text-[#111111] mt-1">
              Target: ${activity.goalAmount.toLocaleString()}
            </p>
          </div>
        )}

        {/* Amount Selector */}
        <div className="flex items-center justify-between mb-3 bg-white border-0 h-10">
          <button
            onClick={() => updateAmount(-1)}
            className="w-10 h-10 flex items-center rounded-lg justify-center font-bold text-lg bg-[#b0b3b8] text-white"
          >
            -
          </button>
          <div className="flex items-center gap-1 font-bold text-sm text-[#111111]">
            Quantity:
            <input
              type="number"
              min="1"
              value={amount}
              onChange={(e) => handleSetExactAmount(parseInt(e.target.value) || 1)}
              className="w-12 text-center outline-none bg-transparent"
            />
          </div>
          <button
            onClick={() => updateAmount(1)}
            className="w-10 h-10 flex items-center justify-center rounded-lg font-bold text-lg bg-[#333333] text-white"
          >
            +
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <Button
            onClick={() => onAddToCart(activity, amount)}
            className="w-full py-5 font-bold text-xs tracking-wide bg-[#6d7c88] text-white rounded-xl border-0"
          >
            Add
          </Button>
          <Button
            onClick={() => onAddToCart(activity, amount)}
            className="w-full py-5 font-bold text-xs tracking-wide bg-[#111111] text-white rounded-xl border-0"
          >
            Donate
          </Button>
        </div>
      </div>
    </div>
  );
}
