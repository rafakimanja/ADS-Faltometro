import { createFalta } from "@/services/falta_service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json()

    const resp = createFalta(body)

    return new NextResponse(JSON.stringify(resp), {
        status: 201,
    })
}