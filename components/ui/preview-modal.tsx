"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

interface PreviewModalProps {
    isOpen: boolean
    onClose: () => void
    fileUrl: string
    fileName: string
}

export function PreviewModal({ isOpen, onClose, fileUrl, fileName }: PreviewModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl h-[80vh]">
                <DialogHeader>
                    <DialogTitle>{fileName}</DialogTitle>
                </DialogHeader>
                <div className="flex-1 w-full h-full min-h-[60vh]">
                    <iframe
                        src={`${fileUrl}#toolbar=0`}
                        className="w-full h-full"
                        title={fileName}
                    />
                </div>
            </DialogContent>
        </Dialog>
    )
} 