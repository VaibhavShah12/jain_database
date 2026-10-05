import { requireAllowedUser } from "@/lib/auth/requireAllowedUser";
import { SignOutButton } from "@/components/auth/SignOutButton";
export default async function DashboardPage(){
 const {user,allowed}=await requireAllowedUser();
 return <main className="card"><h1>Secure Application Shell</h1><p className="ok">Authenticated and allow-listed.</p><p><strong>Email:</strong> {user.email}</p><p><strong>Role:</strong> {allowed.role}</p><SignOutButton/></main>;
}
