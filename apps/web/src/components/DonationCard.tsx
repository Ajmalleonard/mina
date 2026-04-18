"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { Activity as ActivityIcon } from "lucide-react";
import OptimizedImage from "@/components/OptimizedImage";

interface Activity {
  id: string;
  title: string;
  description: string;
  image: string;
  goalAmount?: number;
  raisedAmount: number;
  slug: string;
}

interface DonationCardProps {
  activity: Activity;
  amount: number;
  onUpdateAmount: (id: string, delta: number) => void;
  onSetExactAmount: (id: string, val: number) => void;
  onDonate: (activity: Activity, amount: number) => void;
}

export function DonationCard({
  activity,
  amount,
  onUpdateAmount,
  onSetExactAmount,
  onDonate,
}: DonationCardProps) {
  return (
    <div className="bg-white rounded-3xl flex flex-col group overflow-hidden h-full">
      {/* Image Section - Squared Aspect Ratio */}
      <div className="relative aspect-square w-full">
        {activity.image ? (
          <OptimizedImage
            src={activity.image}
            alt={activity.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <ActivityIcon className="w-12 h-12 text-gray-300" />
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold mb-3 text-[#111111] leading-tight line-clamp-2">
          {activity.title}
        </h3>
        <p className="text-sm mb-6 leading-relaxed text-gray-600 line-clamp-3 flex-1">
          {activity.description}
        </p>

        <div className="space-y-4">
          {/* Amount Selector */}
          <div className="flex items-center justify-between bg-gray-50 rounded-2xl p-1.5 w-full">
            <button
              onClick={() => onUpdateAmount(activity.id, -5)}
              className="w-10 h-10 flex items-center justify-center font-bold text-lg rounded-xl text-[#111111]"
            >
              -
            </button>
            <div className="flex items-center justify-center gap-1 font-bold text-lg px-2">
              <span className="text-[#95E18A]">$</span>
              <input
                type="number"
                min="1"
                value={amount}
                onChange={(e) =>
                  onSetExactAmount(
                    activity.id,
                    parseInt(e.target.value) || 1
                  )
                }
                className="w-16 text-center outline-none bg-transparent"
              />
            </div>
            <button
              onClick={() => onUpdateAmount(activity.id, 5)}
              className="w-10 h-10 flex items-center justify-center font-bold text-lg rounded-xl text-[#111111]"
            >
              +
            </button>
          </div>

          <Button
            onClick={() => onDonate(activity, amount)}
            className="w-full py-6 font-bold text-sm tracking-wide rounded-2xl bg-[#111111] text-white"
          >
            Donate Now
          </Button>
        </div>
      </div>
    </div>
  );
}
