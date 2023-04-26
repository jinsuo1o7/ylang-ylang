import { useCallback } from "react";
import { AddProductInput } from "@/model/product";

export default function useProduct() {
  const getCategories = useCallback(() => {
    return fetch("/api/category");
  }, []);

  const addProduct = useCallback(
    (userId: string, file: File, form: AddProductInput) => {
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("file", file);
      formData.append("title", form.title);
      formData.append("price", form.price.toString());
      formData.append("description", form.description);
      form.categories.map((category) => {
        formData.append("category[]", category);
      });

      return fetch("/api/products", {
        method: "POST",
        body: formData,
      });
    },
    []
  );

  return { addProduct, getCategories };
}
