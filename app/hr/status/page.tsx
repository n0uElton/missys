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
import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";

export default function Page() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [statusHistory, setStatusHistory] = useState<any[]>([]);

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

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("name")
        .eq("id", user.id)
        .single();

      if (error || !profile) {
        setUsername(null);
        toast.error("Failed to fetch username");
      } else {
        setUsername(profile.name);
        toast.message(`Welcome, ${profile.name}`);
      }

      setLoading(false);
    };

    const fetchStatusHistory = async () => {
      const { data, error } = await supabase
        .from("employee_status_history")
        .select("*")
        .order("effective_date", { ascending: true });

      if (error) {
        console.error("Error fetching status history:", error.message);
        toast.error("Failed to load status history");
      }

      setStatusHistory(
        data && data.length > 0
          ? data
          : [
              {
                status_id: 1,
                effective_date: "2022-01-10",
                status: "Hired",
                reason: "New Employee",
                remarks: "First job",
              },
              {
                status_id: 2,
                effective_date: "2022-06-01",
                status: "Regular",
                reason: "End of Probation",
                remarks: "Passed probation",
              },
              {
                status_id: 3,
                effective_date: "2023-03-15",
                status: "On Leave",
                reason: "Maternity Leave",
                remarks: "Expected 3 months",
              },
              {
                status_id: 4,
                effective_date: "2023-06-15",
                status: "Active",
                reason: "Returned from Leave",
                remarks: "Back to work",
              },
              {
                status_id: 5,
                effective_date: "2024-02-28",
                status: "Resigned",
                reason: "Personal Reasons",
                remarks: "Final clearance done",
              },
            ]
      );
    };

    checkUser();
    fetchStatusHistory();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_OUT") {
          router.push("/");
          setUsername(null);
        } else if (session) {
          setUser(session.user);
          const { data, error } = await supabase
            .from("profiles")
            .select("name")
            .eq("id", session.user.id)
            .single();

          if (error || !data) {
            setUsername(null);
          } else {
            setUsername(data.name);
          }
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  return (
    <SidebarProvider>
      <Toaster position="top-center" />
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
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

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="border rounded-xl p-4 shadow-sm bg-white">
            <h2 className="text-xl font-semibold mb-4">
              📊 Employee Status History
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300 text-sm text-center">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border px-4 py-2">Date</th>
                    <th className="border px-4 py-2">Status</th>
                    <th className="border px-4 py-2">Reason</th>
                    <th className="border px-4 py-2">Remarks</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {statusHistory.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="text-center py-4">
                        No records found.
                      </td>
                    </tr>
                  ) : (
                    statusHistory.map((entry) => (
                      <tr key={entry.status_id} className="hover:bg-gray-50">
                        <td className="border px-4 py-2">
                          {new Date(entry.effective_date).toLocaleDateString()}
                        </td>
                        <td className="border px-4 py-2">{entry.status}</td>
                        <td className="border px-4 py-2">{entry.reason}</td>
                        <td className="border px-4 py-2">{entry.remarks}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
