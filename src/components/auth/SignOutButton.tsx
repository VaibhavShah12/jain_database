"use client";
import { createBrowserClient } from "@supabase/ssr";
export function SignOutButton(){const signOut=async()=>{const supabase=createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!);await supabase.auth.signOut();window.location.href="/login";};return <button onClick={signOut} style={{marginTop:20,padding:"10px 16px",borderRadius:10,border:0,cursor:"pointer"}}>Sign out</button>;}
