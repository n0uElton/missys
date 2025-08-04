"use client";

import * as React from "react";
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
import { navFinance, navHR, navEmployee } from "@/lib/data";
import { supabase } from "@/supabaseClient";
import { useEffect, useState } from "react";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [user, setUser] = useState<{
    name: string;
    email: string;
    avatar: string;
    role: string;
  } | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData.session?.user.id;

      if (userId) {
        const { data, error } = await supabase
          .from("profiles")
          .select("name, email, role")
          .eq("id", userId)
          .single();

        if (data) {
          setUser({
            name: data.name,
            email: data.email,
            avatar: "",
            role: data.role,
          });
        } else {
          console.error("User fetch error:", error);
        }
      }
    };

    fetchUser();
  }, []);

  if (!user) return <div>Loading...</div>;
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        {(user.role === "Finance" || user.role === "SA") && (
          <NavFinance items={navFinance} />
        )}
        {(user.role === "HR" || user.role === "SA") && <Navhr items={navHR} />}
        {(user.role === "User" || user.role === "SA") && (
          <Navemployee items={navEmployee} />
        )}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
