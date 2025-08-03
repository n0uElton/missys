"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavFinance } from "@/components/nav-finance";
import { Navhr } from "@/components/nav-hr";
import { Navemployee } from "@/components/nav-employee";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],


//.. Finance
  navfinance: [
    {
      title: "Dashboard",
      url: "#",
      icon: SquareTerminal,
    },


    {
      title: "Payroll Management",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Process Payroll",
          url: "#",
        },
        {
          title: "View Salary Summary",
          url: "#",
        },
        {
          title: "Apply Deductions ",
          url: "#",
        },
      ],
    },
    
    {
      title: "Tax Report",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Generate BIR Forms",
          url: "#",
        },
        {
          title: "View Tax History",
          url: "#",
        },
      ],
    },


    {
      title: "Financial Reports",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Employee Cost Summary",
          url: "#",
        },
        {
          title: "Monthly Expenses",
          url: "#",
        },
      ],
    },


    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
//.. End of Finance




//.. Start Human Resource
  navhr: [
    {
      title: "Dashboard",
      url: "#",
      icon: SquareTerminal,
    },

    {
      title: "Employee Management",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "List of Employees",
          url: "#",
        },
        {
          title: "Add/Edit Employee Info",
          url: "#",
        },
        {
          title: "Employment Status History",
          url: "#",
        },
      ],
    },


      {
      title: "Masterlist of Timesheet",
      url: "#",
      icon: SquareTerminal,
    },
    
    {
      title: "Leave Management",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Leave History",
          url: "#",
        },
        {
          title: "Approve/Decline Leave",
          url: "#",
        },
      ],
    },


     {
      title: "Performance Review",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Employee Evaluations",
          url: "#",
        },
        {
          title: "Review Templates",
          url: "#",
        },
      ],
    },


    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  //.. End of Human Resource



  
//.. Start Employee
  navemployee: [
    {
      title: "Dashboard",
      url: "#",
      icon: SquareTerminal,
    },

    {
      title: "Request",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Leave Request",
          url: "#",
        },
        {
          title: "Change Schedule Request",
          url: "#",
        },
        {
          title: "Travel Request",
          url: "#",
        },
      ],
    },


      {
      title: "Update Log",
      url: "#",
      icon: SquareTerminal,
    },
    
    {
      title: "OT",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "OT Request Form",
          url: "#",
        },
        {
          title: "OT Status",
          url: "#",
        },
      ],
    },


     {
      title: "Payslip",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Monthly Payslip View",
          url: "#",
        },
        {
          title: "Download Payslip PDF",
          url: "#",
        },
      ],
    },


    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Change password",
          url: "#",
        },
        {
          title: "Notification Preferences",
          url: "#",
        },
      ],      
    },

    
     {
      title: "Attendance",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Daily Time Record",
          url: "#",
        },
        {
          title: "Log In/Out History",
          url: "#",
        },
      ],
    },

     {
      title: "Profile",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "View Personal Info",
          url: "#",
        },
        {
          title: "Update Contact Details",
          url: "#",
        },
      ],
    },

  ],
  //.. End of Employee

};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavFinance items={data.navfinance} />
        <Navhr items={data.navhr} />
        <Navemployee items={data.navemployee} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
