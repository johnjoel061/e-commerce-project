"use client"

import { Separator } from "../ui/separator"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea"
import ImageUpload from "../custom ui/ImageUpload"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import toast from "react-hot-toast"
import Delete from "../custom ui/Delete"
import { url } from "inspector"
import MultiText from "../custom ui/MultiText"
import MultiSelect from "../custom ui/MultiSelect"


const formSchema = z.object({
    title: z.string().min(2).max(20),
    description: z.string().min(2).max(500).trim(),
    media: z.array(z.string()),
    category: z.string(),
    collections: z.array(z.string()),
    tags: z.array(z.string()),
    sizes: z.array(z.string()),
    colors: z.array(z.string()),
    price: z.coerce.number().min(0.1),
    expense: z.coerce.number().min(0.1),
})

interface ProductFormProps {
    initialData?: ProductType | null;
}

const ProductForm: React.FC<ProductFormProps> = ({ initialData }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData ? initialData : {
            title: "",
            description: "",
            media: [],
            category: "",
            collections: [],
            tags: [],
            sizes: [],
            colors: [],
            price: 0.1,
            expense: 0.1,
        },
    })

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
        }
    }

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);
            const url = initialData ? `/api/products/${initialData._id}` : "/api/products"
            const res = await fetch(url, {
                method: "POST",
                body: JSON.stringify(values)
            })
            if (res.ok) {
                setLoading(false);
                toast.success(`Product ${initialData ? "updated" : "created"}`);
                window.location.href = "/products";
                router.push(`products`);
            }
        } catch (error) {
            console.log("[products_POST]", error);
            toast.error("Something went wrong! Please try again.");
        }
    }

    return (
        <div className='p-10'>
            {initialData ? (
                <div className="flex items-center justify-between">
                    <h1 className='text-heading2-bold'>Edit Product</h1>
                    <Delete id={initialData._id} />
                </div>
            ) : (
                <h1 className='text-heading2-bold'>Create Product</h1>)}
            <Separator className="my-4" />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Title" {...field} onKeyDown={handleKeyPress} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Description" {...field} rows={5} onKeyDown={handleKeyPress} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="media"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Image</FormLabel>
                                <FormControl>
                                    <ImageUpload
                                        value={field.value}
                                        onChange={(url) => field.onChange([...field.value, url])}
                                        onRemove={(url) => field.onChange([...field.value.filter((image) => image !== url)])}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="md:grid md:grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price ($)</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="Price" {...field} onKeyDown={handleKeyPress} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="expense"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Expense ($)</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="Expense" {...field} onKeyDown={handleKeyPress} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Category" {...field} onKeyDown={handleKeyPress} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="tags"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tags</FormLabel>
                                    <FormControl>
                                        <MultiText placeholder="Tags" value={field.value} 
                                        onChange={(tag) => field.onChange([...field.value, tag])} 
                                        onRemove={(tagToRemove) => field.onChange([...field.value.filter((tag) => tag !== tagToRemove)])} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="collections"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Collections</FormLabel>
                                    <FormControl>
                                        <MultiSelect placeholder="Collections" value={field.value} 
                                        onChange={(_id) => field.onChange([...field.value, _id])} 
                                        onRemove={(idToRemove) => field.onChange([...field.value.filter((collectionId) => collectionId !== idToRemove)])} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex gap-10">
                        <Button type="submit" className="bg-blue-1 text-white cursor-pointer">Submit</Button>
                        <Button type="button" onClick={() => router.push("/collections")} className="bg-blue-1 text-white cursor-pointer">Discard</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default ProductForm
