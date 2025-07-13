
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Upload, 
  Search, 
  Filter, 
  FileText, 
  FileImage, 
  Video,
  Link,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Plus,
  Download
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const KnowledgeBase = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const knowledgeItems = [
    {
      id: 1,
      name: "Product Battlecard 2024",
      type: "document",
      size: "2.4 MB",
      status: "processed",
      tags: ["product", "sales", "competitive"],
      uploadDate: "2024-01-15",
      usage: 89
    },
    {
      id: 2,
      name: "Objection Handling Guide",
      type: "document",
      size: "1.8 MB",
      status: "processed",
      tags: ["objections", "training"],
      uploadDate: "2024-01-12",
      usage: 156
    },
    {
      id: 3,
      name: "Demo Video - Q4 Features",
      type: "video",
      size: "45.2 MB",
      status: "processing",
      tags: ["demo", "features"],
      uploadDate: "2024-01-14",
      usage: 23
    },
    {
      id: 4,
      name: "Competitor Analysis",
      type: "link",
      size: "-",
      status: "processed",
      tags: ["competitive", "research"],
      uploadDate: "2024-01-10",
      usage: 67
    },
    {
      id: 5,
      name: "ROI Calculator Presentation",
      type: "document",
      size: "5.1 MB",
      status: "processed",
      tags: ["roi", "presentation"],
      uploadDate: "2024-01-08",
      usage: 234
    }
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case "video": return Video;
      case "image": return FileImage;
      case "link": return Link;
      default: return FileText;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "processed": return "bg-green-100 text-green-800";
      case "processing": return "bg-yellow-100 text-yellow-800";
      case "error": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Knowledge Base</h1>
          <p className="text-muted-foreground">
            Manage your AI assistant's knowledge and training materials
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Upload Content
        </Button>
      </div>

      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle>Upload New Content</CardTitle>
          <CardDescription>
            Drag and drop files or paste URLs to add to your knowledge base
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-muted-foreground/50 transition-colors">
            <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Upload Files</h3>
            <p className="text-muted-foreground mb-4">
              Support for PDF, DOC, PPT, images, videos, and URLs
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Choose Files
              </Button>
              <span className="text-muted-foreground">or</span>
              <Input 
                placeholder="Paste URL here..." 
                className="max-w-sm"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search knowledge base..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Knowledge Base Table */}
      <Card>
        <CardHeader>
          <CardTitle>Your Knowledge Base ({knowledgeItems.length} items)</CardTitle>
          <CardDescription>
            Manage and organize your AI training materials
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead>Usage</TableHead>
                <TableHead>Upload Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {knowledgeItems.map((item) => {
                const FileIcon = getFileIcon(item.type);
                return (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <FileIcon className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">{item.size}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="capitalize">{item.type}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(item.status)}>
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {item.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">{item.usage}</span>
                        <span className="text-xs text-muted-foreground">uses</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {item.uploadDate}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default KnowledgeBase;
