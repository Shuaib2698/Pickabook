
"use client"

import { useState } from "react"
import { ImageUpload } from "@/components/ImageUpload"
import { ProcessingSteps } from "@/components/ProcessingSteps"
import { ResultDisplay } from "@/components/ResultDisplay"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, Wand2, BookOpen, Star, Download } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type StepStatus = "pending" | "processing" | "completed" | "error"

interface ProcessingStep {
  id: string
  title: string
  description: string
  status: StepStatus
}

export default function Home() {
  const [image, setImage] = useState<string | null>(null)
  const [processing, setProcessing] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [processingSteps, setProcessingSteps] = useState<ProcessingStep[]>([
    {
      id: "upload",
      title: "Upload & Analyze",
      description: "Processing your photo...",
      status: "pending",
    },
    {
      id: "face",
      title: "Face Detection",
      description: "Detecting facial features...",
      status: "pending",
    },
    {
      id: "style",
      title: "Style Transfer",
      description: "Applying storybook style...",
      status: "pending",
    },
    {
      id: "enhance",
      title: "Enhancement",
      description: "Adding magical touches...",
      status: "pending",
    },
  ])
  
  const { toast } = useToast()

  const handleFileUpload = async (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => setImage(e.target?.result as string)
    reader.readAsDataURL(file)

    setProcessing(true)
    setCurrentStep(0)
    
    // Update steps to show processing
    setProcessingSteps(prev => prev.map((step, index) => 
      index === 0 ? { ...step, status: "processing" } : step
    ))
    
    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("http://localhost:8000/api/upload", {
        method: "POST",
        body: formData,
      })
      
      const data = await response.json()
      console.log("Task ID:", data.task_id)

      // Simulate step progression for better UX
      const simulateSteps = async () => {
        for (let i = 0; i < processingSteps.length; i++) {
          setCurrentStep(i)
          setProcessingSteps(prev => prev.map((step, index) => {
            if (index === i) return { ...step, status: "processing" }
            if (index === i - 1) return { ...step, status: "completed" }
            return step
          }))
          
          await new Promise(resolve => setTimeout(resolve, 1500))
        }
        
        // After simulated steps, poll for actual result
        pollResult(data.task_id)
      }
      
      simulateSteps()
      
    } catch (error) {
      console.error("Upload failed:", error)
      setProcessing(false)
      toast({
        title: "Upload Failed",
        description: "Please try again with a different image.",
        variant: "destructive",
      })
    }
  }

  const pollResult = async (taskId: string) => {
    try {
      const resultResponse = await fetch(`http://localhost:8000/api/result/${taskId}`)
      const resultData = await resultResponse.json()

      if (resultData.status === "completed") {
        setResult(`http://localhost:8000${resultData.result_url}`)
        setProcessing(false)
        setProcessingSteps(prev => prev.map(step => ({ ...step, status: "completed" })))
        toast({
          title: "Success!",
          description: "Your personalized illustration is ready!",
        })
      } else if (resultData.status === "failed") {
        setProcessing(false)
        toast({
          title: "Processing Failed",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        })
      } else {
        setTimeout(() => pollResult(taskId), 1000)
      }
    } catch (error) {
      setProcessing(false)
      toast({
        title: "Error",
        description: "Failed to fetch result. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDownload = () => {
    if (result) {
      const link = document.createElement('a')
      link.href = result
      link.download = 'pickabook-illustration.png'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const handleRegenerate = () => {
    if (image) {
      // Convert base64 to blob and re-upload
      fetch(image)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], "image.png", { type: "image/png" })
          handleFileUpload(file)
        })
    }
  }

  const handleStartCreating = () => {
    if (!image) {
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
      if (fileInput) {
        fileInput.click()
      }
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]"></div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-300/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-300/10 rounded-full blur-3xl"></div>
        
        <div className="relative container mx-auto px-4 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border shadow-sm mb-6">
              <Sparkles className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium">Powered by AI</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="text-gradient">Pickabook AI</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Transform any photo into a magical storybook illustration. Perfect for creating personalized children's books and memorable gifts.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="glass border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                  <Wand2 className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Magical Transformation</CardTitle>
                <CardDescription>Turn photos into storybook-style illustrations with AI</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="glass border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Instant Results</CardTitle>
                <CardDescription>Get your personalized illustration in seconds</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="glass border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center mb-4">
                  <Star className="h-6 w-6 text-amber-600" />
                </div>
                <CardTitle>High Quality</CardTitle>
                <CardDescription>Download high-resolution illustrations</CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Upload Area */}
          <Card className="glass border-none shadow-xl mb-12 overflow-hidden">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-3xl">Create Your Storybook Character</CardTitle>
              <CardDescription>
                Upload a photo and watch it transform into a magical illustration
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              {!image ? (
                <div className="space-y-8">
                  <ImageUpload onImageUpload={handleFileUpload} />
                  <div className="text-center text-sm text-gray-500">
                    <p>Upload a clear photo for best results. Works great with portrait photos.</p>
                  </div>
                </div>
              ) : processing ? (
                <div className="space-y-8">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mb-6 animate-pulse">
                      <Wand2 className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-2">Creating Magic...</h3>
                    <p className="text-gray-600">Your storybook illustration is being crafted</p>
                  </div>
                  <ProcessingSteps steps={processingSteps} currentStep={currentStep} />
                </div>
              ) : result ? (
                <div className="space-y-8">
                  <ResultDisplay
                    originalImage={image}
                    processedImage={result}
                    onRegenerate={handleRegenerate}
                    onDownload={handleDownload}
                  />
                  <div className="text-center">
                    <button
                      onClick={() => {
                        setImage(null)
                        setResult(null)
                      }}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Create another illustration →
                    </button>
                  </div>
                </div>
              ) : null}
            </CardContent>
          </Card>

          {/* Footer CTA */}
          <div className="text-center py-8">
            <h3 className="text-2xl font-semibold mb-4">Ready to create magic?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Perfect for birthdays, holidays, or creating lasting memories. Each illustration is unique and crafted with care.
            </p>
            <button
              onClick={handleStartCreating}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:-translate-y-1 shadow-lg"
            >
              <Download className="h-5 w-5" />
              Start Creating
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
