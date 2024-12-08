"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search } from 'lucide-react'
import { ProtectedRoute } from "@/components/protected-route"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/components/ui/use-toast"
import { collection, query, where, orderBy, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"

interface Document {
    id?: string;
    doc_category: string;
    doc_type: string;
    file_name: string;
    original_name: string;
    patient_name: string;
    status: string;
    storage_path: string;
    test_date: string;
    upload_date: string;
    user_id: string;
}

export default function Timeline() {
    const [searchTerm, setSearchTerm] = useState("")
    const [documents, setDocuments] = useState<Document[]>([])
    const [loading, setLoading] = useState(true)
    const { user } = useAuth()
    const { toast } = useToast()

    const fetchDocuments = async () => {
        if (!user) {
            console.log("No user found, skipping fetch");
            return;
        }

        try {
            console.log("Fetching documents for user:", user.uid);
            const healthRecordsRef = collection(db, 'health_records');
            const q = query(
                healthRecordsRef,
                where('user_id', '==', user.uid),
                where('status', '==', 'active'),
                orderBy('test_date', 'desc')
            );

            console.log("Executing query...");
            const querySnapshot = await getDocs(q);
            console.log("Query complete, documents found:", querySnapshot.size);

            const docs = querySnapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }) as Document);
            
            console.log("Processed documents:", docs);
            setDocuments(docs);
        } catch (error) {
            console.error("Error fetching documents:", error);
            toast({
                title: "Error",
                description: "Failed to fetch documents. Please try again later.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchDocuments();
        }
    }, [user]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        const filteredDocs = documents.filter(doc =>
            doc.doc_category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doc.patient_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doc.test_date.includes(searchTerm)
        )
        setDocuments(filteredDocs)
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
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

                {loading ? (
                    <div className="flex justify-center items-center h-40">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
                    </div>
                ) : documents.length > 0 ? (
                    <div className="space-y-4">
                        {documents.map((doc, index) => (
                            <Card key={index}>
                                <CardHeader>
                                    <CardTitle>{doc.doc_category}</CardTitle>
                                    <CardDescription>
                                        {formatDate(doc.test_date)}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <p><span className="font-semibold">Patient:</span> {doc.patient_name}</p>
                                        <p><span className="font-semibold">Type:</span> {doc.doc_type}</p>
                                        <p><span className="font-semibold">Original File:</span> {doc.original_name}</p>
                                        <div className="mt-4">
                                            <Button variant="outline" className="mr-2">Preview</Button>
                                            <Button variant="outline">Download</Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10">
                        <p className="text-gray-500">No documents found. Upload some documents to see them here.</p>
                        <Button className="mt-4" onClick={() => window.location.href = '/upload'}>
                            Upload Documents
                        </Button>
                    </div>
                )}
            </div>
        </ProtectedRoute>
    )
}

