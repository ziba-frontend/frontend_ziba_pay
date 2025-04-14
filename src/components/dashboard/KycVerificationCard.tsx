//@ts-nocheck
import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Shield, AlertCircle, CheckCircle, Clock, Upload, File, X, Mail } from "lucide-react";
import { useUploadKycDocument } from "@/hooks/useKyc";

const KYCVerificationCard = () => {
  const [kycStatus, setKycStatus] = useState("pending"); 
  const [selectedFile, setSelectedFile] = useState(null);
  const uploadMutation = useUploadKycDocument();
  
  const onDrop = useCallback(acceptedFiles => {
    // Use only the first file if multiple are uploaded
    if (acceptedFiles.length > 0) {
      setSelectedFile(acceptedFiles[0]);
    }
  }, []);
  
  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxSize: 5242880, // 5MB
    maxFiles: 1
  });
  
  const handleStartVerification = () => {
    setKycStatus("in-progress");
  };
  
  const handleUploadDocument = async () => {
    if (selectedFile) {
      try {
        await uploadMutation.mutateAsync(selectedFile);
        // If upload is successful, we could update the status or show next steps
      } catch (error) {
        console.error("Upload failed:", error);
      }
    }
  };
  
  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  const getKYCStepStatus = (step, currentStatus) => {
    if (currentStatus === "verified") return "completed";
    if (currentStatus === "in-progress" && step === "identity") return "in-progress";
    if (currentStatus === "in-progress" && step === "address") return "pending";
    return "pending";
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Shield className="w-5 h-5 text-[#3BD64A] mr-2" />
            <h3 className="text-lg font-semibold text-[#030A11]">KYC Verification</h3>
          </div>
          {kycStatus === "verified" && (
            <span className="flex items-center text-sm font-medium text-green-600">
              <CheckCircle className="w-4 h-4 mr-1" />
              Verified
            </span>
          )}
        </div>
      </div>
      
      <div className="p-6">
        {kycStatus === "pending" ? (
          <div>
            <div className="bg-yellow-50 p-4 rounded-lg mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">Verification Required</h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>To unlock all payment features and increase your transaction limits, please complete the KYC verification process.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Mail className="h-5 w-5 text-blue-500" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">Check Your Email</h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <p>We've sent a KYC form to your registered email address. Please check your inbox, fill out the form completely, and upload it using the dropzone below.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <div 
                {...getRootProps()} 
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                  isDragActive ? 'border-green-400 bg-green-50' : 
                  isDragReject ? 'border-red-400 bg-red-50' : 
                  'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                }`}
              >
                <input {...getInputProps()} />
                
                {selectedFile ? (
                  <div className="flex flex-col items-center">
                    <File className="w-12 h-12 text-blue-500 mb-3" />
                    <p className="text-sm font-medium text-gray-900">{selectedFile.name}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFile();
                      }}
                      className="mt-3 flex items-center text-sm text-red-600 hover:text-red-800"
                    >
                      <X className="w-4 h-4 mr-1" />
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <Upload className="w-12 h-12 text-gray-400 mb-3" />
                    <p className="font-medium text-gray-700">
                      {isDragActive ? "Drop the file here" : "Drag & drop your completed KYC form here"}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      or <span className="text-blue-500">browse files</span>
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      Supports only PDF and DOCX files (max 5MB)
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex flex-col space-y-4">
              <button
                onClick={handleUploadDocument}
                disabled={!selectedFile || uploadMutation.isPending}
                className={`w-full bg-[#3BD64A] text-white py-3 px-4 rounded-lg font-medium transition duration-200 ${
                  !selectedFile || uploadMutation.isPending ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'
                }`}
              >
                {uploadMutation.isPending ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Uploading...
                  </span>
                ) : (
                  <>Upload & Start Verification Process</>
                )}
              </button>
              
              <p className="text-xs text-gray-500 text-center">
                Your information is secure and encrypted. Verification usually takes 24-48 hours once submitted.
              </p>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-4">
                Complete the following steps to verify your account. This will increase your transaction limits and unlock all payment features.
              </p>
              
              {/* Progress Steps */}
              <div className="space-y-6">
                {/* Identity Verification Step */}
                <div className="flex items-start">
                  <div className={`rounded-full p-2 mr-4 ${
                    getKYCStepStatus("identity", kycStatus) === "completed" 
                      ? "bg-green-100" 
                      : getKYCStepStatus("identity", kycStatus) === "in-progress" 
                        ? "bg-blue-100"
                        : "bg-gray-100"
                  }`}>
                    {getKYCStepStatus("identity", kycStatus) === "completed" ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : getKYCStepStatus("identity", kycStatus) === "in-progress" ? (
                      <Clock className="h-5 w-5 text-blue-600" />
                    ) : (
                      <span className="h-5 w-5 flex items-center justify-center rounded-full bg-gray-300 text-white text-xs font-bold">1</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">Identity Verification</h4>
                    <p className="text-sm text-gray-500 mb-3">We're reviewing your submitted KYC document</p>
                    
                    {getKYCStepStatus("identity", kycStatus) === "in-progress" && (
                      <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-700">
                        <p className="flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          Your document is being reviewed. This typically takes 24-48 hours.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Address Verification Step */}
                <div className="flex items-start">
                  <div className={`rounded-full p-2 mr-4 ${
                    getKYCStepStatus("address", kycStatus) === "completed" 
                      ? "bg-green-100" 
                      : getKYCStepStatus("address", kycStatus) === "in-progress" 
                        ? "bg-blue-100"
                        : "bg-gray-100"
                  }`}>
                    {getKYCStepStatus("address", kycStatus) === "completed" ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : getKYCStepStatus("address", kycStatus) === "in-progress" ? (
                      <Clock className="h-5 w-5 text-blue-600" />
                    ) : (
                      <span className="h-5 w-5 flex items-center justify-center rounded-full bg-gray-300 text-white text-xs font-bold">2</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">Address Verification</h4>
                    <p className="text-sm text-gray-500">Verification of your address details will begin after identity verification</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-gray-400 mr-2" />
                <p className="text-xs text-gray-500">
                  Your information is protected with bank-level security and encryption.
                </p>
              </div>
            </div>
            
            <p className="mt-4 text-sm text-blue-600 text-center">
              If you need to update your submitted information, please contact support.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default KYCVerificationCard;