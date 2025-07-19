
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { TopNavigation } from "@/components/top-navigation";
import Index from "./pages/Index";
import KnowledgeBase from "./pages/KnowledgeBase";
import AIConfiguration from "./pages/AIConfiguration";
import Meetings from "./pages/Meetings";
import VideoConferenceRoom from "./pages/VideoConferenceRoom";
import TranscriptView from "./pages/TranscriptView";
import Analytics from "./pages/Analytics";
import UserManagement from "./pages/UserManagement";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full bg-background">
            <Routes>
              {/* Video Conference Room - Full Screen Layout */}
              <Route path="/meetings/:meetingId/room" element={<VideoConferenceRoom />} />
              
              {/* Regular App Layout */}
              <Route path="*" element={
                <>
                  <AppSidebar />
                  <div className="flex-1 flex flex-col">
                    <TopNavigation />
                    <main className="flex-1 overflow-auto">
                      <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/knowledge-base" element={<KnowledgeBase />} />
                        <Route path="/ai-configuration" element={<AIConfiguration />} />
                        <Route path="/meetings" element={<Meetings />} />
                        <Route path="/meetings/:meetingId/transcript" element={<TranscriptView />} />
                        <Route path="/analytics" element={<Analytics />} />
                        <Route path="/users" element={<UserManagement />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </main>
                  </div>
                </>
              } />
            </Routes>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
