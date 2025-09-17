import { useState } from "react";
import { Plus, Search, Settings, Clock, FileText, MoreHorizontal, ChevronDown, Pencil, MessageSquareText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const initialPipelineStages = [
  {
    id: "applied",
    title: "Applied",
    color: "text-primary",
    bgColor: "bg-muted/50",
    candidates: [
      {
        id: 1,
        name: "Jennifer Law",
        email: "jennifer@gmail.com",
        avatar: "/avatars/jennifer.jpg",
        comments: 0,
        likes: 0,
      },
      {
        id: 2,
        name: "Gustavo Franci",
        email: "gustavo@gmail.com",
        avatar: "/avatars/gustavo.jpg",
        comments: 0,
        likes: 0,
      },
    ],
  },
  {
    id: "screening",
    title: "Screening",
    color: "text-primary",
    bgColor: "bg-primary/10",
    candidates: [
      {
        id: 3,
        name: "Skylar Calzoni",
        email: "calzoni@gmail.com",
        avatar: "/avatars/skylar.jpg",
        comments: 3,
        likes: 1,
      },
      {
        id: 4,
        name: "Alfredo Gouse",
        email: "alfredo@gmail.com",
        avatar: "/avatars/alfredo.jpg",
        comments: 1,
        likes: 0,
      },
      {
        id: 5,
        name: "James Carder",
        email: "james@gmail.com",
        avatar: "/avatars/james.jpg",
        comments: 0,
        likes: 2,
      },
    ],
  },
  {
    id: "first-interview",
    title: "1st Interview",
    color: "text-primary",
    bgColor: "bg-primary/10",
    candidates: [
      {
        id: 6,
        name: "Lindsey Westervelt",
        email: "lindsey@gmail.com",
        avatar: "/avatars/lindsey.jpg",
        comments: 0,
        likes: 1,
      },
    ],
  },
  {
    id: "second-interview",
    title: "2nd Interview",
    color: "text-primary",
    bgColor: "bg-primary/10",
    candidates: [
      {
        id: 7,
        name: "Marilyn Workman",
        email: "marilyn@gmail.com",
        avatar: "/avatars/marilyn.jpg",
        comments: 3,
        likes: 2,
      },
      {
        id: 8,
        name: "Carla Le",
        email: "carla@gmail.com",
        avatar: null,
        comments: 1,
        likes: 2,
        initials: "CL",
      },
    ],
  },
];

export default function Recruitment() {
  const [pipelineStages, setPipelineStages] = useState(initialPipelineStages);
  const [draggedCandidate, setDraggedCandidate] = useState(null);
  const [dragOverStage, setDragOverStage] = useState(null);

  const handleDragStart = (e, candidate, stageId) => {
    setDraggedCandidate({ candidate, sourceStageId: stageId });
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.outerHTML);
    
    // Add some visual feedback
    e.target.style.opacity = '0.5';
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = '1';
    setDraggedCandidate(null);
    setDragOverStage(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnter = (e, stageId) => {
    e.preventDefault();
    setDragOverStage(stageId);
  };

  const handleDragLeave = (e) => {
    // Only clear drag over if we're leaving the stage container entirely
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setDragOverStage(null);
    }
  };

  const handleDrop = (e, targetStageId) => {
    e.preventDefault();
    setDragOverStage(null);
    
    if (!draggedCandidate || draggedCandidate.sourceStageId === targetStageId) {
      return;
    }

    const newStages = [...pipelineStages];
    
    // Find source and target stages
    const sourceStageIndex = newStages.findIndex(stage => stage.id === draggedCandidate.sourceStageId);
    const targetStageIndex = newStages.findIndex(stage => stage.id === targetStageId);
    
    // Remove candidate from source stage
    const candidateToMove = newStages[sourceStageIndex].candidates.find(
      c => c.id === draggedCandidate.candidate.id
    );
    newStages[sourceStageIndex].candidates = newStages[sourceStageIndex].candidates.filter(
      c => c.id !== draggedCandidate.candidate.id
    );
    
    // Add candidate to target stage
    newStages[targetStageIndex].candidates.push(candidateToMove);
    
    setPipelineStages(newStages);
    setDraggedCandidate(null);
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <span>List Job</span>
          <span className="mx-2">›</span>
          <span>3D Designer</span>
        </div>
        
           <div className=" grid grid-cols-12 gap-y-4">
          <h1 className="text-2xl font-semibold text-foreground col-span-12 md:col-span-3">Recruitment</h1>
          <div className="flex items-center gap-4 col-span-12 md:col-span-9 md:justify-self-end grid grid-cols-2 ">
            <div className="relative col-span-2 sm:col-span-1 w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search what you need"
                className="w-full pl-10 bg-muted/50 border-0"
              />
            </div>

            <div className="flex items-center gap-4 col-span-2 sm:col-span-1">
           
            <Button variant="tertiary" className="flex items-center gap-2">
              Add Candidates
              <ChevronDown className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Clock className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Pencil className="w-4 h-4" />
            </Button>
          </div>
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pipelineStages.map((stage) => (
          <div 
            key={stage.id} 
            className={`space-y-4 p-4 rounded-lg transition-all duration-200 ${
              dragOverStage === stage.id 
                ? 'bg-primary/5 border-2 border-primary border-dashed' 
                : 'bg-[#f7f7f7] border-2 border-transparent'
            }`}
            style={{ 
              minHeight: `${Math.max(200, stage.candidates.length * 120 + 100)}px`
            }}
            onDragOver={handleDragOver}
            onDragEnter={(e) => handleDragEnter(e, stage.id)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, stage.id)}
          >
            {/* Stage Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="font-medium">{stage.title}</h3>
                <Badge 
                  variant="secondary" 
                  className={`${stage.bgColor} ${stage.color} text-xs border-primary bg-transparent rounded-md px-1.5`}
                >
                  {stage.candidates.length}
                </Badge>
              </div>
              <Button variant="ghost" size="icon" className="w-8 h-8">
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {/* Candidates */}
            <div className="space-y-4">
              {stage.candidates.map((candidate) => (
                <Card 
                  key={candidate.id} 
                  className={`p-4 transition-all duration-200 cursor-move hover:shadow-md cursor-grab ${
                    draggedCandidate?.candidate.id === candidate.id 
                      ? 'shadow-lg transform rotate-2' 
                      : 'hover:shadow-md'
                  }`}
                  draggable
                  onDragStart={(e) => handleDragStart(e, candidate, stage.id)}
                  onDragEnd={handleDragEnd}
                >
                  <CardContent className="p-0 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={candidate.avatar} />
                          <AvatarFallback className="bg-primary/10 text-primary text-xs">
                            {candidate.initials || candidate.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{candidate.name}</p>
                          <p className="text-xs text-muted-foreground">{candidate.email}</p>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="w-8 h-8"
                            onMouseDown={(e) => e.stopPropagation()}
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>Schedule Interview</DropdownMenuItem>
                          <DropdownMenuItem>Send Message</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            Reject
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MessageSquareText className="w-4 h-4 rounded flex items-center justify-center" />
                        <span>{candidate.comments}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-4 h-4 rounded border flex items-center justify-center">
                          👍
                        </div>
                        <span>{candidate.likes}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Drop Zone Indicator */}
            {dragOverStage === stage.id && draggedCandidate && (
              <div className="border-2 border-dashed border-primary/50 rounded-lg p-4 bg-primary/5 flex items-center justify-center text-sm text-primary font-medium">
                Drop candidate here
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}