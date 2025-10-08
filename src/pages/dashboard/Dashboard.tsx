import { TrendingUp, TrendingDown, Users, Plus, Minus, BriefcaseBusiness, Calendar1, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import EmployeesTable from "./employees-table";

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


export default function Dashboard() {
  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-foreground">Hi, Pristia</h1>
        <p className="text-sidebar-icon text-sm font-medium">This is your HR report so far</p>
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

                <h3 className="text-[2rem] font-bold text-foreground">{stat.value}</h3>
                    <div className={`flex items-center gap-1 text-sm rounded-[10px] ${
                  stat.trend === "up" ? "text-stats-up bg-[#E7F7EF] py-1 px-2 " : "text-stats-down py-1 px-2  bg-[#FFEDEC]"
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

              <div className="flex flex-col gap-4 w-full "> 
              <CardTitle className="w-full md:w-fit ">Team Performance</CardTitle>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">

              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-[10px] font-bold text-foreground">Project Team</span>
              </div>
                 <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#FFC107] rounded-full"></div>
                <span className="text-[10px] font-bold text-foreground">Logistics Team</span>
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
            <CardTitle className="text-lg font-bold text-foreground">Employees</CardTitle>
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
          
         <EmployeesTable />
        
        </CardContent>
      </Card>

       {/* Total Employee Pie Chart */}
        <Card className="col-span-2 lg:col-span-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold text-foreground">Total Employee</CardTitle>
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
            <EmployeeDonutChart/>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}