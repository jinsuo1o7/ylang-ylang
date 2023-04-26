import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function getSession() {
  return getServerSession(authOptions);
}
export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  return session?.user;
}
