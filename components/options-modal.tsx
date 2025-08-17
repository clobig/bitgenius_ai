"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface OptionsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function OptionsModal({ isOpen, onClose }: OptionsModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<"sendcode" | "invoice">("sendcode")
  const [duration, setDuration] = useState<string>("")

  const handleSave = async () => {
    try {
      const response = await fetch("/api/methods", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          method: selectedMethod,
          duration: duration,
        }),
      })

      if (response.ok) {
        console.log("Settings saved successfully")
        onClose()
      }
    } catch (error) {
      console.error("Error saving settings:", error)
    }
  }

  const handleReset = () => {
    setSelectedMethod("sendcode")
    setDuration("")
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-600 rounded-lg p-6 w-full max-w-md space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-white text-lg font-medium">Options</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-xl">
            ×
          </button>
        </div>

        {/* Method selection buttons */}
        <div className="space-y-3">
          <div className="flex gap-2">
            <Button
              onClick={() => setSelectedMethod("sendcode")}
              className={`flex-1 ${
                selectedMethod === "sendcode"
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-gray-500 hover:bg-gray-600 text-gray-300"
              }`}
            >
              Private Code
            </Button>
            <Button
              onClick={() => setSelectedMethod("invoice")}
              className={`flex-1 ${
                selectedMethod === "invoice"
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-gray-500 hover:bg-gray-600 text-gray-300"
              }`}
            >
              Pay Invoice
            </Button>
          </div>
        </div>

        {/* Duration dropdown */}
        <div className="space-y-2">
          <label className="text-white text-sm">Choose Duration:</label>
          <Select value={duration} onValueChange={setDuration}>
            <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
              <SelectValue placeholder="-- Select --" />
            </SelectTrigger>
            <SelectContent className="bg-slate-700 border-slate-600">
              <SelectItem value="1hour" className="text-white hover:bg-slate-600">
                1 Hour
              </SelectItem>
              <SelectItem value="1day" className="text-white hover:bg-slate-600">
                1 Day
              </SelectItem>
              <SelectItem value="1week" className="text-white hover:bg-slate-600">
                1 Week
              </SelectItem>
              <SelectItem value="1month" className="text-white hover:bg-slate-600">
                1 Month
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 pt-4">
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white px-6">
            Save
          </Button>
          <Button onClick={handleReset} variant="secondary" className="bg-slate-700 hover:bg-slate-800 text-white px-6">
            Reset
          </Button>
        </div>
      </div>
    </div>
  )
}
