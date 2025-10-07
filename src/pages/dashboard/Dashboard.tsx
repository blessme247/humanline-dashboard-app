import { TrendingUp, TrendingDown, Users, Plus, Minus, BriefcaseBusiness, Calendar1, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import ReactEcharts from "echarts-for-react";
import { chartOptions } from "./data";
import EmployeeDonutChart from "./donut-chart";
import { Checkbox } from "@/components/ui/checkbox";

const statsData = [
  {
    title: "Total Employees",
    value: "3,540",
    change: "+25.5%",
    trend: "up",
    icon: Users,
  },
  {
    title: "Job Applicants",
    value: "1,150",
    change: "+4.10%",
    trend: "up",
    icon: BriefcaseBusiness,
  },
  {
    title: "New Employees",
    value: "500",
    change: "+5.1%",
    trend: "up",
    icon: Plus,
  },
  {
    title: "Resigned Employees",
    value: "93",
    change: "-25.5%",
    trend: "down",
    icon: Minus,
  },
];

const chartData = [
  { month: "Jan", value: 30 },
  { month: "Feb", value: 45 },
  { month: "Mar", value: 35 },
  { month: "Apr", value: 55 },
  { month: "May", value: 40 },
  { month: "Jun", value: 60 },
  { month: "Jul", value: 50 },
];

const employees = [
  {
    id: 1,
    name: "Pristia Candra",
    email: "pristia@email.com",
    jobTitle: "UI UX Designer",
    lineManager: "@Pristiacandra",
    department: "Team Product",
    office: "Unpixel Office",
    avatar: "/avatars/pristia.jpg",
  },
  {
    id: 2,
    name: "Hanna Baptista",
    email: "hanna@email.com",
    jobTitle: "Graphic Designer",
    lineManager: "@Pristiacandra",
    department: "Team Product",
    office: "Unpixel Office",
    avatar: "/avatars/hanna.jpg",
  },
];

export default function Dashboard() {
  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-foreground">Hi, Pristia</h1>
        <p className="text-sidebar-icon font-medium">This is your HR report so far</p>
      </div>

      <Card className="pt-4 rounded-[12px]">

          <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-4 ">

      {/* Stats Grid */}
      <div className="col-span-2 lg:col-span-1 grid grid-cols-1 md:grid-cols-2 ">
        {statsData.map((stat, i) => (
          <Card key={stat.title} className={cn("p-6 md:p-6  border-0 rounded-none shadow-none ", i == 0 ? " lg:border-r md:border-b md:border-grey-300" : i == 1 ? "md:border-b md:border-grey-300" : i == 2 ? "lg:border-r lg:border-grey-300" : i == 3 ? "" : "" )}>
            <CardContent className="p-0">
              <div className="flex items-center justify-between mb-4">
               <div className="p-2 bg-headerSearch rounded-full">
                  <stat.icon className="w-4 h-4 text-grey-900" />
                </div>
             
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-3">

                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                    <div className={`flex items-center gap-1 text-sm ${
                  stat.trend === "up" ? "text-stats-up bg-[#F0FDF4] py-1 px-2 rounded-md" : "text-stats-down py-1 px-2 rounded-md bg-[#FEF2F2]"
                }`}>
                  {stat.trend === "up" ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  {stat.change}
                </div>
                </div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

       {/* Team Performance Chart */}
        <Card className="col-span-2 lg:col-span-1 border-0 rounded-none shadow-none p-0 w-full">
          <CardHeader>
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">

              <div className="flex flex-col gap-2 w-full "> 
              <CardTitle className="w-full md:w-fit text-lg font-semibold">Team Performance</CardTitle>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">

              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-stats-up rounded-full"></div>
                <span className="text-sm text-muted-foreground">Project Team</span>
              </div>
                 <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#FFC107] rounded-full"></div>
                <span className="text-sm text-muted-foreground">Logistics Team</span>
              </div>
              </div>
              </div>

               <Select defaultValue="month">
                <SelectTrigger className="w-full md:w-[150px] h-8 text-xs rounded-[8px]" customIcon={<Calendar1 className="h-4 w-4 opacity-50 dark:opacity-100"  />}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-time">All Time</SelectItem>
                  <SelectItem value="month">Last 7 month</SelectItem>
                  <SelectItem value="year">Last 1 year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
             <ReactEcharts option={chartOptions}  />
          </CardContent>
        </Card>

             </CardContent>
           </Card>


      {/* Employees Table and Employee Pie chart section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

      <Card className="col-span-2">
        <CardHeader>
          <div className="flex items-start md:items-center justify-between flex-col gap-4 md:flex-row">
            <CardTitle className="text-lg font-semibold">Employees</CardTitle>
            <div className="flex items-center gap-4 w-full md:w-64 relative">
              <Input 
                placeholder="Search employee" 
                className="w-full border-border  rounded-[10px] placeholder:text-placeholder"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4 grid grid-cols-1 md:grid-cols-3">
            <Select defaultValue="all-offices">
              <SelectTrigger className="">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-offices">All Offices</SelectItem>
                <SelectItem value="unpixel">Unpixel Office</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all-job-titles">
              <SelectTrigger className="">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-job-titles">All Job Titles</SelectItem>
                <SelectItem value="designer">Designer</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all-status">
              <SelectTrigger className="">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-status">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Table className="" >
            <TableHeader  >
              <TableRow className="h-[56px] " >
                 <TableHead className="w-12  rounded-tl-[10px] rounded-bl-[10px]" role="checkbox" > <Checkbox /></TableHead>
                <TableHead className="">Employee Name</TableHead>
                <TableHead className="min-w-36 ">Job Title</TableHead>
                <TableHead className="">Line Manager</TableHead>
                <TableHead className="min-w-36 ">Department</TableHead>
                <TableHead className="min-w-36  rounded-tr-[10px] rounded-br-[10px]">Office</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.id} className="">
                   <TableCell className=""><Checkbox /></TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={employee.avatar} />
                        <AvatarFallback>
                          {employee.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{employee.name}</p>
                        <p className="text-sm text-muted-foreground">{employee.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{employee.jobTitle}</TableCell>
                  <TableCell className="text-primary">{employee.lineManager}</TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>{employee.office}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* <div className="overflow-hidden rounded-[10px] border border-border">
  <Table className="border-collapse">
    <TableHeader>
      <TableRow className="bg-border hover:bg-border">
        <TableHead className="w-12"><Checkbox /></TableHead>
        <TableHead>Employee Name</TableHead>
        <TableHead className="min-w-36">Job Title</TableHead>
        <TableHead>Line Manager</TableHead>
        <TableHead className="min-w-36">Department</TableHead>
        <TableHead className="min-w-36">Office</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {employees.map((employee) => (
        <TableRow key={employee.id}>
          <TableCell><Checkbox /></TableCell>
          <TableCell>
            <div className="flex items-center gap-3">
              <Avatar className="w-8 h-8">
                <AvatarImage src={employee.avatar} />
                <AvatarFallback>
                  {employee.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{employee.name}</p>
                <p className="text-sm text-muted-foreground">{employee.email}</p>
              </div>
            </div>
          </TableCell>
          <TableCell>{employee.jobTitle}</TableCell>
          <TableCell className="text-primary">{employee.lineManager}</TableCell>
          <TableCell>{employee.department}</TableCell>
          <TableCell>{employee.office}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</div> */}
        </CardContent>
      </Card>

       {/* Total Employee Pie Chart */}
        <Card className="col-span-2 lg:col-span-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Total Employee</CardTitle>
              <Select defaultValue="all-time">
                <SelectTrigger className="w-24 h-8 text-xs rounded-[8px] border-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-time">All Time</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            {/* <div className="flex flex-col items-center space-y-4">
              <div className="relative w-32 h-32">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="hsl(var(--muted))"
                    strokeWidth="2"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="hsl(var(--chart-line-1))"
                    strokeWidth="2"
                    strokeDasharray="60, 100"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="hsl(var(--chart-line-2))"
                    strokeWidth="2"
                    strokeDasharray="25, 100"
                    strokeDashoffset="-60"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="hsl(var(--chart-line-3))"
                    strokeWidth="2"
                    strokeDasharray="15, 100"
                    strokeDashoffset="-85"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold">121</span>
                  <span className="text-xs text-muted-foreground">Total Emp</span>
                </div>
              </div>
              <div className="space-y-2 w-full">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-stats-up rounded-full "></div>
                    <span className="text-sm">Others</span>
                  </div>
                  <span className="text-sm font-medium">71</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#f8c630] rounded-full"></div>
                    <span className="text-sm">Onboarding</span>
                  </div>
                  <span className="text-sm font-medium">27</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#3b82f6] rounded-full"></div>
                    <span className="text-sm">Offboarding</span>
                  </div>
                  <span className="text-sm font-medium">23</span>
                </div>
              </div>
            </div> */}
            <EmployeeDonutChart/>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}