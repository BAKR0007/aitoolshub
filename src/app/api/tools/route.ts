import { NextRequest, NextResponse } from "next/server";
import { TOOLS } from "@/lib/data";

// GET /api/tools — List all tools with optional filtering & pagination
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.toLowerCase() ?? "";
  const category = searchParams.get("category");
  const pricing = searchParams.get("pricing");
  const sort = searchParams.get("sort") ?? "popular";
  const page = parseInt(searchParams.get("page") ?? "1");
  const limit = parseInt(searchParams.get("limit") ?? "20");

  let results = [...TOOLS];

  if (q) {
    results = results.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.tagline.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  }

  if (category && category !== "all") {
    results = results.filter((t) => t.categorySlug === category);
  }

  if (pricing) {
    results = results.filter((t) => t.pricingType === pricing);
  }

  switch (sort) {
    case "rated":
      results.sort((a, b) => b.rating - a.rating);
      break;
    case "newest":
      results.sort((a, b) => new Date(b.launchedAt).getTime() - new Date(a.launchedAt).getTime());
      break;
    case "popular":
    default:
      results.sort((a, b) => b.viewCount - a.viewCount);
  }

  const total = results.length;
  const start = (page - 1) * limit;
  const paginated = results.slice(start, start + limit);

  return NextResponse.json({
    success: true,
    data: paginated,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasMore: start + limit < total,
    },
  });
}
