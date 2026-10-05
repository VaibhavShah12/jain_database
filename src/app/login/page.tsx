import { LoginButton } from "@/components/auth/LoginButton";

export default function LoginPage(){
  return <main className="card">
    <h1>Jain Database</h1>
    <p className="muted">Sign in with your approved Google account to continue.</p>
    <LoginButton />
  </main>;
}
