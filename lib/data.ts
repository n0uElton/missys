import {
  GalleryVerticalEnd,
  AudioWaveform,
  Command,
  SquareTerminal,
  HandCoins,
  ClipboardMinus,
  BookOpen,
  Settings2,
  IdCardLanyard,
  ClipboardList,
  Spotlight,
  SquarePen,
  FileClock,
  Clock,
  Receipt,
  Flag,
  UserRound,
} from "lucide-react";

export const navFinance = [
  {
    title: "Dashboard",
    url: "/404",
    icon: SquareTerminal,
  },
  {
    title: "Payroll Management",
    url: "/404",
    icon: HandCoins,
    items: [
      { title: "Process Payroll", url: "/404" },
      { title: "View Salary Summary", url: "/404" },
      { title: "Apply Deductions", url: "/404" },
    ],
  },
  {
    title: "Tax Report",
    url: "/404",
    icon: ClipboardMinus,
    items: [
      { title: "Generate BIR Forms", url: "/404" },
      { title: "View Tax History", url: "/404" },
    ],
  },
  {
    title: "Financial Reports",
    url: "/404",
    icon: BookOpen,
    items: [
      { title: "Employee Cost Summary", url: "/404" },
      { title: "Monthly Expenses", url: "/404" },
    ],
  },
  {
    title: "Settings",
    url: "/404",
    icon: Settings2,
    items: [
      { title: "General", url: "/404" },
      { title: "Team", url: "/404" },
      { title: "Billing", url: "/404" },
      { title: "Limits", url: "/404" },
    ],
  },
];

export const navHR = [
  {
    title: "Dashboard",
    url: "/404",
    icon: SquareTerminal,
  },
  {
    title: "Employee Management",
    url: "/404",
    icon: IdCardLanyard,
    items: [
      { title: "List of Employees", url: "/hr/employee" },
      { title: "Add/Edit Employee Info", url: "/hr/addemployee" },
      { title: "Employment Status History", url: "/hr/status" },
    ],
  },
  {
    title: "Masterlist of Timesheet",
    url: "/404",
    icon: ClipboardList,
  },
  {
    title: "Leave Management",
    url: "/404",
    icon: BookOpen,
    items: [
      { title: "Leave History", url: "/404" },
      { title: "Approve/Decline Leave", url: "/404" },
    ],
  },
  {
    title: "Performance Review",
    url: "/404",
    icon: Spotlight,
    items: [
      { title: "Employee Evaluations", url: "/404" },
      { title: "Review Templates", url: "/404" },
    ],
  },
  {
    title: "Settings",
    url: "/404",
    icon: Settings2,
    items: [
      { title: "General", url: "/404" },
      { title: "Team", url: "/404" },
      { title: "Billing", url: "/404" },
      { title: "Limits", url: "/404" },
    ],
  },
];

export const navEmployee = [
  {
    title: "Dashboard",
    url: "/404",
    icon: SquareTerminal,
  },
  {
    title: "Request",
    url: "/404",
    icon: SquarePen,
    items: [
      { title: "Leave Request", url: "/404" },
      { title: "Change Schedule Request", url: "/404" },
      { title: "Travel Request", url: "/404" },
    ],
  },
  {
    title: "Update Log",
    url: "/404",
    icon: FileClock,
  },
  {
    title: "OT",
    url: "/404",
    icon: Clock,
    items: [
      { title: "OT Request Form", url: "/404" },
      { title: "OT Status", url: "/404" },
    ],
  },
  {
    title: "Payslip",
    url: "/404",
    icon: Receipt,
    items: [
      { title: "Monthly Payslip View", url: "/404" },
      { title: "Download Payslip PDF", url: "/404" },
    ],
  },
  {
    title: "Settings",
    url: "/404",
    icon: Settings2,
    items: [
      { title: "Change password", url: "/404" },
      { title: "Notification Preferences", url: "/404" },
    ],
  },
  {
    title: "Attendance",
    url: "/404",
    icon: Flag,
    items: [
      { title: "Daily Time Record", url: "/404" },
      { title: "Log In/Out History", url: "/404" },
    ],
  },
  {
    title: "Profile",
    url: "/404",
    icon: UserRound,
    items: [
      { title: "View Personal Info", url: "/404" },
      { title: "Update Contact Details", url: "/404" },
    ],
  },
];
