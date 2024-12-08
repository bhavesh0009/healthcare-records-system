"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import { ProtectedRoute } from "@/components/protected-route"
import { useAuth } from "@/contexts/auth-context"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { storage } from "@/lib/firebase"

export default function Upload() {
    const [file, setFile] = useState<File | null>(null)
    const [progress, setProgress] = useState(0)
    const { toast } = useToast()
    const { user } = useAuth()
    const router = useRouter()

    const callCloudFunction = async (userId: string, fileName: string) => {
        try {
            // Log the request data for debugging
            console.log('Request data:', {
                userId,
                fileName,
                url: process.env.NEXT_PUBLIC_CLOUD_FUNCTION_URL
            });

            const response = await fetch(process.env.NEXT_PUBLIC_CLOUD_FUNCTION_URL!, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Add CORS headers if needed
                    'Accept': 'application/json',
                },
                // Make sure the keys match exactly what the backend expects
                body: JSON.stringify({
                    user_id: userId,
                    file_name: fileName
                }),
                // Add this if you're calling from a browser
                mode: 'cors'
            });

            const data = await response.json();
            if (!data.success) {
                throw new Error(data.message || 'Failed to process file');
            }

            return data;
        } catch (error: any) {
            console.error('Cloud function error:', error);
            throw error;
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0]
            if (selectedFile.size > 10 * 1024 * 1024) {
                toast({
                    title: "File too large",
                    description: "Please select a file smaller than 10MB",
                    variant: "destructive",
                })
                return
            }
            setFile(selectedFile)
        }
    }

    const handleUpload = async () => {
        if (!file || !user) return

        try {
            // Create a unique filename
            const timestamp = Date.now()
            const uniqueFilename = `${timestamp}-${file.name}`

            // Create the storage reference
            const storageRef = ref(storage, `${user.uid}/${uniqueFilename}`)

            // Start upload
            const uploadTask = uploadBytesResumable(storageRef, file)

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const percent = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    )
                    setProgress(percent)
                    console.log("Upload progress:", percent)
                },
                (error) => {
                    console.error("Upload error:", error)
                    toast({
                        title: "Upload failed",
                        description: error.message,
                        variant: "destructive",
                    })
                    setProgress(0)
                },
                async () => {
                    try {
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
                        console.log("File uploaded successfully. URL:", downloadURL)

                        // Call cloud function after successful upload
                        await callCloudFunction(user.uid, uniqueFilename)

                        toast({
                            title: "Success",
                            description: `${file.name} has been uploaded and processed.`,
                        })

                        setFile(null)
                        setProgress(0)
                        router.push("/timeline")
                    } catch (error: any) {
                        console.error("Error in post-upload processing:", error)
                        toast({
                            title: "Warning",
                            description: "File uploaded but processing failed: " + error.message,
                            variant: "destructive",
                        })
                        // Still redirect to timeline as the file was uploaded
                        router.push("/timeline")
                    }
                }
            )
        } catch (error: any) {
            console.error("Upload setup error:", error)
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
            })
        }
    }

    return (
        <ProtectedRoute>
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Upload Document</h1>
                <div className="mb-4">
                    <Label htmlFor="file">Select File (PDF or Image, max 10MB)</Label>
                    <Input
                        id="file"
                        type="file"
                        onChange={handleFileChange}
                        accept=".pdf,image/*"
                        className="mt-2"
                    />
                </div>
                {file && (
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Progress value={progress} className="flex-1" />
                            <span className="text-sm text-gray-500">{progress}%</span>
                        </div>
                        <Button
                            onClick={handleUpload}
                            disabled={progress > 0 && progress < 100}
                        >
                            Upload
                        </Button>
                    </div>
                )}
            </div>
        </ProtectedRoute>
    )
}