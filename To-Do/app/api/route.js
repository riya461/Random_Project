import { NextResponse } from "next/server";
import { ConnectDB } from "../../lib/config/db";
import TodoModel from "../../lib/models/TodoModel";


const LoadDB = async () =>{
    await ConnectDB();
}

LoadDB();

export async function GET(request){
    const todos = await TodoModel.find({
        
    });
    return NextResponse.json({
        todo:todos,
        msg:"To-do fetched successfully!"
    })
}

export async function POST(request){
    

    const {title,description} = await request.json();

    await TodoModel.create({
        title,
        description
    })

    return NextResponse.json({
        msg:"To-do created successful"
    })
}

export async function DELETE(request){

    const mongoId = await request.nextUrl.searchParams.get('mongoId')

    await TodoModel.findByIdAndDelete(mongoId);

    return NextResponse.json({msg:"Todo Deleted!"})

}

export async function PUT(request) {
    const mongoId = request.nextUrl.searchParams.get('mongoId');
    
      await TodoModel.findByIdAndUpdate(mongoId, {
        $set: {
          isCompleted: true,
        },
      });
      
      return NextResponse.json({ msg: "Updated to-do!" });
    
  }
