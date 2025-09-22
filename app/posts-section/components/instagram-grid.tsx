"use client"
import { useRef, useState } from 'react'
import { InstagramPost } from './instagram-post'
import { GraphApiResponse } from '@/lib/api/graph-api/graph-api.interface'

interface InstagramGridProps extends GraphApiResponse {
  limit?: number
}

export function InstagramGrid({ data, limit = 8 }: InstagramGridProps) {
  const allPosts = data || []
  const [currentPage, setCurrentPage] = useState(0)
  const totalPages = Math.ceil(allPosts.length / limit)

  const currentPosts = allPosts.slice(currentPage * limit, (currentPage + 1) * limit)

  const goToPrevious = () => {
    setCurrentPage(prev => Math.max(0, prev - 1))
  }

  const goToNext = () => {
    setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))
  }

  return (
    <div className="w-full max-w-6xl mx-auto relative">
      {/* Left arrow */}
      {currentPage > 0 && (
        <button
          type="button"
          aria-label="Anterior"
          onClick={goToPrevious}
          className="hidden md:flex absolute -left-20 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-10 h-10 rounded-full bg-white/90 shadow-lg hover:bg-white transition-colors"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 grid-rows-2 overflow-hidden">
        {currentPosts.map((post) => (
          <InstagramPost key={post.id} post={post} />
        ))}
      </div>

      {/* Right arrow */}
      {currentPage < totalPages - 1 && (
        <button
          type="button"
          aria-label="Próximo"
          onClick={goToNext}
          className="hidden md:flex absolute -right-20 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-10 h-10 rounded-full bg-white/90 shadow-lg hover:bg-white transition-colors"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
        </button>
      )}
    </div>
  )
}