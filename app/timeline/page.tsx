"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search } from 'lucide-react'
import { ProtectedRoute } from "@/components/protected-route"

// Mock data for the timeline
const mockDocuments = [
    { id: 1, title: "Blood Test Results", date: "2023-06-01", type: "pdf" },
    { id: 2, title: "X-Ray Image", date: "2023-05-15", type: "image" },
    { id: 3, title: "Doctor's Note", date: "2023-04-22", type: "pdf" },
    // Add more mock documents as needed
]

export default function Timeline() {
    const [searchTerm, setSearchTerm] = useState("")
    const [documents, setDocuments] = useState(mockDocuments)

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        const filteredDocs = mockDocuments.filter(doc =>
            doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doc.date.includes(searchTerm)
        )
        setDocuments(filteredDocs)
    }

    return (
        <ProtectedRoute>
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Document Timeline</h1>
                <form onSubmit={handleSearch} className="mb-4 flex gap-2">
                    <div className="flex-grow">
                        <Label htmlFor="search" className="sr-only">Search</Label>
                        <Input
                            id="search"
                            type="search"
                            placeholder="Search documents..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Button type="submit"><Search className="mr-2 h-4 w-4" /> Search</Button>
                </form>
                <div className="space-y-4">
                    {documents.map(doc => (
                        <Card key={doc.id}>
                            <CardHeader>
                                <CardTitle>{doc.title}</CardTitle>
                                <CardDescription>{doc.date}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>Type: {doc.type}</p>
                                <div className="mt-2">
                                    <Button variant="outline" className="mr-2">Preview</Button>
                                    <Button variant="outline">Download</Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </ProtectedRoute>
    )
}

