"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Package,
  BarChart3,
  Users,
  ScrollText,
  Flag,
  TrendingUp,
  DollarSign,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Search,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useI18n } from "@/lib/i18n";
import { TOOLS } from "@/lib/data";
import { cn } from "@/lib/utils";

export function AdminDashboard() {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState("tools");

  const stats = [
    { label: t("adminDashboard.totalTools"), value: 100342, delta: "+234", icon: Package, color: "violet" },
    { label: t("adminDashboard.totalUsers"), value: 2341892, delta: "+8.2K", icon: Users, color: "blue" },
    { label: t("adminDashboard.mrr"), value: 48230, delta: "+12.4%", icon: DollarSign, color: "emerald", isCurrency: true },
    { label: t("adminDashboard.pendingReviews"), value: 47, delta: "+8", icon: Flag, color: "amber" },
  ];

  // Tools data
  const tools = TOOLS.slice(0, 6);

  // Moderation queue
  const moderationQueue = [
    { id: 1, type: "Tool Submission", target: "AIVideoGen Pro", reporter: "System", reason: "Pending verification", date: "2h ago", severity: "medium" },
    { id: 2, type: "User Report", target: "Midjourney", reporter: "user_8234", reason: "Broken affiliate link", date: "4h ago", severity: "low" },
    { id: 3, type: "Edit Review", target: "ChatGPT", reporter: "user_1203", reason: "Updated pricing info", date: "5h ago", severity: "low" },
    { id: 4, type: "Spam Report", target: "FreeAIWriter", reporter: "user_9912", reason: "Suspicious affiliate links", date: "8h ago", severity: "high" },
    { id: 5, type: "Ownership Claim", target: "Claude", reporter: "anthropic_team", reason: "Verified domain ownership", date: "1d ago", severity: "medium" },
  ];

  // Recent users
  const recentUsers = [
    { id: 1, name: "Sarah Chen", email: "sarah.chen@example.com", role: "USER", joined: "2h ago", status: "ACTIVE" },
    { id: 2, name: "Marcus Rodriguez", email: "marcus.r@example.com", role: "PRO", joined: "5h ago", status: "ACTIVE" },
    { id: 3, name: "Emily Watson", email: "emily.w@example.com", role: "EDITOR", joined: "8h ago", status: "ACTIVE" },
    { id: 4, name: "David Kim", email: "david.kim@example.com", role: "USER", joined: "1d ago", status: "ACTIVE" },
    { id: 5, name: "Lisa Park", email: "lisa.park@example.com", role: "BUSINESS", joined: "2d ago", status: "ACTIVE" },
  ];

  // Audit logs
  const auditLogs = [
    { id: 1, action: "TOOL_PUBLISHED", entity: "AIVideoGen Pro", user: "admin@aitoolshub.com", ip: "192.168.1.1", time: "2 min ago" },
    { id: 2, action: "USER_BANNED", entity: "user_8234", user: "moderator@aitoolshub.com", ip: "192.168.1.2", time: "15 min ago" },
    { id: 3, action: "TOOL_FEATURED", entity: "ChatGPT", user: "admin@aitoolshub.com", ip: "192.168.1.1", time: "1 hour ago" },
    { id: 4, action: "PRICING_UPDATED", entity: "Pro Plan", user: "admin@aitoolshub.com", ip: "192.168.1.1", time: "2 hours ago" },
    { id: 5, action: "REPORT_RESOLVED", entity: "Report #2341", user: "moderator@aitoolshub.com", ip: "192.168.1.2", time: "3 hours ago" },
  ];

  // Revenue chart data
  const revenueData = [
    { month: "Jan", value: 28400 },
    { month: "Feb", value: 32100 },
    { month: "Mar", value: 35800 },
    { month: "Apr", value: 38900 },
    { month: "May", value: 42300 },
    { month: "Jun", value: 48230 },
  ];
  const maxRevenue = Math.max(...revenueData.map((d) => d.value));

  // Traffic sources
  const trafficSources = [
    { source: "Organic Search", visits: 1240000, percent: 52 },
    { source: "Direct", visits: 480000, percent: 20 },
    { source: "Social Media", visits: 360000, percent: 15 },
    { source: "Referral", visits: 192000, percent: 8 },
    { source: "Email", visits: 120000, percent: 5 },
  ];

  const severityColors = {
    low: "border-blue-500/30 bg-blue-500/10 text-blue-500",
    medium: "border-amber-500/30 bg-amber-500/10 text-amber-500",
    high: "border-rose-500/30 bg-rose-500/10 text-rose-500",
  };

  return (
    <section id="admin-dashboard" className="py-16 md:py-24 scroll-mt-16">
      <div className="container mx-auto max-w-7xl px-4 lg:px-6">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-5 h-5 text-primary" />
            <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">
              Admin Dashboard
            </Badge>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            {t("adminDashboard.title")}
          </h2>
          <p className="text-muted-foreground">{t("adminDashboard.subtitle")}</p>
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
                <div className="flex items-start justify-between mb-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <stat.icon className="w-4 h-4" />
                  </div>
                  <Badge variant="outline" className="text-[10px] py-0 border-emerald-500/30 bg-emerald-500/10 text-emerald-500">
                    <TrendingUp className="w-2.5 h-2.5 mr-0.5" />
                    {stat.delta}
                  </Badge>
                </div>
                <div className="text-2xl font-bold">
                  {stat.isCurrency && "$"}
                  {stat.value.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
              </Card>
            </motion.div>
          ))}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start overflow-x-auto no-scrollbar mb-6">
            <TabsTrigger value="tools">
              <Package className="w-4 h-4 mr-2" />
              {t("adminDashboard.tools")}
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <BarChart3 className="w-4 h-4 mr-2" />
              {t("adminDashboard.analytics")}
            </TabsTrigger>
            <TabsTrigger value="moderation">
              <Flag className="w-4 h-4 mr-2" />
              {t("adminDashboard.moderation")}
            </TabsTrigger>
            <TabsTrigger value="users">
              <Users className="w-4 h-4 mr-2" />
              {t("adminDashboard.users")}
            </TabsTrigger>
            <TabsTrigger value="auditLogs">
              <ScrollText className="w-4 h-4 mr-2" />
              {t("adminDashboard.auditLogs")}
            </TabsTrigger>
          </TabsList>

          {/* Tools tab */}
          <TabsContent value="tools">
            <Card className="overflow-hidden p-0">
              <div className="p-4 border-b border-border flex items-center gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search tools..." className="pl-9 h-9" />
                </div>
                <Button size="sm">
                  <Package className="w-4 h-4 mr-1.5" />
                  Add Tool
                </Button>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tool</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Views</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tools.map((tool) => (
                      <TableRow key={tool.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div
                              className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center overflow-hidden shrink-0"
                              style={{
                                backgroundImage: tool.logoUrl ? `url(${tool.logoUrl})` : undefined,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                              }}
                            >
                              {!tool.logoUrl && (
                                <span className="text-xs font-bold text-muted-foreground">
                                  {tool.name.charAt(0)}
                                </span>
                              )}
                            </div>
                            <div>
                              <div className="font-medium text-sm flex items-center gap-1.5">
                                {tool.name}
                                {tool.verified && <CheckCircle2 className="w-3 h-3 text-emerald-500" />}
                              </div>
                              <div className="text-xs text-muted-foreground">{tool.tagline}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs capitalize">
                            {tool.categorySlug}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs border-emerald-500/30 bg-emerald-500/10 text-emerald-500">
                            Published
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm flex items-center gap-1">
                            {tool.rating.toFixed(1)}
                            <span className="text-xs text-muted-foreground">
                              ({tool.reviewCount.toLocaleString()})
                            </span>
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">{(tool.viewCount / 1000).toFixed(0)}K</span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>

          {/* Analytics tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Revenue chart */}
              <Card className="p-5 lg:col-span-2">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-semibold text-sm">Revenue (MRR)</h3>
                    <p className="text-xs text-muted-foreground">Last 6 months</p>
                  </div>
                  <Badge variant="outline" className="border-emerald-500/30 bg-emerald-500/10 text-emerald-500">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +12.4%
                  </Badge>
                </div>
                <div className="flex items-end justify-between gap-3 h-48">
                  {revenueData.map((d) => (
                    <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
                      <div
                        className="w-full max-w-[50px] bg-gradient-to-t from-primary/80 to-primary rounded-t-md relative group transition-all hover:from-primary hover:to-primary"
                        style={{ height: `${(d.value / maxRevenue) * 100}%` }}
                      >
                        <div className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-card border border-border text-xs px-2 py-1 rounded shadow-md whitespace-nowrap">
                          ${(d.value / 1000).toFixed(1)}K
                        </div>
                      </div>
                      <span className="text-[10px] text-muted-foreground">{d.month}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Traffic sources */}
              <Card className="p-5">
                <h3 className="font-semibold text-sm mb-4">Traffic Sources</h3>
                <div className="space-y-3">
                  {trafficSources.map((src) => (
                    <div key={src.source}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-muted-foreground">{src.source}</span>
                        <span className="text-xs font-medium">{src.percent}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${src.percent}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Geo analytics */}
            <Card className="p-5">
              <h3 className="font-semibold text-sm mb-4">Top Countries</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { country: "🇺🇸 USA", visits: "412K", percent: 32 },
                  { country: "🇬🇧 UK", visits: "184K", percent: 14 },
                  { country: "🇮🇳 India", visits: "156K", percent: 12 },
                  { country: "🇩🇪 Germany", visits: "98K", percent: 8 },
                  { country: "🇨🇦 Canada", visits: "87K", percent: 7 },
                  { country: "🇫🇷 France", visits: "72K", percent: 6 },
                  { country: "🇦🇺 Australia", visits: "65K", percent: 5 },
                  { country: "🇯🇵 Japan", visits: "54K", percent: 4 },
                ].map((c) => (
                  <div key={c.country} className="flex items-center justify-between p-3 rounded-lg border bg-card">
                    <div>
                      <div className="text-sm font-medium">{c.country}</div>
                      <div className="text-xs text-muted-foreground">{c.visits} visits</div>
                    </div>
                    <div className="text-sm font-semibold text-primary">{c.percent}%</div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Moderation tab */}
          <TabsContent value="moderation">
            <Card className="p-0 overflow-hidden">
              <div className="p-4 border-b border-border">
                <h3 className="font-semibold text-sm flex items-center gap-2">
                  <Flag className="w-4 h-4" />
                  Moderation Queue
                  <Badge variant="secondary" className="ml-1">{moderationQueue.length}</Badge>
                </h3>
              </div>
              <div className="divide-y divide-border">
                {moderationQueue.map((item) => (
                  <div key={item.id} className="p-4 flex items-start gap-3 hover:bg-muted/30 transition-colors">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className={cn("text-[10px] py-0", severityColors[item.severity as keyof typeof severityColors])}>
                          {item.severity}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{item.type}</span>
                        <span className="text-xs text-muted-foreground">·</span>
                        <span className="text-xs text-muted-foreground">{item.date}</span>
                      </div>
                      <div className="font-medium text-sm">{item.target}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        by {item.reporter} — {item.reason}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button size="sm" variant="outline" className="h-7 text-xs">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Approve
                      </Button>
                      <Button size="sm" variant="ghost" className="h-7 text-xs text-rose-500 hover:text-rose-600">
                        <XCircle className="w-3 h-3 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Users tab */}
          <TabsContent value="users">
            <Card className="overflow-hidden p-0">
              <div className="p-4 border-b border-border flex items-center gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search users..." className="pl-9 h-9" />
                </div>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white text-xs font-semibold">
                              {user.name.split(" ").map((n) => n[0]).join("")}
                            </div>
                            <div>
                              <div className="font-medium text-sm">{user.name}</div>
                              <div className="text-xs text-muted-foreground">{user.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={cn(
                              "text-xs",
                              user.role === "ADMIN" && "border-rose-500/30 bg-rose-500/10 text-rose-500",
                              user.role === "EDITOR" && "border-violet-500/30 bg-violet-500/10 text-violet-500",
                              user.role === "PRO" && "border-emerald-500/30 bg-emerald-500/10 text-emerald-500",
                              user.role === "BUSINESS" && "border-blue-500/30 bg-blue-500/10 text-blue-500"
                            )}
                          >
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {user.joined}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs border-emerald-500/30 bg-emerald-500/10 text-emerald-500">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1" />
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>

          {/* Audit logs tab */}
          <TabsContent value="auditLogs">
            <Card className="p-0 overflow-hidden">
              <div className="p-4 border-b border-border">
                <h3 className="font-semibold text-sm flex items-center gap-2">
                  <ScrollText className="w-4 h-4" />
                  Audit Logs
                </h3>
              </div>
              <div className="divide-y divide-border">
                {auditLogs.map((log) => (
                  <div key={log.id} className="p-4 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                      {log.action.includes("PUBLISHED") && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                      {log.action.includes("BANNED") && <XCircle className="w-4 h-4 text-rose-500" />}
                      {log.action.includes("UPDATED") && <AlertTriangle className="w-4 h-4 text-amber-500" />}
                      {!log.action.includes("PUBLISHED") && !log.action.includes("BANNED") && !log.action.includes("UPDATED") && (
                        <ScrollText className="w-4 h-4 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-medium">{log.action}</span>
                        <span className="text-sm text-muted-foreground">→</span>
                        <span className="text-sm font-medium">{log.entity}</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        by {log.user} · IP: {log.ip} · {log.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
