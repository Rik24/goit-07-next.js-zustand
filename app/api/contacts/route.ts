import { NextRequest, NextResponse } from "next/server";
import { ApiError, contactsApi } from "../contactsApi";

export async function GET(request: NextRequest) {
  try {
    const hasWork = await request.nextUrl.searchParams.get("hasWork");
    const { data } = await contactsApi.get("/contacts", {
      params: {
        hasWork,
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
  try {
    const body = await request.json();
    const { data } = await contactsApi.post("/contacts", body);
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
