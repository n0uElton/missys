"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
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
import { supabase } from "@/supabaseClient";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { columns } from "./columns";
import { DataTableAdd } from "@/components/data-table-add";

export default function Page() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);


  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/");
        return;
      }

      const user = session.user;
      setUser(user);

      const { data, error } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", user.id)
        .single();

      if (error || !data) {
        console.error(
          "Error fetching username:",
          error?.message || "No user data found"
        );
        setUsername(null);
        toast.error("Failed to fetch username", {
          description: "Please try again later.",
        });
      } else {
        setUsername(data.full_name);
      }

      setLoading(false);
    };

    checkUser();
  }, [router]);

  const mockEmployees = [
    {
      employee_id: 1,
      full_name: "John Doe",
      email: "john.doe@example.com",
      phone_number: 123 - 456 - 7890,
      department: "Finance",
      job_title: "Accountant",
      date_of_joining: "2021-06-15",
    },
  ];




  return (
    <SidebarProvider>
      <Toaster position="top-center" />
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 items-center gap-2 px-4">
          <SidebarTrigger />
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
        </header>
        <Separator />
        <div className="p-8 pt-8">
          <h2 className="text-xl font-semibold mb-4">Employee Information</h2>
          <div className="container p-4 border rounded-md">
            <DataTableAdd columns={columns} data={mockEmployees} />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
