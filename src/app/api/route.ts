import { NextResponse } from "next/server";

// GET /api — API root with available endpoints overview (OpenAPI-style)
export async function GET() {
  return NextResponse.json({
    name: "AIToolsHub API",
    version: "1.0.0",
    description: "Enterprise-grade AI Tools Directory SaaS API",
    baseUrl: "/api",
    endpoints: {
      tools: {
        "GET /api/tools": "List all AI tools with filtering & pagination",
        "GET /api/tools/:slug": "Get a specific tool by slug",
      },
      categories: {
        "GET /api/categories": "List all tool categories",
      },
      search: {
        "GET /api/search?q=": "AI-powered semantic search across tools",
      },
      stats: {
        "GET /api/stats": "Platform-wide statistics for dashboards",
      },
      auth: {
        "POST /api/auth/signup": "Create a new account",
        "POST /api/auth/signin": "Sign in with email/password",
        "POST /api/auth/signout": "Sign out",
        "POST /api/auth/refresh": "Refresh access token",
      },
      user: {
        "GET /api/user/bookmarks": "Get user's bookmarked tools",
        "POST /api/user/bookmarks/:toolId": "Bookmark a tool",
        "DELETE /api/user/bookmarks/:toolId": "Remove bookmark",
        "GET /api/user/collections": "Get user's collections",
        "GET /api/user/reviews": "Get user's reviews",
      },
    },
    authentication: "Bearer token via Authorization header",
    rateLimits: {
      free: "100 requests/hour",
      pro: "10000 requests/month",
      business: "100000 requests/month",
      enterprise: "Unlimited",
    },
    documentation: "/api/docs",
  });
}
