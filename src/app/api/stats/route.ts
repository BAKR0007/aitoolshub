import { NextResponse } from "next/server";
import { TOOLS, CATEGORIES } from "@/lib/data";

// GET /api/stats — Platform-wide statistics for the dashboard
export async function GET() {
  const totalTools = TOOLS.length;
  const totalViews = TOOLS.reduce((sum, t) => sum + t.viewCount, 0);
  const totalClicks = TOOLS.reduce((sum, t) => sum + t.clickCount, 0);
  const totalBookmarks = TOOLS.reduce((sum, t) => sum + t.bookmarkCount, 0);
  const totalReviews = TOOLS.reduce((sum, t) => sum + t.reviewCount, 0);
  const avgRating = TOOLS.reduce((sum, t) => sum + t.rating, 0) / TOOLS.length;

  const categoryStats = CATEGORIES.map((cat) => {
    const tools = TOOLS.filter((t) => t.categorySlug === cat.slug);
    return {
      slug: cat.slug,
      name: cat.name,
      toolCount: tools.length,
      avgRating: tools.length > 0
        ? tools.reduce((sum, t) => sum + t.rating, 0) / tools.length
        : 0,
      totalViews: tools.reduce((sum, t) => sum + t.viewCount, 0),
    };
  });

  return NextResponse.json({
    success: true,
    overview: {
      totalTools,
      totalCategories: CATEGORIES.length,
      totalViews,
      totalClicks,
      totalBookmarks,
      totalReviews,
      avgRating: parseFloat(avgRating.toFixed(2)),
      ctr: parseFloat(((totalClicks / totalViews) * 100).toFixed(2)),
    },
    categories: categoryStats,
    generatedAt: new Date().toISOString(),
  });
}
