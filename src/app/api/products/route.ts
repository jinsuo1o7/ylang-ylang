import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "../../../../lib/session";
import { createProduct, findProducts } from "@/service/productService";
import { AddProductInput } from "@/model/product";

// TODO) 제품 추가 후 확인하기 위해 만든 테스트 용도 추후에 페이징과 정렬을 구현해야 함
export async function GET(req: NextRequest) {
  const products = await findProducts();
  console.log(products[1].categories);
  return new NextResponse("ok");
}
export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (user === undefined) {
    throw new NextResponse("UnAuthorized", { status: 401 });
  }
  const form = await req.formData();
  const file = form.get("file") as Blob;
  const categories = form
    .getAll("category[]")
    .map((category) => String(category));
  console.log(categories);

  const info: AddProductInput = {
    title: form.get("title")!.toString(),
    price: parseInt(form.get("price")!.toString()),
    description: form.get("description")!.toString(),
    categories,
  };

  return createProduct(user.id, file, info) //
    .then(() => new NextResponse("ok", { status: 200 }));
}
