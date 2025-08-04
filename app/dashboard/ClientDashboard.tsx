// app/dashboard/ClientDashboard.tsx
"use client";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useEffect } from "react";
import { supabase } from "@/supabaseClient";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  ClipboardList,
  ClipboardMinus,
  Clock,
  Command,
  FileClock,
  Flag,
  Frame,
  GalleryVerticalEnd,
  HandCoins,
  IdCardLanyard,
  Map,
  PieChart,
  Receipt,
  Settings2,
  Spotlight,
  SquarePen,
  SquareTerminal,
  UserRound,
} from "lucide-react";

const iconMap: Record<string, any> = {
  AudioWaveform,
  BookOpen,
  Bot,
  ClipboardList,
  ClipboardMinus,
  Clock,
  Command,
  FileClock,
  Flag,
  Frame,
  GalleryVerticalEnd,
  HandCoins,
  IdCardLanyard,
  Map,
  PieChart,
  Receipt,
  Settings2,
  Spotlight,
  SquarePen,
  SquareTerminal,
  UserRound,
};

interface User {
  name: string;
  email: string;
  avatar: string;
  role: string | null;
}

interface Team {
  name: string;
  logo: string;
  plan: string;
}

interface NavItem {
  title: string;
  url: string;
  icon?: string;
  items?: { title: string; url: string }[];
}

interface Data {
  user: User;
  teams: Team[];
  navfinance: NavItem[];
  navhr: NavItem[];
  navemployee: NavItem[];
}

interface ClientDashboardProps {
  data: Data;
}

export default function ClientDashboard({ data }: ClientDashboardProps) {
  const router = useRouter();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_OUT") {
          router.push("/login");
        }
      }
    );

    if (data.user.role) {
      toast.message(
        <div className="text-center">Welcome, {data.user.name}</div>,
        {
          description: new Date().toLocaleString(),
        }
      );
    } else {
      toast.error("Failed to fetch user data", {
        description: "Please try again later.",
      });
    }

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router, data.user.name, data.user.role]);

  const mappedData = {
    ...data,
    teams: data.teams.map((team) => ({
      ...team,
      logo: iconMap[team.logo] || GalleryVerticalEnd,
    })),
    navfinance: data.navfinance.map((item) => ({
      ...item,
      icon: iconMap[item.icon || "SquareTerminal"],
      items: item.items?.map((subItem) => ({ ...subItem })),
    })),
    navhr: data.navhr.map((item) => ({
      ...item,
      icon: iconMap[item.icon || "SquareTerminal"],
      items: item.items?.map((subItem) => ({ ...subItem })),
    })),
    navemployee: data.navemployee.map((item) => ({
      ...item,
      icon: iconMap[item.icon || "SquareTerminal"],
      items: item.items?.map((subItem) => ({ ...subItem })),
    })),
  };

  return (
    <SidebarProvider>
      <Toaster position="top-center" />
      <AppSidebar user={data.user} nav={mappedData} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[data-collapsible=icon]:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
          </div>
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min">
            <p>Welcome, {data.user.name}!</p>
            <p>Email: {data.user.email}</p>
            <p>Role: {data.user.role || "None"}</p>
            {data.user.role === "admin" && (
              <div className="bg-blue-100 p-4 rounded-md">
                <h2>Admin Panel</h2>
                <p>
                  This section is only visible to admins. Access to Finance and
                  HR dashboards.
                </p>
              </div>
            )}
            {data.user.role === "employee" && (
              <div className="bg-green-100 p-4 rounded-md">
                <h2>Employee Dashboard</h2>
                <p>This section is only visible to employees.</p>
              </div>
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
