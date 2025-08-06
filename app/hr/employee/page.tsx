"use client";

import { useEffect, useState } from "react";
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
import { supabase } from "@/supabaseClient";

type Employee = {
  employee_id: string;
  full_name: string;
  email: string;
  department: string;
  job_title: string;
  date_of_joining: string;
};

export default function Page() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      const { data, error } = await supabase
        .from("employees")
        .select(`
          employee_id,
          department,
          job_title,
          date_of_joining,
          profiles (
            full_name,
            email
          )
        `);

      if (error) {
        console.error("Error fetching employees:", error.message);
        setEmployees([]);
      } else {
        const flattened = data.map((item: any) => ({
          employee_id: item.employee_id,
          full_name: item.profiles.full_name,
          email: item.profiles.email,
          department: item.department,
          job_title: item.job_title,
          date_of_joining: item.date_of_joining,
        }));
        setEmployees(flattened);
      }
      setLoading(false);
    };

    fetchEmployees();
    console.log(employees)
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 items-center gap-2 group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Human Resource</BreadcrumbLink>
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
            {loading ? (
              <p>Loading employees...</p>
            ) : (
              <DataTable columns={columns} data={employees} />
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
