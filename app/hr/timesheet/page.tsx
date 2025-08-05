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
  const [timesheets, setTimesheets] = useState<any[]>([]);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/"); // Redirect to login page
        return;
      }

      const user = session.user;
      setUser(user);

      // Fetch username from the profiles table
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("name")
        .eq("id", user.id)
        .single();

      if (profileError || !profileData) {
        console.error(
          "Error fetching username:",
          profileError?.message || "No user data found"
        );
        setUsername(null);
        toast.error("Failed to fetch username", {
          description: "Please try again later.",
        });
      } else {
        setUsername(profileData.name);
        toast.message(`Welcome, ${profileData.name || "User"}`);
      }

      // Example: Fetch timesheets (not connected to actual attendance table)
      const mockTimesheets = [
        {
          attendance_id: 1,
          employee_id: 101,
          attendance_date: "2025-08-01",
          status: "Present",
          check_in_time: "2025-08-01T08:00:00Z",
          check_out_time: "2025-08-01T17:00:00Z",
          notes: "Regular workday",
        },
        {
          attendance_id: 2,
          employee_id: 101,
          attendance_date: "2025-08-02",
          status: "Late",
          check_in_time: "2025-08-02T09:30:00Z",
          check_out_time: "2025-08-02T18:00:00Z",
          notes: "Delayed due to traffic",
        },
      ];
      setTimesheets(mockTimesheets);

      setLoading(false);
    };

    checkUser();

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_OUT") {
          router.push("/");
          setUsername(null);
          setTimesheets([]);
        } else if (session) {
          setUser(session.user);
          // Fetch username on auth state change
          const { data, error } = await supabase
            .from("profiles")
            .select("name")
            .eq("id", session.user.id)
            .single();

          if (error || !data) {
            console.error(
              "Error fetching name:",
              error?.message || "No user data found"
            );
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
                  <BreadcrumbLink href="#">Masterlist of Timesheet</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <main className="p-4">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div>
              <h2 className="text-2xl font-bold mb-4">Timesheet Records</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2">Date</th>
                      <th className="border border-gray-300 px-4 py-2">
                        Status
                      </th>
                      <th className="border border-gray-300 px-4 py-2">
                        Check-In
                      </th>
                      <th className="border border-gray-300 px-4 py-2">
                        Check-Out
                      </th>
                      <th className="border border-gray-300 px-4 py-2">
                        Notes
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {timesheets.map((timesheet) => (
                      <tr key={timesheet.attendance_id}>
                        <td className="border border-gray-300 px-4 py-2">
                          {timesheet.attendance_date}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {timesheet.status}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {new Date(
                            timesheet.check_in_time
                          ).toLocaleTimeString()}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {timesheet.check_out_time
                            ? new Date(
                                timesheet.check_out_time
                              ).toLocaleTimeString()
                            : "N/A"}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {timesheet.notes || "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
