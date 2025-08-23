import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Image, Loader2, File } from "lucide-react";

export default function FileUploadZone({ onFileSelect, dragActive, isProcessing, uploadedFile }) {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="p-12">
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
        onChange={onFileSelect}
        className="hidden"
      />

      <div 
        onClick={handleClick}
        className={`relative border-2 border-dashed rounded-3xl p-12 text-center cursor-pointer transition-all duration-300 ${
          dragActive 
            ? "border-blue-400 bg-blue-50" 
            : "border-slate-200 hover:border-blue-300 hover:bg-slate-50"
        }`}
      >
        {isProcessing ? (
          <div className="space-y-6">
            <div className="w-20 h-20 mx-auto bg-blue-100 rounded-2xl flex items-center justify-center">
              <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-2">Processing Resume</h3>
              <p className="text-slate-600">
                Our AI is analyzing <span className="font-medium">{uploadedFile?.name}</span>...
              </p>
            </div>
            <div className="w-64 h-2 bg-slate-200 rounded-full mx-auto overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-600 to-blue-700 rounded-full animate-pulse" />
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="w-20 h-20 mx-auto bg-gradient-to-tr from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg">
              <Upload className="w-10 h-10 text-white" />
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-2">
                Drop your resume here
              </h3>
              <p className="text-slate-600 mb-6">
                Or click to browse and select a file
              </p>
            </div>

            <Button 
              onClick={handleClick}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-8 py-3 text-lg shadow-lg"
            >
              <File className="w-5 h-5 mr-2" />
              Choose File
            </Button>

            <div className="flex items-center justify-center space-x-8 text-sm text-slate-500">
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-red-500" />
                <span>PDF</span>
              </div>
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-blue-500" />
                <span>DOC</span>
              </div>
              <div className="flex items-center space-x-2">
                <Image className="w-4 h-4 text-green-500" />
                <span>Images</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}