import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (user === null || user === undefined) {
    redirect("/auth/signin");
  }
  return <div>{user.name}</div>;
}
