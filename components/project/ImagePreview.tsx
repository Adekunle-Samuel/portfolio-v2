'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ImagePreviewProps {
  images: string[]
  currentIndex: number
  isOpen: boolean
  onClose: () => void
  onNext: () => void
  onPrevious: () => void
}

export default function ImagePreview({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrevious,
}: ImagePreviewProps) {
  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNext()
      if (e.key === 'ArrowLeft') onPrevious()
    }

    window.addEventListener('keydown', handleKeyDown)
    // Prevent body scroll when preview is open
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose, onNext, onPrevious])

  if (!isOpen || images.length === 0) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-50 text-white hover:text-gray-300 transition-colors"
            aria-label="Close preview"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Image counter */}
          <div className="absolute top-6 left-6 z-50 text-white text-sm font-medium">
            {currentIndex + 1} / {images.length}
          </div>

          {/* Previous button */}
          {images.length > 1 && (
            <button
              onClick={onPrevious}
              className="absolute left-6 z-50 text-white hover:text-gray-300 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous image"
            >
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
          )}

          {/* Image container */}
          <motion.div
            className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={images[currentIndex]}
                alt={`Preview ${currentIndex + 1}`}
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              />
            </AnimatePresence>
          </motion.div>

          {/* Next button */}
          {images.length > 1 && (
            <button
              onClick={onNext}
              className="absolute right-6 z-50 text-white hover:text-gray-300 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next image"
            >
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          )}

          {/* Backdrop click to close */}
          <div
            className="absolute inset-0 -z-10"
            onClick={onClose}
            aria-label="Close preview"
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}


