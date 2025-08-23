import React, { useState, useRef } from "react";
import { Resume } from "@/entities/Resume";
import { UploadFile, ExtractDataFromUploadedFile } from "@/integrations/Core";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, AlertCircle, Upload as UploadIcon, FileText, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";

import FileUploadZone from "../components/FileUploadZone";
import ResumePreview from "../components/ResumePreview";

export default function Page() {
  const navigate = useNavigate();
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = async (file) => {
    setError(null);
    setSuccess(false);
    setIsProcessing(true);
    setUploadedFile(file);

    try {
      // Upload file
      const { file_url } = await UploadFile({ file });

      // Extract data using AI
      const result = await ExtractDataFromUploadedFile({
        file_url,
        json_schema: Resume.schema()
      });

      if (result.status === "success" && result.output) {
        setExtractedData({
          ...result.output,
          file_url,
          file_name: file.name
        });
      } else {
        throw new Error(result.details || "Failed to extract data from resume");
      }
    } catch (err) {
      setError(`Error processing resume: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSaveResume = async (resumeData) => {
    setIsProcessing(true);
    try {
      await Resume.create(resumeData);
      setSuccess(true);
      setTimeout(() => {
        navigate(createPageUrl("Dashboard"));
      }, 2000);
    } catch (err) {
      setError("Error saving resume. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const resetUpload = () => {
    setUploadedFile(null);
    setExtractedData(null);
    setError(null);
    setSuccess(false);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-tr from-blue-600 to-blue-700 rounded-2xl mb-6 shadow-xl">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Parse Resume with AI
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Upload any resume format and let our AI extract structured information 
            with incredible accuracy in seconds.
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <Alert className="mb-8 border-emerald-200 bg-emerald-50">
            <CheckCircle className="h-5 w-5 text-emerald-600" />
            <AlertDescription className="text-emerald-800 font-medium">
              Resume successfully parsed and saved! Redirecting to dashboard...
            </AlertDescription>
          </Alert>
        )}

        {/* Error Message */}
        {error && (
          <Alert variant="destructive" className="mb-8">
            <AlertCircle className="h-5 w-5" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Main Content */}
        {!extractedData ? (
          <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <FileUploadZone
                onFileSelect={handleFileSelect}
                dragActive={dragActive}
                isProcessing={isProcessing}
                uploadedFile={uploadedFile}
              />
            </div>
          </Card>
        ) : (
          <div className="space-y-8">
            {/* Action Bar */}
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-slate-900">Extracted Information</h2>
              <Button
                onClick={resetUpload}
                variant="outline"
                className="border-slate-200 hover:bg-slate-50"
              >
                Upload New Resume
              </Button>
            </div>

            {/* Preview */}
            <ResumePreview
              data={extractedData}
              onSave={handleSaveResume}
              isProcessing={isProcessing}
            />
          </div>
        )}

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">Any Format</h3>
            <p className="text-slate-600 text-sm">PDF, Word, images - we handle them all</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">AI-Powered</h3>
            <p className="text-slate-600 text-sm">Advanced AI extracts structured data</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">Accurate</h3>
            <p className="text-slate-600 text-sm">High precision extraction and parsing</p>
          </div>
        </div>
      </div>
    </div>
  );
}