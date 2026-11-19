import { NextRequest, NextResponse } from "next/server";
import { ApiError, contactsApi } from "../../contactsApi";

interface SingleContactParams {
  params: Promise<{ id: string }>;
}

export async function GET(
  request: NextRequest,
  { params }: SingleContactParams,
) {
  try {
    const { id } = await params;
    const { data } = await contactsApi.get(`/contacts/${id}`);
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
