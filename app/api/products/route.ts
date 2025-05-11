import Product from "@/lib/models/Product";
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

        const { title, description, media, category, collections, tags, sizes, colors, price, expense } = await req.json();

        if (!title || !description || !media || !category || !price || !expense) {
            return new NextResponse("Not enough data to create a product", { status: 400 });
        }

        const newProduct = await Product.create({
            title,
            description,
            media, category, 
            collections, tags, 
            sizes, colors, 
            price, expense
        });

        await newProduct.save();

        return NextResponse.json(newProduct, { status: 201 });
    } catch (error) {
        console.error("[products_POST]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};