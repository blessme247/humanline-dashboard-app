import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, Users } from "lucide-react";

const TeamTimeOff = () => {
  const teamRequests = [
    {
      id: 1,
      employee: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg",
        department: "Engineering"
      },
      type: "Vacation",
      startDate: "2024-03-20",
      endDate: "2024-03-25",
      days: 5,
      status: "Approved"
    },
    {
      id: 2,
      employee: {
        name: "Michael Chen",
        avatar: "/placeholder.svg",
        department: "Design"
      },
      type: "Sick Leave",
      startDate: "2024-03-18",
      endDate: "2024-03-18",
      days: 1,
      status: "Approved"
    },
    {
      id: 3,
      employee: {
        name: "Emily Rodriguez",
        avatar: "/placeholder.svg",
        department: "Product"
      },
      type: "Personal",
      startDate: "2024-03-22",
      endDate: "2024-03-23",
      days: 2,
      status: "Pending"
    }
  ];

  const upcomingTimeOff = [
    {
      date: "2024-03-20",
      employees: ["Sarah Johnson", "John Doe"]
    },
    {
      date: "2024-03-22",
      employees: ["Emily Rodriguez"]
    },
    {
      date: "2024-03-25",
      employees: ["Michael Chen", "Alex Smith"]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "Rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Team Time Off</h1>
        <p className="text-muted-foreground">View your team's time off schedule</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Users className="w-4 h-4" />
              Out Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">team members</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              This Week
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">scheduled days off</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Pending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">requests to review</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Requests */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamRequests.map((request) => (
                <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={request.employee.avatar} />
                      <AvatarFallback>
                        {request.employee.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{request.employee.name}</h4>
                      <p className="text-sm text-muted-foreground">{request.employee.department}</p>
                      <p className="text-xs text-muted-foreground">
                        {request.type} • {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={getStatusColor(request.status)}>
                      {request.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      {request.days} day{request.days > 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Time Off */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Time Off</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingTimeOff.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{new Date(item.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        month: 'short', 
                        day: 'numeric' 
                      })}</h4>
                      <p className="text-sm text-muted-foreground">
                        {item.employees.join(', ')}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline">
                    {item.employees.length} out
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeamTimeOff;