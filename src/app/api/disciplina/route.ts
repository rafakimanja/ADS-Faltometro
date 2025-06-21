import { fakeDisciplinas } from "@/db/disciplinas";
import { NextRequest, NextResponse } from "next/server";


export async function GET() {
    return new NextResponse(JSON.stringify(fakeDisciplinas), {
        status: 200
    })
}

export async function POST(req: NextRequest) {
    const body = await req.json()

    const newUser = {
        id: fakeDisciplinas.length + 1,
        ...body,
    }

    fakeDisciplinas.push(newUser)

    return new NextResponse(JSON.stringify(newUser), {
        status: 201,
    })
}