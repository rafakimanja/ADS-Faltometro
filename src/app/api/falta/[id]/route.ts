import { deleteFalta, getFaltaById, updateFalta } from "@/services/falta_service";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest, context: { params: { id: string } }) {
    const { id } = context.params
    const idNum = Number(id)

    if(isNaN(idNum)) {
        return new NextResponse("Invalid ID", {
            status: 400,
        })
    }

    const falta = getFaltaById(idNum)

    if(!falta){
        return new NextResponse("Falta não encontrada", {
            status: 404, 
        })
    }

    return new NextResponse(JSON.stringify(falta), {
        status: 200,
    })
}

export async function PUT(req: NextRequest, context: { params: { id: string } }) {
    const body = await req.json()
    const { id } = context.params
    const idNum = Number(id)

    if(isNaN(idNum)) {
        return new NextResponse("Invalid ID", {
            status: 400,
        })
    }

    const resp = updateFalta(idNum, body)

    if(resp){
        return new NextResponse(JSON.stringify(resp), {
            status: 200,
        })
    } else {
        return new NextResponse("Erro ao atualizar a falta", {
            status: 500,
        })
    }
}

export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
    const { id } = context.params
    const idNum = Number(id)

    if(isNaN(idNum)){
        return new NextResponse("Invalid ID", {
            status: 400,
        })
    }

    if(deleteFalta(idNum)){
        return new NextResponse('Falta deletada com sucesso', {
            status: 200,
        })
    } else {
        return new NextResponse('Erro ao deletar a falta', {
            status: 500,
        })
    }
}