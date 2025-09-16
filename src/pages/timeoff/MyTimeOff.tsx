import { useState } from "react";
import { Calendar, Download, Search, ChevronLeft, ChevronRight, FileDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { Checkbox } from "@/components/ui/checkbox";
import DatePickerComponent from "@/components/ui/datepicker";

const timeOffRequests = [
  {
    id: 1,
    from: "01 Mar 2023",
    to: "03 Mar 2023",
    total: "3 Days",
    type: "Engagement",
    attachment: null,
    status: "approve",
  },
  {
    id: 2,
    from: "01 Mar 2023",
    to: "03 Mar 2023",
    total: "3 Days",
    type: "Engagement",
    attachment: "File.pdf",
    status: "approve",
  },
  {
    id: 3,
    from: "01 Mar 2023",
    to: "03 Mar 2023",
    total: "3 Days",
    type: "Engagement",
    attachment: "File.pdf",
    status: "pending",
  },
  {
    id: 4,
    from: "01 Mar 2023",
    to: "03 Mar 2023",
    total: "3 Days",
    type: "Engagement",
    attachment: null,
    status: "approve",
  },
  {
    id: 5,
    from: "01 Mar 2023",
    to: "03 Mar 2023",
    total: "3 Days",
    type: "Engagement",
    attachment: "File.pdf",
    status: "pending",
  },
  {
    id: 6,
    from: "01 Mar 2023",
    to: "03 Mar 2023",
    total: "3 Days",
    type: "Engagement",
    attachment: null,
    status: "approve",
  },
];

const employees = [
  {
    id: 1,
    name: "Jordyn George",
    email: "jordyn@unpixel.com",
    avatar: "/avatars/jordyn.jpg",
    date: "01 Mar 2023",
  },
  {
    id: 2,
    name: "Skylar Herwitz",
    email: "skylar@unpixel.com",
    avatar: "/avatars/skylar.jpg",
    date: "01 Mar 2023",
  },
  {
    id: 3,
    name: "Kathryn Murphy",
    email: "kathryn@unpixel.com",
    avatar: "/avatars/kathryn.jpg",
    date: "01 Mar 2023",
  },
  {
    id: 4,
    name: "Cameron Williamson",
    email: "cameron@unpixel.com",
    avatar: "/avatars/cameron.jpg",
    date: "01 Mar 2023",
  },
  {
    id: 5,
    name: "Esther Howard",
    email: "esther@unpixel.com",
    avatar: "/avatars/esther.jpg",
    date: "01 Mar 2023",
  },
  {
    id: 6,
    name: "Jenny Wilson",
    email: "jenny@unpixel.com",
    avatar: "/avatars/jenny.jpg",
    date: "01 Mar 2023",
  },
];

const calendarDays = [
  { day: 29, month: "prev", disabled: true },
  { day: 30, month: "prev", disabled: true },
  { day: 31, month: "prev", disabled: true },
  { day: 1, month: "current" },
  { day: 2, month: "current" },
  { day: 3, month: "current" },
  { day: 4, month: "current" },
  { day: 5, month: "current" },
  { day: 6, month: "current" },
  { day: 7, month: "current" },
  { day: 8, month: "current" },
  { day: 9, month: "current", selected: true },
  { day: 10, month: "current", selected: true },
  { day: 11, month: "current", selected: true },
  { day: 12, month: "current" },
  { day: 13, month: "current" },
  { day: 14, month: "current" },
  { day: 15, month: "current", highlighted: true },
  { day: 16, month: "current" },
  { day: 17, month: "current" },
  { day: 18, month: "current" },
  { day: 19, month: "current" },
  { day: 20, month: "current" },
  { day: 21, month: "current" },
  { day: 22, month: "current" },
  { day: 23, month: "current" },
  { day: 24, month: "current" },
  { day: 25, month: "current" },
  { day: 26, month: "current" },
  { day: 27, month: "current" },
  { day: 28, month: "current" },
  { day: 29, month: "current" },
  { day: 30, month: "current" },
  { day: 31, month: "current" },
  { day: 1, month: "next", disabled: true },
];

export default function EmployeeRequests() {
  const [showCalendar, setShowCalendar] = useState(false);
   const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approve":
        return (
          <Badge variant="secondary" className="bg-success/10 text-success hover:bg-success/20">
            APPROVE
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="secondary" className="bg-warning/10 text-warning hover:bg-warning/20">
            PENDING
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status.toUpperCase()}</Badge>;
    }
  };

  return (
    <div className="flex-1  p-6">
       <Card className="space-y-6">
           <CardHeader className='grid grid-cols-12 items-center'>
             <CardTitle className="col-span-3">My Time Off</CardTitle>

             <div className=' col-span-9 justify-self-end flex items-center space-x-3'>
                <div className="relative w-[300px]">
          <Input placeholder="Search employee" className="pl-10 w-full" />
          <Search className="w-4 h-4 absolute right-3 top-3 text-muted-foreground" />
        </div>
         <Button variant="tertiary" className="flex items-center gap-2">
          <FileDown className="w-4 h-4" />
          Download CSV
        </Button>
             </div>
           </CardHeader>

           <CardContent className="space-y-6">
           {/* Filters */}
      <div className="grid grid-cols-3 gap-4">
        <DatePickerComponent label="" popoverTriggerElement={<Button
          variant="outline"
          // onClick={() => setShowCalendar(!showCalendar)}
          className="flex items-center justify-between"
        >
          01 Jan 2023 - 10 Mar 2023
          <Calendar className="w-4 h-4" />
        </Button>} />
        
        <Select defaultValue="all-type">
          <SelectTrigger className="col-span-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-type">All Type</SelectItem>
            <SelectItem value="engagement">Engagement</SelectItem>
            <SelectItem value="sick">Sick Leave</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all-status">
          <SelectTrigger className="col-span-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-status">All Status</SelectItem>
            <SelectItem value="approve">Approved</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
      </div>

                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar Card */}
        {showCalendar && (
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center justify-between">
                Set Date
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="w-6 h-6">
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <span className="text-sm font-medium">January 2023</span>
                  <Button variant="ghost" size="icon" className="w-6 h-6">
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-7 gap-1 text-center text-xs text-muted-foreground">
                  <div>Mon</div>
                  <div>Tue</div>
                  <div>Wed</div>
                  <div>Thu</div>
                  <div>Fri</div>
                  <div>Sat</div>
                  <div>Sun</div>
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {calendarDays.map((day, index) => (
                    <button
                      key={index}
                      className={`
                        w-8 h-8 text-xs rounded-md transition-colors
                        ${day.disabled ? 'text-muted-foreground/50' : 'text-foreground hover:bg-muted'}
                        ${day.selected ? 'bg-primary text-primary-foreground' : ''}
                        ${day.highlighted ? 'bg-primary/20 text-primary' : ''}
                      `}
                    >
                      {day.day}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2 pt-4">
                  <Button variant="outline" size="sm" className="flex-1">
                    Cancel
                  </Button>
                  <Button size="sm" className="flex-1">
                    Save
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Requests Table */}
        <Card className={showCalendar ? "lg:col-span-3" : "lg:col-span-4"}>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox />
                  </TableHead>
                  <TableHead>Employee Name</TableHead>
                  <TableHead>From</TableHead>
                  <TableHead>To</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Attachment</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {timeOffRequests.map((request) => {
                  const employee = employees.find(emp => emp.id === request.id);
                  return (
                  <TableRow key={request.id}>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell>
                      {/* <Checkbox /> */}
                      <div key={employee.id} className="flex items-center gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={employee.avatar} />
                    <AvatarFallback>
                      {employee.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{employee.name}</p>
                    <p className="text-xs text-muted-foreground">{employee.email}</p>
                  </div>
                  {/* <span className="text-sm text-muted-foreground">{employee.date}</span> */}
                </div>
                    </TableCell>
                    <TableCell>{request.from}</TableCell>
                    <TableCell>{request.to}</TableCell>
                    <TableCell>{request.total}</TableCell>
                    <TableCell>{request.type}</TableCell>
                    <TableCell>
                      {request.attachment ? (
                        <span className="text-primary cursor-pointer">{request.attachment}</span>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell>{getStatusBadge(request.status)}</TableCell>
                  </TableRow>
                )})}
              </TableBody>
            </Table>

       
            {/* Pagination */}
            <div className="border-t p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="w-8 h-8">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="w-8 h-8 bg-tertiary text-tertiary-foreground">
                  1
                </Button>
                <Button variant="ghost" size="sm" className="w-8 h-8">
                  2
                </Button>
                <Button variant="ghost" size="sm" className="w-8 h-8">
                  3
                </Button>
                <span className="text-muted-foreground">...</span>
                <Button variant="ghost" size="sm" className="w-8 h-8">
                  10
                </Button>
                <Button variant="ghost" size="icon" className="w-8 h-8">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">Showing 1 to 6 of 50 entries</span>
                <Select defaultValue="8">
                  <SelectTrigger className="w-24 h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="8">Show 6</SelectItem>
                    <SelectItem value="16">Show 16</SelectItem>
                    <SelectItem value="24">Show 24</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
           </CardContent>
         </Card>
    
      


    </div>
  );
}