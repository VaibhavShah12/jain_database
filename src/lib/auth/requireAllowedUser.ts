import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type AllowedUser = {
  email_normalised: string;
  role: "admin" | "user";
  is_active: boolean;
};

export async function requireAllowedUser(): Promise<{
  user: {
    id: string;
    email?: string;
  };
  allowed: AllowedUser;
  supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>;
}> {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    redirect("/login");
  }

  const email = user.email.trim().toLowerCase();

  const { data: allowed, error } = await supabase
    .from("allowed_users")
    .select("email_normalised, role, is_active")
    .eq("email_normalised", email)
    .maybeSingle();

  if (error || !allowed || !allowed.is_active) {
    redirect("/access-denied");
  }

  return {
    user: {
      id: user.id,
      email: user.email,
    },
    allowed: allowed as AllowedUser,
    supabase,
  };
}
