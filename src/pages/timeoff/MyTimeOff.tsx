import { useState } from "react";
import {  Search, ChevronLeft, ChevronRight, FileDown, Calendar1, File, FileDownIcon } from "lucide-react";
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
import { DatePicker, DatesRangeValue } from "@mantine/dates";
import { format } from "date-fns";
import RequestsTable from "./requests-table";

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


export default function EmployeeRequests() {
  const [showCalendar, setShowCalendar] = useState(false);
   const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  //  const [value, setValue] = useState<[Date, Date]>([new Date(2021, 11, 1), new Date(2021, 11, 5)]);
     const [dateRange, setDateRange] = useState<DatesRangeValue>([new Date(2021, 11, 1), new Date(2021, 11, 5)])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approve":
        return (
          <Badge variant="success" >
            APPROVE
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="warning" >
            PENDING
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status.toUpperCase()}</Badge>;
    }
  };

    // Format the date range for display
  const getDisplayValue = () => {
    if (!dateRange) return "";
    
    // if (dateRange) {
      const [start, end] = dateRange as [Date | null, Date | null];
      if (start && end) {
        return `${format(start, 'dd MMM yyyy')} - ${format(end, 'dd MMM yyyy')}`;
      }
      if (start) {
        return format(start, 'dd MMM yyyy');
      }
    // } 
    // return "";
  };

  return (
    <div className="flex-1  p-6">
       <Card className="space-y-6">
           <CardHeader className='grid grid-cols-12 gap-y-4 items-center'>
             <CardTitle className="col-span-12 md:col-span-3">Employee Requests</CardTitle>

             <div className='col-span-12 md:col-span-9 sm:justify-self-end flex flex-col sm:flex-row gap-y-3 items-center gap-x-3 '>
                <div className="relative w-full sm:w-[300px]">
          <Input placeholder="Search employee" className="pl-10 w-full border-border  rounded-[10px] placeholder:text-placeholder" />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        </div>
         <Button variant="tertiary" className="w-full  sm:w-fit flex items-center gap-2 ">
          <FileDown className="w-4 h-4" />
          Download CSV
        </Button>
             </div>
           </CardHeader>

           <CardContent className="space-y-6">
           {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DatePickerComponent value={dateRange} onChange={setDateRange} label="" popoverTriggerElement={<Button
          variant="outline"
          className="flex items-center justify-between border-border rounded-[10px] "
        >
          {/* 01 Jan 2023 - 10 Mar 2023 */}
          
          {/* {`${value[0].toLocaleDateString()} - ${value[1].toLocaleDateString()}`} */}
          {getDisplayValue()}
          <Calendar1 className="w-4 h-4" />
        </Button>} />
            {/* <DatePicker
            className="border-border rounded-[10px]"
            type="range"
      label=""
      placeholder="Pick dates range"
      value={value}
      onChange={setValue}
    /> */}
        
        
        <Select defaultValue="all-type">
          <SelectTrigger className="col-span-1 ">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-type">All Type</SelectItem>
            <SelectItem value="engagement">Engagement</SelectItem>
            <SelectItem value="sick">Sick Leave</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all-status">
          <SelectTrigger className="col-span-1 ">
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
   

        {/* Requests Table */}
        <RequestsTable/>
      </div>
           </CardContent>
         </Card>
    
      


    </div>
  );
}