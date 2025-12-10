
"use client"

import { Check, Loader2, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProcessingStep {
  id: string
  title: string
  description: string
  status: "pending" | "processing" | "completed" | "error"
}

interface ProcessingStepsProps {
  steps: ProcessingStep[]
  currentStep: number
}

export function ProcessingSteps({ steps, currentStep }: ProcessingStepsProps) {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      {steps.map((step, index) => (
        <div
          key={step.id}
          className={cn(
            "flex items-center gap-4 p-6 rounded-xl border-2 transition-all duration-300",
            step.status === "completed" && "bg-green-50/50 border-green-200 shadow-sm",
            step.status === "processing" && "bg-gradient-to-r from-blue-50/50 to-purple-50/50 border-blue-200 shadow-md",
            step.status === "error" && "bg-red-50/50 border-red-200",
            step.status === "pending" && "bg-white/50 border-gray-200",
            step.status === "processing" && "animate-pulse"
          )}
        >
          <div className="relative">
            <div
              className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300",
                step.status === "completed" && "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg",
                step.status === "processing" && "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg animate-pulse",
                step.status === "error" && "bg-red-500 text-white",
                step.status === "pending" && "bg-gray-100 text-gray-400"
              )}
            >
              {step.status === "completed" ? (
                <Check className="h-6 w-6" />
              ) : step.status === "processing" ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                <span className="text-lg font-bold">{index + 1}</span>
              )}
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "absolute left-6 top-12 w-0.5 h-10 transition-colors duration-300",
                  steps[index + 1]?.status === "completed" 
                    ? "bg-gradient-to-b from-green-300 to-emerald-300" 
                    : "bg-gray-200"
                )}
              />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-lg">{step.title}</h4>
              {step.status === "processing" && (
                <Sparkles className="h-4 w-4 text-yellow-500 animate-pulse" />
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
            {step.status === "processing" && (
              <div className="mt-3">
                <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 animate-[progress_1.5s_ease-in-out_infinite]" />
                </div>
              </div>
            )}
          </div>
          {step.status === "completed" && (
            <div className="text-xs text-green-600 font-medium px-3 py-1 bg-green-100 rounded-full">
              Complete
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
