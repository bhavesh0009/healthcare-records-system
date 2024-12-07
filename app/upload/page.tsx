"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import { ProtectedRoute } from "@/components/protected-route"

export default function Upload() {
    const [file, setFile] = useState<File | null>(null)
    const [progress, setProgress] = useState(0)
    const { toast } = useToast()

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
        if (!file) return

        // Simulating file upload with progress
        for (let i = 0; i <= 100; i += 10) {
            setProgress(i)
            await new Promise(resolve => setTimeout(resolve, 500))
        }

        toast({
            title: "File uploaded successfully",
            description: `${file.name} has been uploaded.`,
        })

        setFile(null)
        setProgress(0)
    }

    return (
        <ProtectedRoute>
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Upload Document</h1>
                <div className="mb-4">
                    <Label htmlFor="file">Select File (PDF or Image, max 10MB)</Label>
                    <Input id="file" type="file" onChange={handleFileChange} accept=".pdf,image/*" />
                </div>
                {file && (
                    <>
                        <Progress value={progress} className="mb-4" />
                        <Button onClick={handleUpload}>Upload</Button>
                    </>
                )}
            </div>
        </ProtectedRoute>
    )
}