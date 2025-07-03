import { FaltaDTO } from "@/@types/faltaDTO";
import { deleteFalta, getFaltaById, updateFalta } from "@/services/falta_service";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest, { params }: { params: { id: string } } ) {
    const { id } = await params
    const idNum = Number(id)

    if(isNaN(idNum)) {
        return new NextResponse(JSON.stringify({ error: "Invalid ID" }), 
            { status: 400 }
        )
    }

    const falta = await getFaltaById(idNum)

    if(!falta){
        return new NextResponse(JSON.stringify({ error: 'Falta nao encontrada' }), 
            { status: 404 }
        )
    }

    return new NextResponse(JSON.stringify(falta), { status: 200 })
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } } ){
    const body = await req.json()
    const { id } = await params
    const idNum = Number(id)

    if(isNaN(idNum)) {
        return new NextResponse(JSON.stringify({ error: "Invalid ID" }), 
            { status: 400 }
        )
    }

    const { data, disciplinaID, periodosFaltados } = body as FaltaDTO

    const resp = await updateFalta(idNum, { data, disciplinaID, periodosFaltados })

    if(!resp){
        return new NextResponse("Falta nao registrada", {
            status: 404,
        })
    }

    return new NextResponse(JSON.stringify({
            message: 'Falta atualizada',
            data: resp
        }),
        { status: 200 }
    )
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } } ){
    const { id } =  await params
    const idNum = Number(id)

    if(isNaN(idNum)) {
        return new NextResponse(JSON.stringify({ error: "Invalid ID" }), 
            { status: 400 }
        )
    }

    const resp = await deleteFalta(idNum)

    if(resp)
        return new NextResponse(JSON.stringify({ message: 'Falta deletada' }), { status: 200 })
    else
        return new NextResponse(JSON.stringify({ error: "Falta nao encontrada" }), { status: 404 })
}