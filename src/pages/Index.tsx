
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Users, 
  MessageSquare, 
  Calendar,
  BookOpen,
  Brain,
  Video,
  BarChart3,
  Plus,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const kpis = [
    {
      title: "Revenue This Month",
      value: "$127k",
      change: "+18%",
      changeType: "positive" as const,
      icon: TrendingUp,
      description: "vs last month"
    },
    {
      title: "Active Meetings",
      value: "24",
      change: "+12%",
      changeType: "positive" as const,
      icon: Video,
      description: "This month"
    },
    {
      title: "Conversion Rate",
      value: "34%",
      change: "+5%",
      changeType: "positive" as const,
      icon: Users,
      description: "Lead to customer"
    },
    {
      title: "AI Suggestions Used",
      value: "1,247",
      change: "+8%",
      changeType: "positive" as const,
      icon: Brain,
      description: "This week"
    }
  ];

  const keyMetrics = [
    {
      title: "Deals Closed",
      value: "47",
      change: "+23%",
      icon: TrendingUp,
      description: "This quarter"
    },
    {
      title: "Pipeline Value",
      value: "$524k",
      change: "+15%",
      icon: BarChart3,
      description: "Active opportunities"
    },
    {
      title: "New Leads",
      value: "186",
      change: "+31%",
      icon: Users,
      description: "This week"
    }
  ];

  const recentActivity = [
    {
      type: "meeting",
      title: "Sales call with Acme Corp",
      time: "2 hours ago",
      status: "completed",
      aiSuggestions: 12
    },
    {
      type: "knowledge",
      title: "Updated product battlecard",
      time: "4 hours ago",
      status: "processed",
      aiSuggestions: 0
    },
    {
      type: "meeting",
      title: "Demo with TechStart Inc",
      time: "1 day ago",
      status: "completed",
      aiSuggestions: 8
    },
    {
      type: "ai-config",
      title: "Modified objection handling rules",
      time: "2 days ago",
      status: "active",
      aiSuggestions: 0
    }
  ];

  const quickActions = [
    {
      title: "Schedule Meeting",
      description: "Set up a new AI-assisted sales call",
      icon: Calendar,
      href: "/meetings",
      color: "bg-blue-500"
    },
    {
      title: "Upload Content",
      description: "Add new knowledge base materials",
      icon: BookOpen,
      href: "/knowledge-base",
      color: "bg-green-500"
    },
    {
      title: "Configure AI",
      description: "Adjust AI assistant settings",
      icon: Brain,
      href: "/ai-configuration",
      color: "bg-purple-500"
    },
    {
      title: "View Analytics",
      description: "Check performance metrics",
      icon: BarChart3,
      href: "/analytics",
      color: "bg-orange-500"
    }
  ];

  return (
    <div className="flex-1 space-y-8 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, John</h1>
          <p className="text-muted-foreground mt-1">
            Here's what's happening with your AI sales assistant today.
          </p>
        </div>
        <Button size="lg">
          <Plus className="mr-2 h-4 w-4" />
          New Meeting
        </Button>
      </div>

      {/* Main KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.title}</CardTitle>
                <kpi.icon className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-3xl font-bold mb-2">{kpi.value}</div>
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-green-600 font-medium">{kpi.change}</span>
                <span className="text-muted-foreground">{kpi.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Key Metrics Section */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold">Key Sales Metrics</h2>
          <p className="text-muted-foreground mt-1">Track your most important performance indicators</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {keyMetrics.map((metric, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-200">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-medium">{metric.title}</CardTitle>
                  <metric.icon className="h-6 w-6 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-3xl font-bold mb-2">{metric.value}</div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-600 font-medium">{metric.change}</span>
                  <span className="text-muted-foreground">{metric.description}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Quick Actions */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-xl">Quick Actions</CardTitle>
            <CardDescription>Jump to key features</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.href}
                className="flex items-center p-4 rounded-lg border hover:bg-muted/50 transition-colors group"
              >
                <div className={`p-3 rounded-lg ${action.color} mr-4`}>
                  <action.icon className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{action.title}</p>
                  <p className="text-sm text-muted-foreground">{action.description}</p>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              </Link>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl">Recent Activity</CardTitle>
            <CardDescription>Latest updates from your AI assistant</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className={`p-2 rounded-full ${
                    activity.type === 'meeting' ? 'bg-blue-100 text-blue-600' :
                    activity.type === 'knowledge' ? 'bg-green-100 text-green-600' :
                    'bg-purple-100 text-purple-600'
                  }`}>
                    {activity.type === 'meeting' ? <Video className="h-4 w-4" /> :
                     activity.type === 'knowledge' ? <BookOpen className="h-4 w-4" /> :
                     <Brain className="h-4 w-4" />}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="font-medium">{activity.title}</p>
                    <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                      <span>{activity.time}</span>
                      <Badge variant="secondary">
                        {activity.status}
                      </Badge>
                      {activity.aiSuggestions > 0 && (
                        <span className="text-blue-600 font-medium">
                          {activity.aiSuggestions} AI suggestions
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Performance Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">AI Assistant Performance</CardTitle>
          <CardDescription>Overview of your AI's effectiveness this week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium">Objection Handling</span>
                <span className="text-xl font-bold">89%</span>
              </div>
              <Progress value={89} className="h-3" />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium">Response Accuracy</span>
                <span className="text-xl font-bold">94%</span>
              </div>
              <Progress value={94} className="h-3" />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium">Knowledge Usage</span>
                <span className="text-xl font-bold">76%</span>
              </div>
              <Progress value={76} className="h-3" />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium">User Satisfaction</span>
                <span className="text-xl font-bold">92%</span>
              </div>
              <Progress value={92} className="h-3" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
