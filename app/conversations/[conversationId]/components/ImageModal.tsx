"use client"

import Modal from "@/app/components/Modal"
import Image from "next/image"

interface ImageModalProps {
    isOpen?: boolean
    onClose: () => void
    src?: string | null
    alt?: string | null
}

const ImageModal: React.FC<ImageModalProps> = ({
    isOpen,
    onClose,
    src,
    alt,
}) => {
    if(!src || !alt) {
        return null
    }
    return ( <Modal isOpen={isOpen} onClose={onClose}>
        <div className="w-80 h-80">
            <Image fill src={src} alt={alt} className="object-cover" />
        </div>
    </Modal> );
}
 
export default ImageModal;