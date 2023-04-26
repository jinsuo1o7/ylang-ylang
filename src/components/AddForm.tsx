"use client";
import { AuthUser } from "@/model/user";
import { ChangeEvent, FormEvent, useState } from "react";
import { AddProductInput } from "@/model/product";
import useProduct from "@/hooks/useProduct";
import useCategory from "@/hooks/useCategory";

type Props = { user: AuthUser };

const initInfo = {
  title: "",
  price: 0,
  description: "",
  categories: [],
};
export default function AddForm({ user }: Props) {
  const { addProduct } = useProduct();
  const [file, setFile] = useState<File>();
  const [info, setInfo] = useState<AddProductInput>(initInfo);
  const { categories } = useCategory();
  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    if (value === "" || info.categories.includes(value)) return;
    setInfo((prev) => ({
      ...prev,
      categories: [...prev.categories, value],
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert("no file");
      return;
    }
    addProduct(user.id, file, info)
      .then(() => {
        alert("uploaded");
      })
      .catch((e) => {
        alert("제품 업로드 중에 에러");
        console.error(e.message);
      });
  };

  return (
    <form className="flex" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="image">Image</label>
        <input id="image" type="file" onChange={handleFile} />
      </div>
      <div className="flex flex-col">
        <label htmlFor="category">Category</label>
        <select name="category" id="category" onChange={handleCategory}>
          <option value={""}>Choose a Category</option>
          {categories &&
            categories.map(({ id, name }) => (
              <option key={id} value={name}>
                {name}
              </option>
            ))}
        </select>
        <label htmlFor="title">Title</label>
        <input id="title" name="title" type="text" onChange={handleChange} />
        <label htmlFor="price">Price</label>
        <input id="price" name="price" type="number" onChange={handleChange} />
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" onChange={handleChange} />
      </div>
      <button>Submit</button>
    </form>
  );
}
