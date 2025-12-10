
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Share2, RefreshCw, Sparkles, Heart } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ResultDisplayProps {
  originalImage: string
  processedImage: string
  onRegenerate: () => void
  onDownload: () => void
}

export function ResultDisplay({
  originalImage,
  processedImage,
  onRegenerate,
  onDownload,
}: ResultDisplayProps) {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-50 to-amber-50 px-6 py-3 rounded-full border border-amber-200 mb-4">
          <Sparkles className="h-5 w-5 text-yellow-500" />
          <span className="font-semibold text-amber-800">Your Storybook Character is Ready!</span>
        </div>
        <p className="text-gray-600">Compare the original photo with your magical transformation</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl mx-auto">
        <Card className="overflow-hidden border-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b">
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                📸
              </div>
              Original Photo
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="relative aspect-square rounded-xl overflow-hidden border-2 shadow-inner">
              <Image
                src={originalImage}
                alt="Original"
                fill
                className="object-cover transition-transform hover:scale-105 duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-2 shadow-lg hover:shadow-xl transition-shadow duration-300 relative">
          <div className="absolute -top-3 -right-3 z-10">
            <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1 shadow-lg">
              <Heart className="h-3 w-3" fill="white" />
              Magical
            </div>
          </div>
          <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-200 to-purple-200 flex items-center justify-center">
                🎨
              </div>
              Storybook Illustration
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="relative aspect-square rounded-xl overflow-hidden border-2 shadow-inner">
              <Image
                src={processedImage}
                alt="Processed"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
            </div>
            
            <div className="mt-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  onClick={onDownload} 
                  className="h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download HD
                </Button>
                <Button 
                  variant="outline" 
                  onClick={onRegenerate}
                  className="h-12 border-2 font-semibold hover:bg-gray-50"
                >
                  <RefreshCw className="mr-2 h-5 w-5" />
                  Regenerate
                </Button>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full h-12 border-2 font-semibold hover:bg-gray-50"
              >
                <Share2 className="mr-2 h-5 w-5" />
                Share with Friends
              </Button>
              
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-emerald-200 rounded-xl p-4 mt-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="h-4 w-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-emerald-800 mb-1">✨ Your magical illustration is ready!</p>
                    <p className="text-sm text-emerald-700">
                      Download your high-resolution image or regenerate with different styles. Perfect for storybooks, gifts, or wall art!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="max-w-2xl mx-auto text-center">
        <div className="inline-flex flex-wrap gap-4 justify-center">
          <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded-full">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            HD Quality
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded-full">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            Print Ready
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded-full">
            <div className="w-2 h-2 rounded-full bg-purple-500"></div>
            No Watermark
          </div>
        </div>
      </div>
    </div>
  )
}