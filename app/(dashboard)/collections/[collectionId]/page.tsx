"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

import CollectionForm from "@/components/collections/CollectionForm"
import Loader from "@/components/custom ui/Loader"

const CollectionDetails = () => {
    const params = useParams()
    const collectionId = params?.collectionId as string

    const [loading, setLoading] = useState(true)
    const [collectionDetails, setCollectionDetails] = useState<CollectionType | null>(null)

    const getCollectionDetails = async () => {
        if (!collectionId) return

        try {
            const res = await fetch(`/api/collections/${collectionId}`)
            const data = await res.json()
            setCollectionDetails(data)
        } catch (error) {
            console.log("[collectionId_GET]", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getCollectionDetails()
    }, [])

    return loading ? <Loader /> : (
        <CollectionForm initialData={collectionDetails} />
    )
}

export default CollectionDetails
