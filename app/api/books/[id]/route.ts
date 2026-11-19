import { NextRequest, NextResponse } from "next/server";
import { ApiError, bookApi } from "../../booksApi";

interface GetSingleBookParams {
  params: Promise<{ id: string }>;
}

export async function GET(
  _request: NextRequest,
  { params }: GetSingleBookParams,
) {
  try {
    const { id } = await params;
    const { data } = await bookApi.get(`/books/${id}`);
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

export async function PUT(
  request: NextRequest,
  { params }: GetSingleBookParams,
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { data } = await bookApi.put(`/books/${id}`, body);
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
