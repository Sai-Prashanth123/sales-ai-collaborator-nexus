
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
      title: "Active Meetings",
      value: "24",
      change: "+12%",
      changeType: "positive" as const,
      icon: Video,
      description: "This month"
    },
    {
      title: "AI Suggestions Used",
      value: "1,247",
      change: "+8%",
      changeType: "positive" as const,
      icon: Brain,
      description: "This week"
    },
    {
      title: "Knowledge Base Items",
      value: "156",
      change: "+5",
      changeType: "neutral" as const,
      icon: BookOpen,
      description: "Total documents"
    },
    {
      title: "Success Rate",
      value: "89%",
      change: "+3%",
      changeType: "positive" as const,
      icon: TrendingUp,
      description: "Objection handling"
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
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, John</h1>
          <p className="text-muted-foreground">
            Here's what's happening with your AI sales assistant today.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Meeting
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <span className={`font-medium ${
                  kpi.changeType === 'positive' ? 'text-green-600' : 'text-gray-600'
                }`}>
                  {kpi.change}
                </span>
                <span>{kpi.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Quick Actions */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Jump to key features</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.href}
                className="flex items-center p-3 rounded-lg border hover:bg-muted/50 transition-colors group"
              >
                <div className={`p-2 rounded-md ${action.color} mr-3`}>
                  <action.icon className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{action.title}</p>
                  <p className="text-xs text-muted-foreground">{action.description}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </Link>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates from your AI assistant</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`p-1.5 rounded-full ${
                    activity.type === 'meeting' ? 'bg-blue-100 text-blue-600' :
                    activity.type === 'knowledge' ? 'bg-green-100 text-green-600' :
                    'bg-purple-100 text-purple-600'
                  }`}>
                    {activity.type === 'meeting' ? <Video className="h-3 w-3" /> :
                     activity.type === 'knowledge' ? <BookOpen className="h-3 w-3" /> :
                     <Brain className="h-3 w-3" />}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <span>{activity.time}</span>
                      <Badge variant="secondary" className="text-xs">
                        {activity.status}
                      </Badge>
                      {activity.aiSuggestions > 0 && (
                        <span className="text-blue-600">
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
          <CardTitle>AI Assistant Performance</CardTitle>
          <CardDescription>Overview of your AI's effectiveness this week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Objection Handling</span>
                <span className="font-medium">89%</span>
              </div>
              <Progress value={89} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Response Accuracy</span>
                <span className="font-medium">94%</span>
              </div>
              <Progress value={94} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Knowledge Usage</span>
                <span className="font-medium">76%</span>
              </div>
              <Progress value={76} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>User Satisfaction</span>
                <span className="font-medium">92%</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
