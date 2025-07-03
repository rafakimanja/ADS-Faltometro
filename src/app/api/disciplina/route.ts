import type { DisciplinaDTO } from "@/@types/disciplinaDTO";
import { createDisciplina, getDisciplinas } from "@/services/disciplina_service";
import { NextRequest, NextResponse } from "next/server";


export async function GET() {
    const disciplinas = await getDisciplinas()
    return new NextResponse(JSON.stringify(disciplinas), {
        status: 200
    })
}

export async function POST(req: NextRequest) {
    const body = await req.json()

    const { titulo, sigla, creditos, aulas } = body as DisciplinaDTO

    const resp = await createDisciplina({ titulo, sigla, creditos, aulas })

    if(resp)
        return new NextResponse( JSON.stringify({ message: 'Nova disciplina cadastrada com sucesso.' }), { status: 201 })
    else
        return new NextResponse( JSON.stringify({ error: 'Erro ao criar disciplina.' }), { status: 500 })
}