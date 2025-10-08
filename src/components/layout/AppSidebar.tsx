import { useMemo, useState } from "react";
import { 
  Home, 
  Users, 
  CheckSquare, 
  Clock, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  UserPlus,
  HelpCircle,
  Settings,
  ChevronRight,
  Briefcase,
  UserCheck,
  CalendarDays,
  LayoutGrid, 
  Timer, 
  ChevronDown
} from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  // SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  useSidebar,
  SidebarTrigger1,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { ThemeSliderToggle } from "../ui/theme-toggle";
import logo from "@/assets/svg/logo.svg"

const menuItems = [
  { 
    title: "Dashboard", 
    url: "/", 
    icon: Home 
  },
  { 
    title: "Employees", 
    url: "/employees", 
    icon: Users,
    defaultSubitem: "/employees/settings",
    subitems: [
      { title: "Settings", url: "/employees/settings", icon: Settings }
    ]
  },
  { 
    title: "Checklist", 
    url: "/checklist", 
    icon: CheckSquare,
    defaultSubitem: "/checklist/settings",
    subitems: [
      { title: "Settings", url: "/checklist/settings", icon: Settings }
    ]
  },
  { 
    title: "Time Off", 
    url: "/time-off", 
    icon: Timer,
    defaultSubitem: "/time-off/my-time-off",
    subitems: [
      { title: "My Time Off", url: "/time-off/my-time-off", icon: Clock },
      { title: "Team Time Off", url: "/time-off/team-time-off", icon: Users },
      { title: "Employee Time Off", url: "/time-off/employee-time-off", icon: CalendarDays },
      { title: "Settings", url: "/time-off/settings", icon: Settings }
    ]
  },
  { 
    title: "Attendance", 
    url: "/attendance", 
    icon: Calendar,
    defaultSubitem: "/attendance/settings",
    subitems: [
      { title: "Settings", url: "/attendance/settings", icon: Settings }
    ]
  },
  { 
    title: "Payroll", 
    url: "/payroll", 
    icon: DollarSign,
    defaultSubitem: "/payroll/settings",
    subitems: [
      { title: "Settings", url: "/payroll/settings", icon: Settings }
    ]
  },
  { 
    title: "Performance", 
    url: "/performance", 
    icon: TrendingUp,
    defaultSubitem: "/performance/settings",
    subitems: [
      { title: "Settings", url: "/performance/settings", icon: Settings }
    ]
  },
  { 
    title: "Recruitment", 
    url: "/recruitment", 
    icon: UserPlus,
    defaultSubitem: "/recruitment/jobs",
    subitems: [
      { title: "Jobs", url: "/recruitment/jobs", icon: Briefcase },
      { title: "Candidates", url: "/recruitment/candidates", icon: UserCheck },
      { title: "Settings", url: "/recruitment/settings", icon: Settings }
    ]
  },
];

const bottomItems = [
  { title: "Help Center", url: "/help", icon: HelpCircle, hasNotification: true },
  { title: "Setting", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state, isDark } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();
  const [openGroups, setOpenGroups] = useState<string[]>([]);
  const [openGroup, setOpenGroup] = useState<string>("")
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const sideBarIconColor = useMemo(()=> document.documentElement.classList.contains("dark") ? "#f4f4f5" : "#3f3f46", [isDark] )

  const isActive = (path: string) => {
    if (path === "/") return currentPath === "/";
    return currentPath.startsWith(path);
  };

  const isOnDashboard = (path: string)=> {
    return path === "/"
  }

  const isGroupActive = (item: any) => {
    if (item.url === "/" && currentPath === "/") return true;
    if (item.subitems) {
      return item.subitems.some((subitem: any) => currentPath.startsWith(subitem.url));
    }
    return currentPath.startsWith(item.url);
  };

  const toggleGroup = (groupTitle: string) => {
    setOpenGroups(prev => 
      prev.includes(groupTitle) 
        ? prev.filter(g => g !== groupTitle)
        : [...prev, groupTitle]
    );
  };

  const toggleOpenGroup = (groupTitle:string)=> {
    if (openGroup === groupTitle) return 
    setOpenGroup(groupTitle) 
  }


  const handleParentClick = (item: any, e: React.MouseEvent) => {
    e.preventDefault();
    if (item.subitems && item.defaultSubitem) {
      navigate(item.defaultSubitem);
    } else if (!item.subitems) {
      navigate(item.url);
    }
    
    if (item.subitems && !collapsed) {
      // toggleGroup(item.title);
      toggleOpenGroup(item.title)
    }
  };


  return (
    <Sidebar
      className={cn(
        "border-r transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
      collapsible="icon"
    >
      <SidebarContent className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-6 border-b border-sidebar-border">
          <div className={cn("flex items-center gap-3", !collapsed ? "justify-between" : "")}>

            <div className="flex items-center gap-[10px]">

            {/* <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-primary-foreground rounded-sm"></div>
            </div> */}
            <img src={logo} alt="humanline logo" />
            {!collapsed && (
              <h1 className="text-xl font-[800] text-sidebar-foreground">Humanline</h1>
            )}
            </div>
            <SidebarTrigger1 />
          </div>
        </div>

        {/* Main Menu */}
        <SidebarGroup className="flex-1 px-4 py-4">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.subitems ? (
                    <Collapsible 
                      // open={openGroups.includes(item.title) || collapsed} 
                      open={openGroup === item.title || collapsed} 
                      // onOpenChange={() => !collapsed && toggleGroup(item.title)}
                      onOpenChange={() => !collapsed && toggleOpenGroup(item.title)}
                    >
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          onClick={(e) => handleParentClick(item, e)}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition-colors group w-full",
                            isGroupActive(item)
                              // ? "bg-primary text-primary-foreground"
                              ? ""
                              : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"

                          )}
                        >
                          {/* <item.icon className={cn("w-5 h-5 shrink-0")} color={isActive(item.url) ? "#16a249" : `${sideBarIconColor}`} /> */}
                          <item.icon className={cn("w-4 h-4 shrink-0", isActive(item.url) ? "text-success" : "text-sidebar-icon")} 
                           />
                          {!collapsed && (
                            <>
                              <span className="flex-1 text-left">{item.title}</span>
                              <ChevronDown className={cn(
                                "w-4 h-4 opacity-50 transition-transform",
                                // openGroups.includes(item.title) && "rotate-90"
                                openGroup === item.title && "rotate-180"
                              )} />
                            </>
                          )}
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      {!collapsed && (
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.subitems.map((subitem: any) => (
                              <SidebarMenuSubItem key={subitem.title} className="flex items-center">
                                <span className="w-[12px] h-[1px] bg-sidebar-border"></span>
                                <SidebarMenuSubButton asChild>
                                  <NavLink
                                    to={subitem.url}
                                    className={cn(
                                      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-bold transition-colors ",
                                      isActive(subitem.url)
                                        ? "bg-primary/10 text-primary "
                                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                                     
                                    )}
                                  >
                                    <subitem.icon className="w-4 h-4 shrink-0" />
                                    <span>{subitem.title}</span>
                                  </NavLink>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      )}
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition-colors group",
                          isActive(item.url)
                            ? "bg-primary text-primary-foreground"
                            : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                            isOnDashboard(item.url) ? "justify-between" : ""
                        )}
                      >
                        <item.icon className={cn("w-5 h-5 shrink-0", isActive(item.url) ? "text-white" : "text-sidebar-icon")} />
                        {!collapsed && <span className="flex-1">{item.title}</span>}
                        {!collapsed && isOnDashboard(item.url) && <LayoutGrid /> }
                      </NavLink>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Bottom Section */}
        <div className="border-t border-sidebar-border p-4 space-y-2">
          {bottomItems.map((item) => (
            <NavLink
              key={item.title}
              to={item.url}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors relative",
                isActive(item.url)
                  ? "bg-primary text-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {!collapsed && <span className="flex-1">{item.title}</span>}
              {item.hasNotification && (
                <div className="absolute top-2 right-3 w-5 h-5 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center text-xs font-bold">
                  8
                </div>
              )}
            </NavLink>
          ))}

          {/* Theme Toggle */}
         
          <ThemeSliderToggle />
        </div>
      </SidebarContent>
    </Sidebar>
  );
}