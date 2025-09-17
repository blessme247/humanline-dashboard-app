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

  const getTypeColor = (type) => {
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
    <div className="p-4 md:p-6 space-y-4 md:space-y-6">
      {/* Header Section */}
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-foreground">Employee Time Off</h1>
        <p className="text-sm md:text-base text-muted-foreground">Review and manage employee time off requests</p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
          <Input placeholder="Search requests..." className="pl-10" />
        </div>
        <Button variant="outline" className="flex items-center justify-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4" />
          Filter
        </Button>
      </div>

      {/* Pending Requests */}
      <Card>
        <CardHeader className="pb-3 md:pb-6">
          <CardTitle className="flex items-center justify-between text-lg md:text-xl">
            Pending Requests
            <Badge variant="outline">{pendingRequests.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3 md:space-y-4">
            {pendingRequests.map((request) => (
              <div key={request.id} className="border rounded-lg p-4 md:p-6">
                {/* Mobile Layout */}
                <div className="block md:hidden space-y-4">
                  {/* Header with Avatar and Basic Info */}
                  <div className="flex items-start gap-3">
                    <Avatar className="w-10 h-10 flex-shrink-0">
                      <AvatarImage src={request.employee.avatar} />
                      <AvatarFallback className="text-xs">
                        {request.employee.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm truncate">{request.employee.name}</h4>
                      <p className="text-xs text-muted-foreground truncate">
                        {request.employee.department}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {request.employee.email}
                      </p>
                    </div>
                  </div>

                  {/* Type and Duration */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge className={`${getTypeColor(request.type)} text-xs`}>
                        {request.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {request.days} day{request.days > 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>

                  {/* Dates and Reason */}
                  <div className="space-y-1 text-xs">
                    <p>
                      <span className="font-medium">Dates:</span> {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
                    </p>
                    <p>
                      <span className="font-medium">Reason:</span> {request.reason}
                    </p>
                    <p className="text-muted-foreground">
                      Requested {new Date(request.requestDate).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 text-xs text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <X className="w-3 h-3 mr-1" />
                      Reject
                    </Button>
                    <Button 
                      size="sm" 
                      className="flex-1 text-xs hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-900/20"
                    >
                      <Check className="w-3 h-3 mr-1" />
                      Approve
                    </Button>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden md:flex items-start justify-between">
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
                      size="sm" 
                      className="hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-900/20"
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
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <Card>
          <CardContent className="p-3 md:p-4">
            <div className="text-xl md:text-2xl font-bold text-green-600">12</div>
            <p className="text-xs md:text-sm text-muted-foreground">Approved This Month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 md:p-4">
            <div className="text-xl md:text-2xl font-bold text-yellow-600">3</div>
            <p className="text-xs md:text-sm text-muted-foreground">Pending Review</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 md:p-4">
            <div className="text-xl md:text-2xl font-bold text-red-600">2</div>
            <p className="text-xs md:text-sm text-muted-foreground">Rejected</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 md:p-4">
            <div className="text-xl md:text-2xl font-bold text-primary">85%</div>
            <p className="text-xs md:text-sm text-muted-foreground">Approval Rate</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmployeeTimeOff;