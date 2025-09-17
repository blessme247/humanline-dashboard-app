import { Bell, Ellipsis, Settings, Users, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
// import { Badge } from "@/components/ui/badge";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface NotificationPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const notifications = [
  {
    id: 1,
    title: "Training session reminder",
    message: "Don't forget to join our upcoming training session on the...",
    time: "Now",
    unread: true,
    type: "reminder",
    category: "alert"
  },
  {
    id: 2,
    title: "New integration announcement",
    message: "Our HR Management Dashboard now integrates with...",
    time: "5:00 AM",
    unread: false,
    type: "announcement",
    category: "info"
  },
  {
    id: 3,
    title: "User feedback survey",
    message: "We want to hear from you! Take our quick user feedback...",
    time: "Dec 2022",
    unread: false,
    type: "survey",
    category: "feedback"
  },
];

const IconMap: Record<string, React.ReactNode> = {
  reminder: <Bell className="w-4 h-4 text-primary" />,
  announcement: <Bell className="w-4 h-4 text-blue-500" />,
  survey: <Bell className="w-4 h-4 text-green-500" />,
  alert: <div className="w-8 h-8 bg-[#FEF2F2] rounded-full flex  items-center justify-center mt-1"><Bell className="w-4 h-4 text-red-500" /></div>,
  info: <div className="w-8 h-8 bg-black/10 rounded-full flex  items-center justify-center mt-1"><Settings className="w-4 h-4 " /></div>,
  feedback: <div className="w-8 h-8 bg-primary/10 rounded-full flex  items-center justify-center mt-1"><Users className="w-4 h-4 text-primary" /></div>,
}

export function NotificationPopup({ isOpen, onClose }: NotificationPopupProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/20" onClick={onClose}>
      <div
  className="absolute top-[50%] left-[50%] w-[90%] -translate-x-1/2 -translate-y-1/2 md:left-0 md:translate-x-0 md:translate-y-0 md:top-16 md:right-24 md:w-[500px]"
  onClick={(e) => e.stopPropagation()}
>
        <Card className="shadow-lg border-border bg-background">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg font-semibold">Notification</CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose} className="w-6 h-6">
              <Ellipsis className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4 divide-grey-200/50">
            {notifications.map((notification, i) => (
              <div 
                key={notification.id} 
                // className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer border-b"
                className={cn("flex items-start gap-3 p-3 hover:bg-muted/50 cursor-pointer ", i !== notifications.length - 1 ? "border-b" : "") }
              >
                  {IconMap[notification.category] || <Bell className="w-4 h-4 text-primary" />}
               
                <div className="flex items-start gap-2">
                  <div className="flex-1 space-y-1">

                  <div className="flex items-center gap-2">
                    <p className="font-medium text-sm">{notification.title}</p>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {notification.message}
                  </p>
                  </div>

                  <div className="flex flex-col items-end gap-2 mt-1">
                    <p className="text-xs text-muted-foreground">{notification.time}</p>
                    {notification.unread && (
                      <div className="w-2 h-2 bg-destructive rounded-full"></div>
                    )}

                  </div>
                </div>
              </div>
            ))}
            
            <div className="pt-2 ">
              <Button variant="tertiary" className="w-full"
              // className="w-full bg-[#121828] text-[#b8bdc2] hover:bg-[#121828] hover:text-[#676a71]"
              >
                Show All Notifications
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}