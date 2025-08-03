import { supabase } from "@/supabaseClient";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.push("/"); // Redirect to homepage or login page
    } else {
      console.error("Logout error:", error.message);
    }
  };

  return (
    <div onClick={handleLogout} className="flex gap-2 align-center">
      <LogOut />
      Log Out
    </div>
  );
}
