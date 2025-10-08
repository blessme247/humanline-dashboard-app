import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

const Jobs = () => {
  const jobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      applicants: 24,
      status: "Active",
      posted: "2 days ago"
    },
    {
      id: 2,
      title: "UX Designer",
      department: "Design",
      location: "New York",
      type: "Full-time",
      applicants: 18,
      status: "Active",
      posted: "1 week ago"
    },
    {
      id: 3,
      title: "Product Manager",
      department: "Product",
      location: "San Francisco",
      type: "Full-time",
      applicants: 31,
      status: "Draft",
      posted: "3 days ago"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-2xl font-bold text-foreground">Jobs</h4>
          <p className="text-muted-foreground">Manage your job postings and openings</p>
        </div>
        <Button variant="tertiary" className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Post New Job
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
          <Input placeholder="Search jobs..." className="pl-10" />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Filter
        </Button>
      </div>

      <div className="grid gap-4">
        {jobs.map((job) => (
          <Card key={job.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{job.title}</CardTitle>
                  <p className="text-muted-foreground">{job.department} • {job.location}</p>
                </div>
                <Badge variant={job.status === "Active" ? "default" : "secondary"}>
                  {job.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="flex gap-4 text-sm text-muted-foreground">
                  <span>{job.type}</span>
                  <span>{job.applicants} applicants</span>
                  <span>Posted {job.posted}</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">View</Button>
                  <Button variant="tertiary" size="sm">Edit</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Jobs;