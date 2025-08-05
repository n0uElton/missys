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

        <div className="p-4 pt-0">
          <h2 className="text-xl font-semibold mb-4">Employee List</h2>

          <div className="overflow-auto rounded-lg border shadow-sm">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Full Name</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Department</th>
                  <th className="px-4 py-2 text-left">Job Title</th>
                  <th className="px-4 py-2 text-left">Date of Joining</th>
                </tr>
              </thead>
              <tbody>
                {mockEmployees.map((emp) => (
                  <tr key={emp.employee_id} className="border-t">
                    <td className="px-4 py-2">{emp.full_name}</td>
                    <td className="px-4 py-2">{emp.email}</td>
                    <td className="px-4 py-2">{emp.department}</td>
                    <td className="px-4 py-2">{emp.job_title}</td>
                    <td className="px-4 py-2">
                      {new Date(emp.date_of_joining).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
