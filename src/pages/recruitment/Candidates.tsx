import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Filter, Mail, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";

const Candidates = () => {
  const candidates = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      phone: "+1 (555) 123-4567",
      position: "Senior Frontend Developer",
      status: "Interview",
      avatar: "/placeholder.svg",
      experience: "5 years",
      location: "New York"
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael.chen@email.com",
      phone: "+1 (555) 987-6543",
      position: "UX Designer",
      status: "Review",
      avatar: "/placeholder.svg",
      experience: "3 years",
      location: "San Francisco"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      email: "emily.rodriguez@email.com",
      phone: "+1 (555) 456-7890",
      position: "Product Manager",
      status: "Offer",
      avatar: "/placeholder.svg",
      experience: "7 years",
      location: "Remote"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Interview":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "Review":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "Offer":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-foreground">Candidates</h1>
          <p className="text-sm md:text-base text-muted-foreground">View and manage job candidates</p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
          <Input placeholder="Search candidates..." className="pl-10" />
        </div>
        <Button variant="outline" className="flex items-center justify-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4" />
          Filter
        </Button>
      </div>

      {/* Candidates Grid */}
      <div className="grid gap-3 md:gap-4">
        {candidates.map((candidate) => (
          <Card key={candidate.id}>
            <CardContent className="p-4 md:p-6">
              {/* Mobile Layout */}
              <div className="block md:hidden space-y-4">
                {/* Header with Avatar and Basic Info */}
                <div className="flex items-start gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={candidate.avatar} />
                    <AvatarFallback className="text-xs">
                      {candidate.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-base truncate">{candidate.name}</h3>
                    <p className="text-sm text-muted-foreground truncate">{candidate.position}</p>
                    <Badge className={`${getStatusColor(candidate.status)} mt-1 text-xs`}>
                      {candidate.status}
                    </Badge>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Mail className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">{candidate.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Phone className="w-3 h-3 flex-shrink-0" />
                    <span>{candidate.phone}</span>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <span>{candidate.experience} exp</span>
                  <span>{candidate.location}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 text-xs">
                    View Profile
                  </Button>
                  <Button variant="tertiary" size="sm" className="flex-1 text-xs">
                    Schedule
                  </Button>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden md:flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={candidate.avatar} />
                    <AvatarFallback>{candidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">{candidate.name}</h3>
                    <p className="text-muted-foreground mb-2">{candidate.position}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {candidate.email}
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {candidate.phone}
                      </div>
                    </div>
                    <div className="flex gap-4 mt-2 text-sm">
                      <span>{candidate.experience} experience</span>
                      <span>{candidate.location}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={getStatusColor(candidate.status)}>
                    {candidate.status}
                  </Badge>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">View Profile</Button>
                    <Button variant="tertiary" size="sm">Schedule Interview</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Candidates;