import { NextResponse } from "next/server";
import { CATEGORIES, TOOLS } from "@/lib/data";

// GET /api/categories — List all categories with tool counts
export async function GET() {
  const categoriesWithCounts = CATEGORIES.map((cat) => {
    const toolsInCategory = TOOLS.filter((t) => t.categorySlug === cat.slug);
    return {
      ...cat,
      toolCount: toolsInCategory.length,
      avgRating:
        toolsInCategory.length > 0
          ? toolsInCategory.reduce((sum, t) => sum + t.rating, 0) / toolsInCategory.length
          : 0,
    };
  });

  return NextResponse.json({
    success: true,
    data: categoriesWithCounts,
    total: categoriesWithCounts.length,
  });
}
