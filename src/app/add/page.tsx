import { redirect } from "next/navigation";
import { getCurrentUser } from "../../../lib/session";
import AddForm from "@/components/AddForm";

export default async function Page() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/auth/signin");
  }
  return (
    <div>
      <AddForm user={user} />
    </div>
  );
}
