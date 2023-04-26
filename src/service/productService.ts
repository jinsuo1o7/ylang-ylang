import { AddProductInput } from "@/model/product";
import { supabase } from "../../lib/supabase";
import prisma from "../../lib/prisma";
import { nanoid } from "nanoid";

export async function createProduct(
  userId: string,
  file: Blob,
  info: AddProductInput
) {
  const { title, price, description, categories } = info;
  const name = nanoid();
  const ext = file.type.split("/")[1];
  const { data, error } = await supabase.storage
    .from(process.env.SUPABASE_BUCKET ?? "")
    .upload(`${name}.${ext}`, file);

  if (!data) return;
  if (error) {
    console.error(error);
    return;
  }
  const image = `${process.env.SUPABASE_URL ?? ""}/storage/v1/object/public/${
    process.env.SUPABASE_BUCKET
  }/${data.path}`;

  console.log(categories);
  const findCategories = await prisma.category.findMany({
    where: {
      name: {
        in: categories,
      },
    },
  });
  console.log(findCategories);

  return prisma.product.create({
    data: {
      image,
      title,
      price,
      description,
      categories: {
        connect: findCategories.map((category) => ({ id: category.id })),
      },
      uploaderById: userId,
    },
  });
}

export async function findCategories() {
  return prisma.category.findMany();
}

// TODO) 제품을 추가하고 확인하기 위해 만든 임시 코드 추후에 페이징 쿼리를 구현해야 함
export async function findProducts() {
  return prisma.product.findMany({
    include: {
      categories: {
        select: {
          name: true,
        },
      },
    },
  });
}
