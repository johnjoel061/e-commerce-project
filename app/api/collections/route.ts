import Collection from "@/lib/models/Collection";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const { userId } = await auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        await connectToDB();

        const { title, description, image } = await req.json();

        const existingCollection = await Collection.findOne({ title });

        if (existingCollection) {
            return new NextResponse("Collection already exists", { status: 400 });
        }

        const newCollection = await Collection.create({
            title,
            description,
            image,
        });

        return NextResponse.json(newCollection, { status: 201 });
    } catch (error) {
        console.error("[collections_POST]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};
