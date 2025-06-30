import { fakeDisciplinas } from "@/db/disciplinas";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } } ) {
    const { id } = await params
    const idNum = Number(id)

    if(isNaN(idNum)) {
        return new NextResponse("Invalid ID", {
            status: 400,
        })
    }

    const user = fakeDisciplinas.find((disciplina) => disciplina.id === idNum)


    if(!user){
        return new NextResponse("User not found", {
            status: 404, 
        })
    }

    return new NextResponse(JSON.stringify(user), {
        status: 200,
    })
}


export async function PUT(
    req: NextRequest,
    context: { params: { id: string } }
    ){
    
        const body = await req.json()
        const { id } = context.params
        const idNum = Number(id)

        if(isNaN(idNum)){
            return new NextResponse("Invalid ID", {
                status: 400,
            })
        }

        const disc = fakeDisciplinas.find((disciplina) => disciplina.id === idNum)

        if(!disc){
            return new NextResponse("Disciplina not found", {
                status: 404,
            })
        }

        const updateDisciplina = {
            id: disc.id,
            ...body,
        }

        const index = fakeDisciplinas.indexOf(disc)
        fakeDisciplinas[index] = updateDisciplina

        return new NextResponse(JSON.stringify(updateDisciplina), {
            status: 200,
        })
}


export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
    const { id } = context.params
    const idNum = Number(id)

    if(isNaN(idNum)){
        return new NextResponse("Invalid ID", {
            status: 400,
        })
    }

    const disc = fakeDisciplinas.find((d) => d.id === idNum)
    if(!disc){
        return new NextResponse("Disciplina not found", {
            status: 404,
        })
    }

    const index = fakeDisciplinas.indexOf(disc)
    fakeDisciplinas.splice(index, 1)

    return new NextResponse(`Disciplina - ${disc.titulo} - deletada`, {
        status: 200,
    })
}