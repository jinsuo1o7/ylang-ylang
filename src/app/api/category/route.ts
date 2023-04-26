import { findCategories } from "@/service/productService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  return findCategories() //
    .then((categories) => NextResponse.json(categories));
}
