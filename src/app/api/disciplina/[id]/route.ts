import type { DisciplinaDTO } from "@/@types/disciplinaDTO";
import { getDisciplinaById, updateDisciplina, deleteDisciplina } from "@/services/disciplina_service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } } ) {
    const { id } = await params
    const idNum = Number(id)

    if(isNaN(idNum)) {
        return new NextResponse(JSON.stringify({ error: "Invalid ID" }), 
            { status: 400 }
        )
    }

    const disciplina = await getDisciplinaById(idNum)

    if(!disciplina){
        return new NextResponse(JSON.stringify({ error: 'Disciplina nao encontrada' }), 
            { status: 404 }
        )
    }

    return new NextResponse(JSON.stringify(disciplina), { status: 200 } )
}


export async function PUT( req: NextRequest, { params }: { params: { id: string } } ){
    const body = await req.json()
    const { id } = await params
    const idNum = Number(id)

    if(isNaN(idNum)) {
        return new NextResponse(JSON.stringify({ error: "Invalid ID" }), 
            { status: 400 }
        )
    }

    const { titulo, sigla, creditos, aulas } = body as DisciplinaDTO

    const resp = await updateDisciplina(idNum, { titulo, sigla, creditos, aulas })

    if(!resp){
        return new NextResponse(JSON.stringify({ error: "Disciplina nao encontrada"}), 
            { status: 404 }
        )
    }

    return new NextResponse(JSON.stringify({ message: 'Disciplina atualizada' }), 
        { status: 200 }
    )
}


export async function DELETE(req: NextRequest, { params }: { params: { id: string } } ) {
    const { id } = await params
    const idNum = Number(id)

    if(isNaN(idNum)) {
        return new NextResponse(JSON.stringify({ error: "Invalid ID" }), 
            { status: 400 }
        )
    }

    const resp = await deleteDisciplina(idNum)

    if(resp)
        return new NextResponse(JSON.stringify({ message: 'Disciplina deletada' }), { status: 200 })
    else
        return new NextResponse(JSON.stringify({ error: "Disciplina nao encontrada" }), { status: 404 })
}