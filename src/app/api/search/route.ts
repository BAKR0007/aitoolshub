import { NextRequest, NextResponse } from "next/server";
import { TOOLS, CATEGORIES } from "@/lib/data";

// GET /api/search — AI-powered semantic search across tools and categories
// In production, this would call an embeddings model (e.g., via z-ai-web-dev-sdk)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.toLowerCase() ?? "";

  if (!q) {
    return NextResponse.json({
      success: false,
      error: "Query parameter 'q' is required",
    }, { status: 400 });
  }

  // Compute relevance score (simple TF-IDF-like heuristic for demo)
  const scoredTools = TOOLS.map((tool) => {
    let score = 0;
    const haystack = (
      tool.name + " " +
      tool.tagline + " " +
      tool.description + " " +
      tool.tags.join(" ")
    ).toLowerCase();

    // Exact name match: highest score
    if (tool.name.toLowerCase().includes(q)) score += 100;

    // Tagline match
    if (tool.tagline.toLowerCase().includes(q)) score += 50;

    // Tag matches
    tool.tags.forEach((tag) => {
      if (tag.toLowerCase().includes(q)) score += 30;
    });

    // Full-text match
    const qWords = q.split(/\s+/);
    qWords.forEach((word) => {
      if (haystack.includes(word)) score += 10;
    });

    // Boost by popularity
    score += Math.log(tool.viewCount + 1) * 0.1;

    return { ...tool, _score: score };
  })
    .filter((t) => t._score > 0)
    .sort((a, b) => b._score - a._score)
    .slice(0, 10);

  const scoredCategories = CATEGORIES.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q)
  ).slice(0, 5);

  return NextResponse.json({
    success: true,
    query: q,
    tools: scoredTools,
    categories: scoredCategories,
    totalResults: scoredTools.length + scoredCategories.length,
  });
}
