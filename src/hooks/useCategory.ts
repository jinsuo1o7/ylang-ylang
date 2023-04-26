import useSWR from "swr";
import { Category } from ".prisma/client";
export default function useCategory() {
  const { data: categories } = useSWR<Category[]>("/api/category");

  return { categories };
}
