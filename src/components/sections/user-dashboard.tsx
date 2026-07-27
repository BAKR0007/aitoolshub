"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Bookmark,
  FolderKanban,
  Star,
  BarChart3,
  TrendingUp,
  Eye,
  MousePointerClick,
  Plus,
  ExternalLink,
  Activity,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StarRating } from "@/components/shared/star-rating";
import { ToolCard, pricingLabel } from "@/components/shared/tool-card";
import { useI18n } from "@/lib/i18n";
import { useAppStore } from "@/lib/store";
import { TOOLS, REVIEWS, type Tool } from "@/lib/data";
import { cn } from "@/lib/utils";

type UserDashboardProps = {
  onViewTool?: (tool: Tool) => void;
};

export function UserDashboard({ onViewTool }: UserDashboardProps) {
  const { t } = useI18n();
  const { bookmarkedToolIds } = useAppStore();
  const [activeTab, setActiveTab] = useState("overview");

  const bookmarkedTools = bookmarkedToolIds
    .map((id) => TOOLS.find((tool) => tool.id === id))
    .filter((t): t is Tool => Boolean(t));

  const userReviews = REVIEWS.slice(0, 4);

  const stats = [
    { label: t("userDashboard.totalBookmarks"), value: bookmarkedTools.length, icon: Bookmark, color: "violet" },
    { label: t("userDashboard.totalCollections"), value: 5, icon: FolderKanban, color: "blue" },
    { label: t("userDashboard.totalReviews"), value: 23, icon: Star, color: "amber" },
    { label: "Profile Views", value: 1242, icon: Eye, color: "emerald" },
  ];

  const recentActivity = [
    { action: "Bookmarked", target: "ChatGPT", time: "2 hours ago", icon: Bookmark },
    { action: "Reviewed", target: "Midjourney", time: "5 hours ago", icon: Star },
    { action: "Added to collection", target: "AI Essentials", time: "1 day ago", icon: FolderKanban },
    { action: "Compared", target: "Claude vs ChatGPT", time: "2 days ago", icon: BarChart3 },
    { action: "Bookmarked", target: "ElevenLabs", time: "3 days ago", icon: Bookmark },
  ];

  const collections = [
    { name: "AI Essentials", count: 12, isPublic: true, gradient: "from-violet-500 to-fuchsia-500" },
    { name: "Marketing Stack", count: 8, isPublic: true, gradient: "from-blue-500 to-cyan-500" },
    { name: "Dev Tools", count: 15, isPublic: false, gradient: "from-emerald-500 to-teal-500" },
    { name: "Content Creation", count: 6, isPublic: true, gradient: "from-amber-500 to-orange-500" },
  ];

  // Analytics data (would be from API in production)
  const analyticsData = [
    { label: "January", views: 4200, clicks: 320 },
    { label: "February", views: 5100, clicks: 410 },
    { label: "March", views: 6800, clicks: 520 },
    { label: "April", views: 8200, clicks: 680 },
    { label: "May", views: 9500, clicks: 820 },
    { label: "June", views: 12400, clicks: 1050 },
  ];

  const maxViews = Math.max(...analyticsData.map((d) => d.views));

  return (
    <section id="user-dashboard" className="py-16 md:py-24 scroll-mt-16 bg-card/30">
      <div className="container mx-auto max-w-7xl px-4 lg:px-6">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <LayoutDashboard className="w-5 h-5 text-primary" />
            <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">
              User Dashboard
            </Badge>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            {t("userDashboard.title")}
          </h2>
          <p className="text-muted-foreground">{t("userDashboard.subtitle")}</p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="p-5">
                <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center mb-3 bg-primary/10 text-primary")}>
                  <stat.icon className="w-4 h-4" />
                </div>
                <div className="text-2xl font-bold">{stat.value.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
              </Card>
            </motion.div>
          ))}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start overflow-x-auto no-scrollbar mb-6">
            <TabsTrigger value="overview">
              <Activity className="w-4 h-4 mr-2" />
              {t("userDashboard.overview")}
            </TabsTrigger>
            <TabsTrigger value="bookmarks">
              <Bookmark className="w-4 h-4 mr-2" />
              {t("userDashboard.bookmarks")}
            </TabsTrigger>
            <TabsTrigger value="collections">
              <FolderKanban className="w-4 h-4 mr-2" />
              {t("userDashboard.collections")}
            </TabsTrigger>
            <TabsTrigger value="reviews">
              <Star className="w-4 h-4 mr-2" />
              {t("userDashboard.reviews")}
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <BarChart3 className="w-4 h-4 mr-2" />
              {t("userDashboard.analytics")}
            </TabsTrigger>
          </TabsList>

          {/* Overview */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent activity */}
              <Card className="p-5 lg:col-span-2">
                <h3 className="font-semibold text-sm mb-4 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {t("userDashboard.recentActivity")}
                </h3>
                <div className="space-y-3">
                  {recentActivity.map((activity, i) => (
                    <div key={i} className="flex items-center gap-3 py-2 border-b border-border/50 last:border-0">
                      <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                        <activity.icon className="w-3.5 h-3.5 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">
                          <span className="text-muted-foreground">{activity.action}</span>{" "}
                          <span className="font-medium">{activity.target}</span>
                        </p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Quick stats */}
              <Card className="p-5">
                <h3 className="font-semibold text-sm mb-4">This Month</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">Profile Views</span>
                      <span className="text-sm font-medium flex items-center gap-1">
                        <TrendingUp className="w-3 h-3 text-emerald-500" />
                        +24%
                      </span>
                    </div>
                    <div className="text-2xl font-bold">1,242</div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">Bookmarks Gained</span>
                      <span className="text-sm font-medium flex items-center gap-1">
                        <TrendingUp className="w-3 h-3 text-emerald-500" />
                        +12%
                      </span>
                    </div>
                    <div className="text-2xl font-bold">87</div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">Reviews Posted</span>
                      <span className="text-sm font-medium flex items-center gap-1">
                        <TrendingUp className="w-3 h-3 text-emerald-500" />
                        +5
                      </span>
                    </div>
                    <div className="text-2xl font-bold">23</div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Bookmarks */}
          <TabsContent value="bookmarks">
            {bookmarkedTools.length === 0 ? (
              <Card className="p-12 text-center">
                <Bookmark className="w-10 h-10 text-muted-foreground/50 mx-auto mb-3" />
                <p className="text-muted-foreground">No bookmarks yet. Start saving tools!</p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {bookmarkedTools.map((tool, i) => (
                  <ToolCard key={tool.id} tool={tool} onView={onViewTool} index={i} />
                ))}
              </div>
            )}
          </TabsContent>

          {/* Collections */}
          <TabsContent value="collections">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">{collections.length} collections</p>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-1.5" />
                New Collection
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {collections.map((col, i) => (
                <motion.div
                  key={col.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card className="overflow-hidden cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all">
                    <div className={cn("h-24 bg-gradient-to-br relative", col.gradient)}>
                      <div className="absolute inset-0 bg-grid opacity-20" />
                      <FolderKanban className="absolute bottom-3 right-3 w-8 h-8 text-white/80" />
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="font-semibold text-sm truncate">{col.name}</h4>
                        <Badge variant="outline" className="text-[10px] py-0 shrink-0">
                          {col.isPublic ? "Public" : "Private"}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{col.count} tools</p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Reviews */}
          <TabsContent value="reviews">
            <div className="space-y-3">
              {userReviews.map((review) => {
                const tool = TOOLS.find((t) => t.id === review.toolId);
                return (
                  <Card key={review.id} className="p-4">
                    <div className="flex items-start gap-3">
                      {tool && (
                        <button
                          onClick={() => onViewTool?.(tool)}
                          className="flex items-center gap-3 text-left shrink-0"
                        >
                          <div
                            className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center overflow-hidden"
                            style={{
                              backgroundImage: tool.logoUrl ? `url(${tool.logoUrl})` : undefined,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                            }}
                          >
                            {!tool.logoUrl && (
                              <span className="text-sm font-bold text-muted-foreground">
                                {tool.name.charAt(0)}
                              </span>
                            )}
                          </div>
                          <div>
                            <div className="font-medium text-sm hover:text-primary">{tool.name}</div>
                            <div className="text-xs text-muted-foreground">{pricingLabel(tool, t)}</div>
                          </div>
                        </button>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <StarRating rating={review.rating} size={12} showValue={false} />
                          <span className="text-xs text-muted-foreground">{review.createdAt}</span>
                        </div>
                        <h4 className="font-medium text-sm">{review.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{review.content}</p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="p-5 lg:col-span-2">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-semibold text-sm">Activity Over Time</h3>
                    <p className="text-xs text-muted-foreground">Last 6 months</p>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      Views
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      Clicks
                    </div>
                  </div>
                </div>
                {/* Simple bar chart */}
                <div className="flex items-end justify-between gap-2 h-48">
                  {analyticsData.map((d) => (
                    <div key={d.label} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full flex flex-col gap-1 items-center justify-end h-full">
                        <div
                          className="w-full max-w-[40px] bg-primary/20 rounded-t-md relative group"
                          style={{ height: `${(d.clicks / maxViews) * 100}%` }}
                        >
                          <div className="absolute inset-0 bg-emerald-500/30 rounded-t-md" style={{ height: "100%" }} />
                        </div>
                        <div
                          className="w-full max-w-[40px] bg-primary rounded-t-md"
                          style={{ height: `${(d.views / maxViews) * 100}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-muted-foreground">{d.label.slice(0, 3)}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-5">
                <h3 className="font-semibold text-sm mb-4">Top Categories</h3>
                <div className="space-y-3">
                  {[
                    { name: "Chatbots", percent: 35, color: "bg-violet-500" },
                    { name: "Image Gen", percent: 28, color: "bg-pink-500" },
                    { name: "Writing", percent: 18, color: "bg-blue-500" },
                    { name: "Code", percent: 12, color: "bg-emerald-500" },
                    { name: "Other", percent: 7, color: "bg-amber-500" },
                  ].map((cat) => (
                    <div key={cat.name}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-muted-foreground">{cat.name}</span>
                        <span className="text-xs font-medium">{cat.percent}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div className={cn("h-full rounded-full", cat.color)} style={{ width: `${cat.percent}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
