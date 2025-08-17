"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { OptionsModal } from "@/components/options-modal"

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-700 flex items-center justify-center p-4">
      <div className="text-center space-y-8">
        {/* Logo with gradient text */}
        <div className="space-y-2">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Bit-Genius
          </h1>
          <span className="text-white text-lg ml-4">1.0.0</span>
        </div>

        {/* Subtitle */}
        <p className="text-gray-300 text-lg">
          Made by <span className="text-gray-400">Clobig</span>
        </p>

        {/* Action buttons */}
        <div className="flex gap-4 justify-center">
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md flex items-center gap-2"
          >
            <span>📁</span>
            Start
          </Button>
          <Button
            variant="secondary"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md flex items-center gap-2"
          >
            <span>📺</span>
            Watch Video
          </Button>
        </div>
      </div>

      <OptionsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
