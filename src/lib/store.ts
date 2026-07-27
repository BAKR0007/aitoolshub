"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Tool } from "@/lib/data";

// ---------------------------------------------------------------------
// Bookmarks + Compare state — persisted to localStorage
// ---------------------------------------------------------------------

type AppState = {
  bookmarkedToolIds: string[];
  compareToolIds: string[];
  toggleBookmark: (toolId: string) => void;
  isBookmarked: (toolId: string) => boolean;
  addToCompare: (toolId: string) => void;
  removeFromCompare: (toolId: string) => void;
  clearCompare: () => void;
  isComparing: (toolId: string) => boolean;
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      bookmarkedToolIds: ["t1", "t3", "t7"],
      compareToolIds: ["t1", "t3"],
      toggleBookmark: (toolId) =>
        set((state) => ({
          bookmarkedToolIds: state.bookmarkedToolIds.includes(toolId)
            ? state.bookmarkedToolIds.filter((id) => id !== toolId)
            : [...state.bookmarkedToolIds, toolId],
        })),
      isBookmarked: (toolId) => get().bookmarkedToolIds.includes(toolId),
      addToCompare: (toolId) =>
        set((state) => {
          if (state.compareToolIds.includes(toolId)) return state;
          if (state.compareToolIds.length >= 4) {
            return { compareToolIds: [...state.compareToolIds.slice(1), toolId] };
          }
          return { compareToolIds: [...state.compareToolIds, toolId] };
        }),
      removeFromCompare: (toolId) =>
        set((state) => ({
          compareToolIds: state.compareToolIds.filter((id) => id !== toolId),
        })),
      clearCompare: () => set({ compareToolIds: [] }),
      isComparing: (toolId) => get().compareToolIds.includes(toolId),
    }),
    { name: "aitoolshub-store" }
  )
);

// Helper for non-hook access
export const getAppState = () => useAppStore.getState();
