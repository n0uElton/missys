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

      // Fetch username from the users table
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
        toast.message(`Welcome, ${data.full_name || "User"}`);
      }

      setLoading(false);
    };

    checkUser();

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_OUT") {
          router.push("/");
          setUsername(null);
        } else if (session) {
          setUser(session.user);
          // Fetch username on auth state change
          const { data, error } = await supabase
            .from("profiles")
            .select("full_name")
            .eq("id", session.user.id)
            .single();

          if (error || !data) {
            console.error(
              "Error fetching name:",
              error?.message || "No user data found"
            );
            setUsername(null);
          } else {
            setUsername(data.full_name);
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
      </SidebarInset>
    </SidebarProvider>
  );
}