"use client";

import * as React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

type StarRatingProps = {
  rating: number;
  size?: number;
  className?: string;
  showValue?: boolean;
  reviewCount?: number;
};

export function StarRating({
  rating,
  size = 14,
  className,
  showValue = true,
  reviewCount,
}: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;

  return (
    <div className={cn("inline-flex items-center gap-1.5", className)}>
      <div className="inline-flex items-center">
        {Array.from({ length: 5 }).map((_, i) => {
          const isFull = i < fullStars;
          const isHalf = i === fullStars && hasHalf;
          return (
            <div key={i} className="relative" style={{ width: size, height: size }}>
              <Star
                size={size}
                className="absolute inset-0 text-muted-foreground/30"
                fill="currentColor"
              />
              {(isFull || isHalf) && (
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: isHalf ? size / 2 : size }}
                >
                  <Star
                    size={size}
                    className="text-amber-400"
                    fill="currentColor"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
      {showValue && (
        <span className="text-xs font-medium text-muted-foreground">
          {rating.toFixed(1)}
          {typeof reviewCount === "number" && (
            <span className="ml-1">({reviewCount.toLocaleString()})</span>
          )}
        </span>
      )}
    </div>
  );
}
