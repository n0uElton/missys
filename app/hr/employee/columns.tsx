import { ColumnDef } from "@tanstack/react-table";

export type employeeCol = {
  employee_id: number;
  full_name: string;
  email: string;
  department: string;
  job_title: string;
  date_of_joining: string;
};

export const mockEmployees: employeeCol[] = [
  {
    accessorKey: "employee_id",
    header: "Employee ID",
  },
  {
    accessorKey: "full_name",
    header: "Full Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "department",
    header: "Department",
  },
  {
    accessorKey: "job_title",
    header: "Job Title",
  },
  {
    accessorKey: "date_of_joining",
    header: "Date of Joining",
  },
];
