"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { DataTable } from "@/components/data-table";

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
import { columns } from "./columns";

export default function Page() {
  const mockEmployees = [
    {
      employee_id: 1,
      full_name: "Juan Dela Cruz",
      email: "juan@example.com",
      department: "HR",
      job_title: "HR Manager",
      date_of_joining: "2022-01-15",
    },
    {
      employee_id: 2,
      full_name: "Maria Santos",
      email: "maria@example.com",
      department: "Finance",
      job_title: "Accountant",
      date_of_joining: "2021-08-01",
    },
    {
      employee_id: 3,
      full_name: "Carlos Reyes",
      email: "carlos@example.com",
      department: "Engineering",
      job_title: "Software Engineer",
      date_of_joining: "2023-05-10",
    },
  ];

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 items-center gap-2 group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Human Resource
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Employee Management</BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Employee Info</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <Separator />
        <div className="p-8 pt-8">
          <h2 className="text-xl font-semibold mb-4">Employee List</h2>
          <div className="container p-4 border rounded-md">
            <DataTable columns={columns} data={mockEmployees} />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
