"use client";

import { createBrowserClient } from "@supabase/ssr";

export function LoginButton(){
  const signIn = async () => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
    );
    await supabase.auth.signInWithOAuth({
      provider:"google",
      options:{redirectTo:`${window.location.origin}/auth/callback`}
    });
  };
  return <button onClick={signIn} style={{padding:"12px 18px",borderRadius:10,border:"1px solid #ccd5e0",background:"#fff",cursor:"pointer"}}>Continue with Google</button>;
}
