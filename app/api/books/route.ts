import { NextRequest, NextResponse } from "next/server";
import { ApiError, bookApi } from "../booksApi";

export async function GET(request: NextRequest) {
  try {
    const isRead = request.nextUrl.searchParams.get("isRead");
    const { data } = await bookApi.get("/books", {
      params: {
        isRead,
      },
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          (error as ApiError).response?.data?.error ??
          (error as ApiError).message,
      },
      { status: (error as ApiError).status },
    );
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  try {
    const { data } = await bookApi.post("/books", body);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          (error as ApiError).response?.data?.error ??
          (error as ApiError).message,
      },
      { status: (error as ApiError).status },
    );
  }
}
