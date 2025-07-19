import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Video, Users } from "lucide-react";

const JoinMeeting = () => {
  const { meetingId } = useParams<{ meetingId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [participantName, setParticipantName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleJoinMeeting = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!participantName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter your name to join the meeting.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Store participant name in session storage for the video room to use
      sessionStorage.setItem("participantName", participantName.trim());
      
      // Navigate to the video conference room
      navigate(`/meetings/${meetingId}/room`);
    } catch (error) {
      console.error("Failed to join meeting:", error);
      toast({
        title: "Failed to join meeting",
        description: "There was an error joining the meeting. Please try again.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Video className="w-8 h-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl">Join Meeting</CardTitle>
          <CardDescription>
            Enter your name to join the video conference
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleJoinMeeting} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={participantName}
                onChange={(e) => setParticipantName(e.target.value)}
                disabled={loading}
                autoFocus
                required
              />
            </div>
            
            <div className="space-y-3">
              <Button 
                type="submit" 
                className="w-full"
                disabled={loading || !participantName.trim()}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Joining...
                  </>
                ) : (
                  <>
                    <Users className="w-4 h-4 mr-2" />
                    Join Meeting
                  </>
                )}
              </Button>
              
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => navigate("/meetings")}
                disabled={loading}
              >
                Back to Meetings
              </Button>
            </div>
          </form>
          
          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>By joining, you agree to our meeting guidelines and privacy policy.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JoinMeeting; 