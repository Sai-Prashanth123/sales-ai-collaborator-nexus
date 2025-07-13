
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  MessageSquare, 
  Target, 
  Shield,
  Plus,
  Edit,
  Trash2,
  Save
} from "lucide-react";

const AIConfiguration = () => {
  const [confidence, setConfidence] = useState([75]);
  const [responseTime, setResponseTime] = useState([2]);
  const [proactivity, setProactivity] = useState([60]);

  const objectionRules = [
    {
      id: 1,
      trigger: "too expensive",
      response: "I understand cost is a concern. Let me show you the ROI analysis that demonstrates how our solution pays for itself within 6 months.",
      category: "pricing",
      active: true
    },
    {
      id: 2,
      trigger: "not the right time",
      response: "Timing is important. Can you help me understand what needs to happen for this to become a priority?",
      category: "timing",
      active: true
    },
    {
      id: 3,
      trigger: "need to think about it",
      response: "Of course, this is an important decision. What specific aspects would you like to think through?",
      category: "hesitation",
      active: true
    }
  ];

  const nextBestActions = [
    {
      id: 1,
      scenario: "Customer shows high interest",
      action: "Suggest scheduling a technical demo",
      priority: "high"
    },
    {
      id: 2,
      scenario: "Price objection raised",
      action: "Present ROI calculator and case studies",
      priority: "high"
    },
    {
      id: 3,
      scenario: "Competitor mentioned",
      action: "Share competitive battlecard points",
      priority: "medium"
    }
  ];

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Configuration</h1>
          <p className="text-muted-foreground">
            Customize your AI assistant's behavior and response patterns
          </p>
        </div>
        <Button>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General Settings</TabsTrigger>
          <TabsTrigger value="objections">Objection Handling</TabsTrigger>
          <TabsTrigger value="actions">Next Best Actions</TabsTrigger>
          <TabsTrigger value="tone">Tone & Style</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                AI Behavior Settings
              </CardTitle>
              <CardDescription>
                Configure how your AI assistant operates during sales calls
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="confidence">Confidence Threshold ({confidence[0]}%)</Label>
                    <div className="mt-2">
                      <Slider
                        id="confidence"
                        min={0}
                        max={100}
                        step={5}
                        value={confidence}
                        onValueChange={setConfidence}
                        className="w-full"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Minimum confidence level for AI suggestions
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="response-time">Response Delay ({responseTime[0]}s)</Label>
                    <div className="mt-2">
                      <Slider
                        id="response-time"
                        min={0}
                        max={10}
                        step={0.5}
                        value={responseTime}
                        onValueChange={setResponseTime}
                        className="w-full"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Delay before showing suggestions
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="proactivity">Proactivity Level ({proactivity[0]}%)</Label>
                    <div className="mt-2">
                      <Slider
                        id="proactivity"
                        min={0}
                        max={100}
                        step={10}
                        value={proactivity}
                        onValueChange={setProactivity}
                        className="w-full"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      How often AI suggests proactive actions
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Real-time Transcription</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable live meeting transcription
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Sentiment Analysis</Label>
                      <p className="text-sm text-muted-foreground">
                        Analyze customer sentiment in real-time
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Competitive Intelligence</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically detect competitor mentions
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Auto-summarization</Label>
                      <p className="text-sm text-muted-foreground">
                        Generate meeting summaries automatically
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="objections" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Objection Handling Rules
              </CardTitle>
              <CardDescription>
                Define custom responses for common sales objections
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-6">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Rule
                </Button>
              </div>

              <div className="space-y-4">
                {objectionRules.map((rule) => (
                  <Card key={rule.id} className="border-l-4 border-l-blue-500">
                    <CardContent className="pt-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">{rule.category}</Badge>
                            <Badge variant={rule.active ? "default" : "secondary"}>
                              {rule.active ? "Active" : "Inactive"}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Trigger Phrase</Label>
                          <p className="text-sm text-muted-foreground mt-1">"{rule.trigger}"</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Suggested Response</Label>
                          <p className="text-sm text-muted-foreground mt-1">{rule.response}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="actions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Next Best Actions
              </CardTitle>
              <CardDescription>
                Configure AI recommendations for different sales scenarios
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-6">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Action
                </Button>
              </div>

              <div className="space-y-4">
                {nextBestActions.map((action) => (
                  <Card key={action.id} className="border-l-4 border-l-green-500">
                    <CardContent className="pt-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Badge 
                            variant={action.priority === 'high' ? 'destructive' : 'secondary'}
                          >
                            {action.priority} priority
                          </Badge>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Scenario</Label>
                          <p className="text-sm text-muted-foreground mt-1">{action.scenario}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Recommended Action</Label>
                          <p className="text-sm text-muted-foreground mt-1">{action.action}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tone" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Tone & Communication Style
              </CardTitle>
              <CardDescription>
                Customize how your AI assistant communicates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="tone-select">Communication Tone</Label>
                    <Select defaultValue="professional">
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="friendly">Friendly</SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="formal">Formal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="language">Primary Language</Label>
                    <Select defaultValue="english">
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="spanish">Spanish</SelectItem>
                        <SelectItem value="french">French</SelectItem>
                        <SelectItem value="german">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="industry">Industry Context</Label>
                    <Select defaultValue="technology">
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="manufacturing">Manufacturing</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="custom-instructions">Custom Instructions</Label>
                    <Textarea
                      id="custom-instructions"
                      placeholder="Add specific instructions for your AI assistant's behavior..."
                      className="mt-2 min-h-[120px]"
                    />
                  </div>

                  <div>
                    <Label htmlFor="banned-phrases">Banned Phrases</Label>
                    <Textarea
                      id="banned-phrases"
                      placeholder="List phrases the AI should never use (one per line)..."
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIConfiguration;
