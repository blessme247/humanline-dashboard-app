import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Search, Filter, Check, X } from "lucide-react";

const EmployeeTimeOff = () => {
  const pendingRequests = [
    {
      id: 1,
      employee: {
        name: "David Wilson",
        avatar: "/placeholder.svg",
        department: "Marketing",
        email: "david.wilson@company.com"
      },
      type: "Vacation",
      startDate: "2024-04-01",
      endDate: "2024-04-05",
      days: 5,
      reason: "Family wedding",
      requestDate: "2024-03-15",
      status: "Pending"
    },
    {
      id: 2,
      employee: {
        name: "Lisa Thompson",
        avatar: "/placeholder.svg",
        department: "Sales",
        email: "lisa.thompson@company.com"
      },
      type: "Personal",
      startDate: "2024-03-25",
      endDate: "2024-03-26",
      days: 2,
      reason: "Personal matters",
      requestDate: "2024-03-10",
      status: "Pending"
    },
    {
      id: 3,
      employee: {
        name: "James Garcia",
        avatar: "/placeholder.svg",
        department: "Engineering",
        email: "james.garcia@company.com"
      },
      type: "Sick Leave",
      startDate: "2024-03-20",
      endDate: "2024-03-22",
      days: 3,
      reason: "Medical appointment",
      requestDate: "2024-03-18",
      status: "Pending"
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Vacation":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "Sick Leave":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "Personal":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Employee Time Off</h1>
        <p className="text-muted-foreground">Review and manage employee time off requests</p>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
          <Input placeholder="Search requests..." className="pl-10" />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Filter
        </Button>
      </div>

      {/* Pending Requests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Pending Requests
            <Badge variant="outline">{pendingRequests.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingRequests.map((request) => (
              <div key={request.id} className="border rounded-lg p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={request.employee.avatar} />
                      <AvatarFallback>
                        {request.employee.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                      <div>
                        <h4 className="font-semibold">{request.employee.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {request.employee.department} • {request.employee.email}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getTypeColor(request.type)}>
                          {request.type}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {request.days} day{request.days > 1 ? 's' : ''}
                        </span>
                      </div>
                      <div className="text-sm">
                        <p><strong>Dates:</strong> {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}</p>
                        <p><strong>Reason:</strong> {request.reason}</p>
                        <p className="text-muted-foreground">
                          Requested on {new Date(request.requestDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <X className="w-4 h-4 mr-1" />
                      Reject
                    </Button>
                    <Button 
                    // variant="tertiary"
                      size="sm" 
                      className=" hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-900/20"
                    >
                      <Check className="w-4 h-4 mr-1" />
                      Approve
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">12</div>
            <p className="text-sm text-muted-foreground">Approved This Month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">3</div>
            <p className="text-sm text-muted-foreground">Pending Review</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">2</div>
            <p className="text-sm text-muted-foreground">Rejected</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">85%</div>
            <p className="text-sm text-muted-foreground">Approval Rate</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmployeeTimeOff;