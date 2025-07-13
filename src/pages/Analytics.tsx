
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown,
  Users, 
  MessageSquare, 
  Target,
  Clock,
  BarChart3,
  PieChart,
  Download,
  Filter
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Analytics = () => {
  const kpiData = [
    {
      title: "Meeting Success Rate",
      value: "89%",
      change: "+5%",
      changeType: "positive" as const,
      icon: Target,
      description: "Meetings leading to next steps"
    },
    {
      title: "AI Suggestion Accuracy",
      value: "94%",
      change: "+2%",
      changeType: "positive" as const,
      icon: MessageSquare,
      description: "Suggestions rated as helpful"
    },
    {
      title: "Average Meeting Duration",
      value: "42min",
      change: "-8min",
      changeType: "positive" as const,
      icon: Clock,
      description: "More efficient conversations"
    },
    {
      title: "Objection Handling Success",
      value: "76%",
      change: "-3%",
      changeType: "negative" as const,
      icon: Users,
      description: "Successfully addressed objections"
    }
  ];

  const topPerformingContent = [
    { name: "Product Battlecard 2024", usage: 234, effectiveness: 92 },
    { name: "ROI Calculator", usage: 189, effectiveness: 88 },
    { name: "Competitive Analysis", usage: 156, effectiveness: 85 },
    { name: "Case Study - TechCorp", usage: 143, effectiveness: 91 },
    { name: "Objection Handling Guide", usage: 128, effectiveness: 79 }
  ];

  const meetingInsights = [
    {
      meeting: "Demo - Enterprise Corp",
      date: "2024-01-18",
      duration: "58 min",
      aiSuggestions: 12,
      outcome: "Qualified",
      sentiment: "Positive",
      keyTopics: ["Pricing", "Implementation", "ROI"]
    },
    {
      meeting: "Follow-up - StartupXYZ",
      date: "2024-01-17",
      duration: "32 min",
      aiSuggestions: 8,
      outcome: "Proposal Sent",
      sentiment: "Neutral",
      keyTopics: ["Timeline", "Features", "Support"]
    },
    {
      meeting: "Discovery - MidCorp",
      date: "2024-01-16",
      duration: "45 min",
      aiSuggestions: 15,
      outcome: "Next Meeting",
      sentiment: "Positive",
      keyTopics: ["Integration", "Security", "Compliance"]
    }
  ];

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            Monitor your AI assistant's performance and sales effectiveness
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Select defaultValue="30d">
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* KPI Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <div className="flex items-center space-x-2 text-xs">
                <span className={`font-medium flex items-center ${
                  kpi.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {kpi.changeType === 'positive' ? 
                    <TrendingUp className="h-3 w-3 mr-1" /> : 
                    <TrendingDown className="h-3 w-3 mr-1" />
                  }
                  {kpi.change}
                </span>
                <span className="text-muted-foreground">{kpi.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="content">Content Performance</TabsTrigger>
          <TabsTrigger value="meetings">Meeting Insights</TabsTrigger>
          <TabsTrigger value="ai-performance">AI Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Meeting Outcomes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Meeting Outcomes
                </CardTitle>
                <CardDescription>Distribution of meeting results</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Qualified Leads</span>
                    <span className="text-sm font-medium">45%</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Proposals Sent</span>
                    <span className="text-sm font-medium">28%</span>
                  </div>
                  <Progress value={28} className="h-2" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Follow-up Scheduled</span>
                    <span className="text-sm font-medium">18%</span>
                  </div>
                  <Progress value={18} className="h-2" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Not Qualified</span>
                    <span className="text-sm font-medium">9%</span>
                  </div>
                  <Progress value={9} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* AI Usage Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  AI Usage Trends
                </CardTitle>
                <CardDescription>Weekly AI suggestion usage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">1,247</p>
                      <p className="text-sm text-muted-foreground">Total Suggestions</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">892</p>
                      <p className="text-sm text-muted-foreground">Used by Sales Rep</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Usage Rate</span>
                      <span className="font-medium">71.5%</span>
                    </div>
                    <Progress value={71.5} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Content</CardTitle>
              <CardDescription>
                Knowledge base items with highest usage and effectiveness
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPerformingContent.map((content, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">{content.name}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                        <span>{content.usage} uses</span>
                        <span>•</span>
                        <span>{content.effectiveness}% effective</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary">#{index + 1}</Badge>
                      <div className="w-16">
                        <Progress value={content.effectiveness} className="h-2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="meetings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Meeting Insights</CardTitle>
              <CardDescription>
                Detailed analysis of your recent sales meetings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {meetingInsights.map((meeting, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{meeting.meeting}</h3>
                      <Badge className={
                        meeting.sentiment === 'Positive' ? 'bg-green-100 text-green-800' :
                        meeting.sentiment === 'Negative' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }>
                        {meeting.sentiment}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Date</p>
                        <p className="font-medium">{meeting.date}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Duration</p>
                        <p className="font-medium">{meeting.duration}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">AI Suggestions</p>
                        <p className="font-medium">{meeting.aiSuggestions}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Outcome</p>
                        <p className="font-medium">{meeting.outcome}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Key Topics Discussed</p>
                      <div className="flex flex-wrap gap-2">
                        {meeting.keyTopics.map((topic, topicIndex) => (
                          <Badge key={topicIndex} variant="outline">{topic}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-performance" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Suggestion Categories</CardTitle>
                <CardDescription>Types of AI suggestions provided</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Objection Handling</span>
                    <span className="text-sm font-medium">156 (35%)</span>
                  </div>
                  <Progress value={35} className="h-2" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Product Information</span>
                    <span className="text-sm font-medium">134 (30%)</span>
                  </div>
                  <Progress value={30} className="h-2" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Next Best Actions</span>
                    <span className="text-sm font-medium">89 (20%)</span>
                  </div>
                  <Progress value={20} className="h-2" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Competitive Intelligence</span>
                    <span className="text-sm font-medium">67 (15%)</span>
                  </div>
                  <Progress value={15} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Response Time Performance</CardTitle>
                <CardDescription>AI suggestion response times</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-green-600">1.2s</p>
                    <p className="text-sm text-muted-foreground">Average Response</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-blue-600">0.8s</p>
                    <p className="text-sm text-muted-foreground">Fastest Response</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Under 1s</span>
                    <span className="font-medium">68%</span>
                  </div>
                  <Progress value={68} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>1-2s</span>
                    <span className="font-medium">24%</span>
                  </div>
                  <Progress value={24} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Over 2s</span>
                    <span className="font-medium">8%</span>
                  </div>
                  <Progress value={8} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
