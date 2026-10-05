import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { User } from "@supabase/supabase-js";
export type AllowedUser={email_normalised:string;role:"admin"|"user";is_active:boolean};
export type AuthContext={user:User;allowed:AllowedUser;supabase:Awaited<ReturnType<typeof createSupabaseServerClient>>};
export async function requireAllowedUser():Promise<AuthContext>{
 const supabase=await createSupabaseServerClient();
 const {data:{user}}=await supabase.auth.getUser();
 if(!user?.email) redirect("/login");
 const email=user.email.trim().toLowerCase();
 const {data:allowed,error}=await supabase.from("allowed_users").select("email_normalised,role,is_active").eq("email_normalised",email).maybeSingle();
 if(error||!allowed||!allowed.is_active) redirect("/access-denied");
 return {user,allowed:allowed as AllowedUser,supabase};
}
