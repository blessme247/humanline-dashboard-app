import { useMemo, useState } from "react";
import {
  Home,
  Users,
  Clock,
  Calendar1,
  TrendingUp,
  HelpCircle,
  Settings,
  Briefcase,
  UserCheck,
  CalendarDays,
  LayoutGrid,
  ChevronDown,
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { ThemeSliderToggle } from "../ui/theme-toggle";
import logo from "@/assets/svg/logo.svg";
import ClipboardChecklist from "../svg/ClipboardChecklist";
import TimeOff from "../svg/TimeOff";
import Recruitment from "../svg/Recruitment";
import Payroll from "../svg/Payroll";
import leftTree from "@/assets/svg/Tree.svg";
import lastTree from "@/assets/svg/last-tree.svg";

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Employees",
    url: "/employees",
    icon: Users,
    defaultSubitem: "/employees/settings",
    subitems: [
      { title: "Settings", url: "/employees/settings", icon: Settings },
    ],
  },
  {
    title: "Checklist",
    url: "/checklist",
    icon: ClipboardChecklist,
    defaultSubitem: "/checklist/settings",
    subitems: [
      { title: "Settings", url: "/checklist/settings", icon: Settings },
    ],
  },
  {
    title: "Time Off",
    url: "/time-off",
    icon: TimeOff,
    defaultSubitem: "/time-off/my-time-off",
    subitems: [
      { title: "My Time Off", url: "/time-off/my-time-off", icon: Clock },
      { title: "Team Time Off", url: "/time-off/team-time-off", icon: Users },
      {
        title: "Employee Time Off",
        url: "/time-off/employee-time-off",
        icon: CalendarDays,
      },
      { title: "Settings", url: "/time-off/settings", icon: Settings },
    ],
  },
  {
    title: "Attendance",
    url: "/attendance",
    icon: Calendar1,
    defaultSubitem: "/attendance/settings",
    subitems: [
      { title: "Settings", url: "/attendance/settings", icon: Settings },
    ],
  },
  {
    title: "Payroll",
    url: "/payroll",
    icon: Payroll,
    defaultSubitem: "/payroll/settings",
    subitems: [{ title: "Settings", url: "/payroll/settings", icon: Settings }],
  },
  {
    title: "Performance",
    url: "/performance",
    icon: TrendingUp,
    defaultSubitem: "/performance/settings",
    subitems: [
      { title: "Settings", url: "/performance/settings", icon: Settings },
    ],
  },
  {
    title: "Recruitment",
    url: "/recruitment",
    icon: Recruitment,
    defaultSubitem: "/recruitment/jobs",
    subitems: [
      { title: "Jobs", url: "/recruitment/jobs", icon: Briefcase },
      { title: "Candidates", url: "/recruitment/candidates", icon: UserCheck },
      { title: "Settings", url: "/recruitment/settings", icon: Settings },
    ],
  },
];

const bottomItems = [
  {
    title: "Help Center",
    url: "/help",
    icon: HelpCircle,
    hasNotification: true,
  },
  { title: "Setting", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state, isDark } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();
  const [openGroups, setOpenGroups] = useState<string[]>([]);
  const [openGroup, setOpenGroup] = useState<string>("");
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  // console.log(currentPath, 'current path')

  const sideBarIconColor = useMemo(
    () =>
      document.documentElement.classList.contains("dark")
        ? "#687588"
        : "#a0aec0",
    [isDark]
  );

  const isActive = (path: string) => {
    if (path === "/") return currentPath === "/";
    return currentPath.startsWith(path);
  };

  const isOnDashboard = (path: string) => {
    return path === "/";
  };

  const isGroupActive = (item: any) => {
    if (item.url === "/" && currentPath === "/") return true;
    if (item.subitems) {
      return item.subitems.some((subitem: any) =>
        currentPath.startsWith(subitem.url)
      );
    }
    return currentPath.startsWith(item.url);
  };

  const toggleGroup = (groupTitle: string) => {
    setOpenGroups((prev) =>
      prev.includes(groupTitle)
        ? prev.filter((g) => g !== groupTitle)
        : [...prev, groupTitle]
    );
  };

  const toggleOpenGroup = (groupTitle: string) => {
    if (openGroup === groupTitle) return;
    setOpenGroup(groupTitle);
  };

  const handleParentClick = (item: any, e: React.MouseEvent) => {
    e.preventDefault();
    if (item.subitems && item.defaultSubitem) {
      navigate(item.defaultSubitem);
    } else if (!item.subitems) {
      navigate(item.url);
    }

    if (item.subitems && !collapsed) {
      // toggleGroup(item.title);
      toggleOpenGroup(item.title);
    }
  };

  return (
    <Sidebar
      className={cn(
        "border-r border-border transition-all duration-300",
        collapsed ? "w-16" : "w-[280px]"
      )}
      collapsible="icon"
    >
      <SidebarContent className="flex flex-col h-full ">
        {/* Logo */}
        <div className="py-6 px-8">
          <div
            className={cn(
              "flex items-center px-0 gap-3 ",
              !collapsed ? "justify-between" : ""
            )}
          >
            <div className="flex items-center gap-[10px]">
              <img src={logo} alt="humanline logo" />
              {!collapsed && (
                <h1 className="text-xl font-[800] text-sidebar-foreground">
                  Humanline
                </h1>
              )}
            </div>
            <SidebarTrigger1 />
          </div>
        </div>

        {/* Main Menu */}
        <SidebarGroup className="flex-1 px-8 ">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-6 ">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.subitems ? (
                    <Collapsible
                      // open={openGroups.includes(item.title) || collapsed}
                      open={openGroup === item.title || collapsed}
                      // onOpenChange={() => !collapsed && toggleGroup(item.title)}
                      onOpenChange={() =>
                        !collapsed && toggleOpenGroup(item.title)
                      }
                    >
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          onClick={(e) => handleParentClick(item, e)}
                          className={cn(
                            "flex items-center gap-[10px]  px-0 py-2.5 rounded-lg text-sm font-bold transition-colors group w-full",
                            isGroupActive(item)
                              ? // ? "bg-primary text-primary-foreground"
                                ""
                              : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                          )}
                        >
                          {/* <item.icon className={cn("w-5 h-5 shrink-0")} color={isActive(item.url) ? "#16a249" : `${sideBarIconColor}`} /> */}
                          <item.icon
                            className={cn("w-4 h-4 shrink-0")}
                            color={
                              isActive(item.url)
                                ? "#16a249"
                                : `${sideBarIconColor}`
                            }
                          />
                          {!collapsed && (
                            <>
                              <span className="flex-1 text-left">
                                {item.title}
                              </span>
                              <ChevronDown
                                className={cn(
                                  "w-4 h-4 opacity-50 transition-transform",
                                  // openGroups.includes(item.title) && "rotate-90"
                                  openGroup === item.title && "rotate-180"
                                )}
                              />
                            </>
                          )}
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      {!collapsed && (
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.subitems.map((subitem: any, i) => (
                              <SidebarMenuSubItem
                                key={subitem.title}
                                className="flex items-center"
                              >
                                {/* <span className="w-[12px] h-[2px] bg-border"></span> */}
                                <img
                                  src={
                                    i === item.subitems.length - 1
                                      ? lastTree
                                      : leftTree
                                  }
                                  alt="left border"
                                />
                                <SidebarMenuSubButton asChild>
                                  <NavLink
                                    to={subitem.url}
                                    className={cn(
                                      "flex items-center w-full gap-3 px-3 rounded-[10px] text-sm font-bold transition-colors ",
                                      isActive(subitem.url)
                                        ? "bg-muted dark:bg-border text-primary h-[48px]"
                                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                                    )}
                                  >
                                    {/* <subitem.icon className="w-4 h-4 shrink-0" /> */}
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
                        onClick={() => setOpenGroup("")}
                        className={cn(
                          "flex items-center gap-3 rounded-[10px] px-0 text-sm font-bold transition-colors group",
                          isActive(item.url)
                            ? "bg-primary text-primary-foreground h-[48px] px-3"
                            : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                          isOnDashboard(item.url) ? "justify-between" : ""
                        )}
                      >
                       {collapsed && <item.icon className={cn("w-5 h-5 shrink-0", isActive(item.url) ? "text-white" : "text-sidebar-icon")} /> }
                        {!collapsed && (
                          <span className="flex-1">{item.title}</span>
                        )}
                        {!collapsed && isOnDashboard(item.url) && (
                          <LayoutGrid />
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Bottom Section */}
        <div className="  px-8 py-6 space-y-3">
          {bottomItems.map((item) => (
            <NavLink
              key={item.title}
              to={item.url}
              className={cn(
                "flex items-center gap-[10px] px-0 py-2.5 rounded-lg text-sm font-bold transition-colors relative",
                isActive(item.url)
                  ? "bg-primary text-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon
                className={cn(
                  "w-5 h-5 shrink-0",
                  isActive(item.url) ? "text-success" : "text-sidebar-icon"
                )}
              />
              {!collapsed && <span className="flex-1">{item.title}</span>}
              {item.hasNotification && (
                <div className="absolute top-2 right-0 w-5 h-5 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center text-xs font-bold">
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
