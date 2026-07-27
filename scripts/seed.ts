/**
 * Seed script for AI Tools Directory
 * Run: `bun run scripts/seed.ts`
 *
 * Seeds the database with categories, AI tools, reviews, pricing plans,
 * and a sample admin user. Uses the centralized mock data from src/lib/data.ts.
 */

import { db } from "../src/lib/db";

async function main() {
  console.log("🌱 Seeding AI Tools Directory database...");

  // Wipe existing data (idempotent re-seed)
  console.log("  → Cleaning existing data...");
  await db.analyticsEvent.deleteMany();
  await db.bookmark.deleteMany();
  await db.review.deleteMany();
  await db.pricingPlan.deleteMany();
  await db.notification.deleteMany();
  await db.report.deleteMany();
  await db.pendingEdit.deleteMany();
  await db.auditLog.deleteMany();
  await db.subscription.deleteMany();
  await db.tool.deleteMany();
  await db.tag.deleteMany();
  await db.category.deleteMany();
  await db.user.deleteMany();

  // 1. Create admin + test users (so reviews don't violate unique constraint)
  console.log("  → Creating users...");
  const admin = await db.user.create({
    data: {
      email: "admin@aitoolshub.com",
      name: "Admin User",
      role: "ADMIN",
      status: "ACTIVE",
      emailVerifiedAt: new Date(),
    },
  });
  const reviewer1 = await db.user.create({
    data: { email: "sarah@example.com", name: "Sarah Chen", role: "USER", status: "ACTIVE" },
  });
  const reviewer2 = await db.user.create({
    data: { email: "marcus@example.com", name: "Marcus Rodriguez", role: "USER", status: "ACTIVE" },
  });
  const reviewer3 = await db.user.create({
    data: { email: "emily@example.com", name: "Emily Watson", role: "USER", status: "ACTIVE" },
  });

  // 2. Create categories
  console.log("  → Creating categories...");
  const categories = await Promise.all(
    [
      { slug: "writing", name: "Writing & Content", icon: "PenLine", color: "violet", isFeatured: true },
      { slug: "image", name: "Image Generation", icon: "ImageIcon", color: "pink", isFeatured: true },
      { slug: "video", name: "Video & Animation", icon: "Video", color: "rose", isFeatured: true },
      { slug: "code", name: "Code & Development", icon: "Code2", color: "emerald", isFeatured: true },
      { slug: "chat", name: "Chatbots & Assistants", icon: "MessageSquare", color: "blue", isFeatured: true },
      { slug: "audio", name: "Audio & Music", icon: "Music", color: "amber", isFeatured: true },
      { slug: "productivity", name: "Productivity", icon: "Zap", color: "orange", isFeatured: true },
      { slug: "marketing", name: "Marketing & SEO", icon: "TrendingUp", color: "green", isFeatured: true },
      { slug: "design", name: "Design & UX", icon: "Palette", color: "purple", isFeatured: true },
      { slug: "data", name: "Data & Analytics", icon: "BarChart3", color: "cyan", isFeatured: true },
      { slug: "research", name: "Research & Education", icon: "GraduationCap", color: "teal", isFeatured: false },
      { slug: "business", name: "Business & Operations", icon: "Briefcase", color: "slate", isFeatured: false },
    ].map((c) =>
      db.category.create({
        data: {
          ...c,
          description: `AI tools for ${c.name.toLowerCase()}`,
        },
      })
    )
  );
  console.log(`    ✓ Created ${categories.length} categories`);

  // 3. Create tags
  console.log("  → Creating tags...");
  const tagSet = new Set<string>();
  const tagList = [
    "OpenAI", "GPT-4", "Assistant", "Multimodal", "AI Art", "Image Generation",
    "Discord", "Anthropic", "Claude 3", "Long Context", "Analysis",
    "GitHub", "Code Completion", "IDE", "Video Generation", "Gen-2", "AI Editing",
    "Marketing", "Copywriting", "Brand Voice", "Voice Cloning", "TTS", "Multilingual",
    "Search", "Citations", "Real-time", "Notion", "Writing", "Productivity",
    "Open Source", "Self-hosted", "SDXL", "ControlNet", "Video Avatars", "Corporate",
    "Grammar", "Style", "Tone Detection",
  ];
  const tags = await Promise.all(
    tagList.map((name) =>
      db.tag.create({
        data: { slug: name.toLowerCase().replace(/\s+/g, "-"), name },
      })
    )
  );
  console.log(`    ✓ Created ${tags.length} tags`);

  // 4. Create AI tools (12 tools)
  console.log("  → Creating AI tools...");
  const toolsData = [
    {
      slug: "chatgpt",
      name: "ChatGPT",
      tagline: "Conversational AI assistant by OpenAI",
      description: "Advanced AI chatbot capable of natural conversations, code generation, analysis, and more.",
      websiteUrl: "https://chat.openai.com",
      pricingType: "FREEMIUM",
      startingPrice: 20,
      rating: 4.8,
      reviewCount: 12453,
      viewCount: 8942341,
      clickCount: 2341892,
      bookmarkCount: 89234,
      featured: true,
      verified: true,
      categorySlug: "chat",
      tagSlugs: ["OpenAI", "GPT-4", "Assistant", "Multimodal"],
    },
    {
      slug: "midjourney",
      name: "Midjourney",
      tagline: "AI image generation with artistic flair",
      description: "Create stunning AI-generated artwork from text prompts with unique artistic styles.",
      websiteUrl: "https://midjourney.com",
      pricingType: "PAID",
      startingPrice: 10,
      rating: 4.7,
      reviewCount: 8923,
      viewCount: 5621893,
      clickCount: 1782341,
      bookmarkCount: 67123,
      featured: true,
      verified: true,
      categorySlug: "image",
      tagSlugs: ["AI Art", "Image Generation", "Discord"],
    },
    {
      slug: "claude",
      name: "Claude",
      tagline: "AI assistant by Anthropic",
      description: "Helpful, harmless, and honest AI assistant for writing, analysis, and coding.",
      websiteUrl: "https://claude.ai",
      pricingType: "FREEMIUM",
      startingPrice: 20,
      rating: 4.9,
      reviewCount: 5234,
      viewCount: 3412893,
      clickCount: 923481,
      bookmarkCount: 45213,
      featured: true,
      verified: true,
      categorySlug: "chat",
      tagSlugs: ["Anthropic", "Claude 3", "Long Context", "Analysis"],
    },
    {
      slug: "github-copilot",
      name: "GitHub Copilot",
      tagline: "Your AI pair programmer",
      description: "AI-powered code completion and generation directly in your editor.",
      websiteUrl: "https://github.com/features/copilot",
      pricingType: "PAID",
      startingPrice: 10,
      rating: 4.6,
      reviewCount: 6789,
      viewCount: 4231892,
      clickCount: 1234892,
      bookmarkCount: 52341,
      featured: true,
      verified: true,
      categorySlug: "code",
      tagSlugs: ["GitHub", "Code Completion", "IDE"],
    },
    {
      slug: "runway",
      name: "Runway",
      tagline: "AI video generation and editing",
      description: "Create stunning videos with text-to-video, image-to-video, and AI editing tools.",
      websiteUrl: "https://runwayml.com",
      pricingType: "FREEMIUM",
      startingPrice: 15,
      rating: 4.5,
      reviewCount: 3421,
      viewCount: 2341892,
      clickCount: 623481,
      bookmarkCount: 34213,
      featured: true,
      sponsored: true,
      verified: true,
      categorySlug: "video",
      tagSlugs: ["Video Generation", "Gen-2", "AI Editing"],
    },
    {
      slug: "jasper",
      name: "Jasper",
      tagline: "AI content platform for marketing teams",
      description: "Enterprise-grade AI writing assistant for marketing and content creation.",
      websiteUrl: "https://jasper.ai",
      pricingType: "PAID",
      startingPrice: 39,
      rating: 4.4,
      reviewCount: 4521,
      viewCount: 1842934,
      clickCount: 523481,
      bookmarkCount: 28413,
      featured: false,
      sponsored: true,
      verified: true,
      categorySlug: "writing",
      tagSlugs: ["Marketing", "Copywriting", "Brand Voice"],
    },
    {
      slug: "elevenlabs",
      name: "ElevenLabs",
      tagline: "Realistic AI voice generation",
      description: "Generate lifelike voices, clone voices, and create audio content with AI.",
      websiteUrl: "https://elevenlabs.io",
      pricingType: "FREEMIUM",
      startingPrice: 5,
      rating: 4.7,
      reviewCount: 2841,
      viewCount: 1234892,
      clickCount: 423481,
      bookmarkCount: 23421,
      featured: true,
      verified: true,
      categorySlug: "audio",
      tagSlugs: ["Voice Cloning", "TTS", "Multilingual"],
    },
    {
      slug: "perplexity",
      name: "Perplexity",
      tagline: "AI-powered answer engine",
      description: "Get accurate, cited answers to any question with real-time web search.",
      websiteUrl: "https://perplexity.ai",
      pricingType: "FREEMIUM",
      startingPrice: 20,
      rating: 4.6,
      reviewCount: 3421,
      viewCount: 2341892,
      clickCount: 723481,
      bookmarkCount: 31203,
      featured: false,
      verified: true,
      categorySlug: "research",
      tagSlugs: ["Search", "Citations", "Real-time"],
    },
    {
      slug: "notion-ai",
      name: "Notion AI",
      tagline: "AI assistant built into Notion",
      description: "Write, summarize, translate, and brainstorm directly within your Notion workspace.",
      websiteUrl: "https://notion.so/product/ai",
      pricingType: "PAID",
      startingPrice: 10,
      rating: 4.5,
      reviewCount: 5621,
      viewCount: 3123941,
      clickCount: 892341,
      bookmarkCount: 41234,
      featured: false,
      verified: true,
      categorySlug: "productivity",
      tagSlugs: ["Notion", "Writing", "Productivity"],
    },
    {
      slug: "stable-diffusion",
      name: "Stable Diffusion",
      tagline: "Open-source AI image generation",
      description: "Generate high-quality images locally or via API with this open-source model.",
      websiteUrl: "https://stability.ai",
      pricingType: "FREE",
      startingPrice: 0,
      rating: 4.6,
      reviewCount: 7823,
      viewCount: 5621893,
      clickCount: 1348923,
      bookmarkCount: 67234,
      featured: true,
      verified: true,
      categorySlug: "image",
      tagSlugs: ["Open Source", "Self-hosted", "SDXL", "ControlNet"],
    },
    {
      slug: "synthesia",
      name: "Synthesia",
      tagline: "Create AI videos with avatars",
      description: "Generate professional videos with AI avatars in 120+ languages without a camera.",
      websiteUrl: "https://synthesia.io",
      pricingType: "PAID",
      startingPrice: 29,
      rating: 4.4,
      reviewCount: 2341,
      viewCount: 1234892,
      clickCount: 423481,
      bookmarkCount: 21342,
      featured: false,
      sponsored: true,
      verified: true,
      categorySlug: "video",
      tagSlugs: ["Video Avatars", "Multilingual", "Corporate"],
    },
    {
      slug: "grammarly",
      name: "Grammarly",
      tagline: "AI-powered writing assistant",
      description: "Improve your writing with AI-powered grammar, tone, and style suggestions.",
      websiteUrl: "https://grammarly.com",
      pricingType: "FREEMIUM",
      startingPrice: 12,
      rating: 4.5,
      reviewCount: 12341,
      viewCount: 8921341,
      clickCount: 2341892,
      bookmarkCount: 78234,
      featured: false,
      verified: true,
      categorySlug: "writing",
      tagSlugs: ["Grammar", "Style", "Tone Detection"],
    },
  ];

  for (const td of toolsData) {
    const category = categories.find((c) => c.slug === td.categorySlug)!;
    const toolTags = tags.filter((t) => td.tagSlugs.includes(t.name));

    await db.tool.create({
      data: {
        slug: td.slug,
        name: td.name,
        tagline: td.tagline,
        description: td.description,
        websiteUrl: td.websiteUrl,
        logoUrl: `https://api.dicebear.com/7.x/shapes/svg?seed=${td.slug}`,
        pricingType: td.pricingType as any,
        startingPrice: td.startingPrice,
        currency: "USD",
        freeTrial: td.pricingType === "FREEMIUM" || td.pricingType === "FREE_TRIAL",
        rating: td.rating,
        reviewCount: td.reviewCount,
        viewCount: td.viewCount,
        clickCount: td.clickCount,
        bookmarkCount: td.bookmarkCount,
        featured: td.featured,
        sponsored: td.sponsored ?? false,
        verified: td.verified,
        status: "PUBLISHED",
        launchedAt: new Date("2023-01-01"),
        approvedAt: new Date(),
        categoryId: category.id,
        tags: { connect: toolTags.map((t) => ({ id: t.id })) },
      },
    });
  }
  console.log(`    ✓ Created ${toolsData.length} AI tools`);

  // 5. Create sample reviews
  console.log("  → Creating sample reviews...");
  const chatgpt = await db.tool.findUnique({ where: { slug: "chatgpt" } });
  const midjourney = await db.tool.findUnique({ where: { slug: "midjourney" } });
  const claude = await db.tool.findUnique({ where: { slug: "claude" } });

  if (chatgpt && midjourney && claude) {
    await db.review.createMany({
      data: [
        { toolId: chatgpt.id, userId: reviewer1.id, rating: 5, title: "Indispensable for daily work", content: "ChatGPT has completely transformed how I approach problem-solving.", helpfulCount: 234, verified: true },
        { toolId: chatgpt.id, userId: reviewer2.id, rating: 4, title: "Powerful but pricey", content: "Incredible tool for coding and analysis.", helpfulCount: 156, verified: true },
        { toolId: midjourney.id, userId: reviewer3.id, rating: 5, title: "Best AI art generator", content: "Nothing comes close to Midjourney's artistic quality.", helpfulCount: 189, verified: true },
        { toolId: claude.id, userId: reviewer1.id, rating: 5, title: "Best AI for long documents", content: "Claude's 200K context window is unmatched.", helpfulCount: 142, verified: true },
        { toolId: claude.id, userId: reviewer2.id, rating: 4, title: "Excellent for analysis", content: "Great for analyzing long documents and writing nuanced content.", helpfulCount: 89, verified: true },
      ],
    });
    console.log("    ✓ Created 5 sample reviews");
  }

  // 6. Create sample notifications
  console.log("  → Creating sample notifications...");
  await db.notification.createMany({
    data: [
      { userId: admin.id, type: "WELCOME", title: "Welcome to AIToolsHub!", message: "Thanks for joining. Explore our directory of 100K+ AI tools." },
      { userId: admin.id, type: "BOOKMARK", title: "New bookmark", message: "You bookmarked ChatGPT" },
      { userId: admin.id, type: "REVIEW_REPLY", title: "Your review got a reply", message: "Someone responded to your review of Claude" },
    ],
  });
  console.log("    ✓ Created 3 sample notifications");

  // 7. Create sample audit log
  console.log("  → Creating audit log entry...");
  await db.auditLog.create({
    data: {
      userId: admin.id,
      action: "DATABASE_SEEDED",
      entityType: "SYSTEM",
      entityId: "database",
      metadata: JSON.stringify({ timestamp: new Date().toISOString() }),
    },
  });

  console.log("\n✅ Seed completed successfully!");
  console.log(`   • 4 users (1 admin + 3 reviewers)`);
  console.log(`   • ${categories.length} categories`);
  console.log(`   • ${tags.length} tags`);
  console.log(`   • ${toolsData.length} AI tools`);
  console.log(`   • 5 reviews, 3 notifications, 1 audit log`);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
