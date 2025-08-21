"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Upload, File, X, CheckCircle } from "lucide-react"

const documentsSchema = z.object({
  identityDocument: z.object({
    file: z.any().optional(),
    uploaded: z.boolean(),
    verified: z.boolean(),
  }),
  proofOfAddress: z.object({
    file: z.any().optional(),
    uploaded: z.boolean(),
    verified: z.boolean(),
  }),
  aviationLicense: z.object({
    file: z.any().optional(),
    uploaded: z.boolean(),
    verified: z.boolean(),
  }),
  medicalCertificate: z.object({
    file: z.any().optional(),
    uploaded: z.boolean(),
    verified: z.boolean(),
  }),
  additionalDocuments: z.array(z.object({
    id: z.string(),
    name: z.string(),
    type: z.string(),
    file: z.any(),
    uploaded: z.boolean(),
  })),
  documentNotes: z.string().optional(),
  acceptDocumentTerms: z.boolean().refine(val => val === true, "You must accept the document terms"),
})

type DocumentsFormData = z.infer<typeof documentsSchema>

interface DocumentsFormProps {
  onNext: () => void
}

export default function DocumentsForm({ onNext }: DocumentsFormProps) {
  const [additionalDocs, setAdditionalDocs] = useState<Array<{ id: string; name: string; type: string; file: File | null; uploaded: boolean }>>([])

  const form = useForm<DocumentsFormData>({
    resolver: zodResolver(documentsSchema),
    defaultValues: {
      identityDocument: { uploaded: false, verified: false },
      proofOfAddress: { uploaded: false, verified: false },
      aviationLicense: { uploaded: false, verified: false },
      medicalCertificate: { uploaded: false, verified: false },
      additionalDocuments: [],
      acceptDocumentTerms: false,
    },
  })

  const onSubmit = (data: DocumentsFormData) => {
    console.log("Documents data:", data)
    onNext()
  }

  const handleFileUpload = (fieldName: keyof DocumentsFormData, file: File) => {
    form.setValue(fieldName, { file, uploaded: true, verified: false } as DocumentsFormData[keyof DocumentsFormData])
  }

  const handleRemoveFile = (fieldName: keyof DocumentsFormData) => {
    form.setValue(fieldName, { file: undefined, uploaded: false, verified: false } as DocumentsFormData[keyof DocumentsFormData])
  }

  const addAdditionalDocument = () => {
    const newDoc = {
      id: Date.now().toString(),
      name: "",
      type: "",
      file: null,
      uploaded: false,
    }
    setAdditionalDocs([...additionalDocs, newDoc])
  }

  const removeAdditionalDocument = (id: string) => {
    setAdditionalDocs(additionalDocs.filter(doc => doc.id !== id))
  }

  const updateAdditionalDocument = (id: string, field: string, value: string | File) => {
    setAdditionalDocs(additionalDocs.map(doc => 
      doc.id === id ? { ...doc, [field]: value } : doc
    ))
  }

  const FileUploadField = ({ 
    label, 
    fieldName, 
    description, 
    required = false 
  }: { 
    label: string
    fieldName: keyof DocumentsFormData
    description: string
    required?: boolean
  }) => {
    const field = form.watch(fieldName) as { uploaded?: boolean; verified?: boolean; file?: File }
    
    return (
      <FormItem>
        <FormLabel className="text-white">
          {label} {required && "*"}
        </FormLabel>
        <div className="space-y-2">
          {!field?.uploaded ? (
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-[#f6d57f] transition-colors">
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-300 mb-2">{description}</p>
              <Input
                type="file"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) handleFileUpload(fieldName, file)
                }}
                className="hidden"
                id={`${fieldName}-upload`}
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById(`${fieldName}-upload`)?.click()}
                className="bg-[#262626] border-gray-600 text-white hover:bg-[#f6d57f] hover:text-[#262626]"
              >
                Choose File
              </Button>
            </div>
          ) : (
            <div className="bg-[#262626] border border-gray-600 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <File className="h-6 w-6 text-[#f6d57f]" />
                  <div>
                    <p className="text-white font-medium">{field.file?.name}</p>
                                         <p className="text-gray-400 text-sm">
                       {field.file?.size ? (field.file.size / 1024 / 1024).toFixed(2) : '0'} MB
                     </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {field.verified && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveFile(fieldName)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
        <FormMessage />
      </FormItem>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Required Documents */}
        <Card className="bg-[#1a1a1a] border-gray-600">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Required Documents</h3>
            <div className="space-y-6">
              <FileUploadField
                label="Identity Document"
                fieldName="identityDocument"
                description="Upload a clear copy of your passport, national ID, or driver's license"
                required
              />
              
              <FileUploadField
                label="Proof of Address"
                fieldName="proofOfAddress"
                description="Upload a recent utility bill, bank statement, or lease agreement (not older than 3 months)"
                required
              />
              
              <FileUploadField
                label="Aviation License (if applicable)"
                fieldName="aviationLicense"
                description="Upload your pilot license, student pilot certificate, or other aviation credentials"
              />
              
              <FileUploadField
                label="Medical Certificate (if applicable)"
                fieldName="medicalCertificate"
                description="Upload your current medical certificate if you hold one"
              />
            </div>
          </CardContent>
        </Card>

        {/* Additional Documents */}
        <Card className="bg-[#1a1a1a] border-gray-600">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Additional Documents</h3>
              <Button
                type="button"
                variant="outline"
                onClick={addAdditionalDocument}
                className="bg-[#262626] border-gray-600 text-white hover:bg-[#f6d57f] hover:text-[#262626]"
              >
                Add Document
              </Button>
            </div>
            
            {additionalDocs.length === 0 ? (
              <p className="text-gray-400 text-center py-8">
                No additional documents uploaded yet
              </p>
            ) : (
              <div className="space-y-4">
                {additionalDocs.map((doc) => (
                  <div key={doc.id} className="bg-[#262626] border border-gray-600 rounded-lg p-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      <Input
                        placeholder="Document name"
                        value={doc.name}
                        onChange={(e) => updateAdditionalDocument(doc.id, "name", e.target.value)}
                        className="bg-[#1a1a1a] border-gray-600 text-white"
                      />
                      <Select onValueChange={(value) => updateAdditionalDocument(doc.id, "type", value)}>
                        <SelectTrigger className="bg-[#1a1a1a] border-gray-600 text-white">
                          <SelectValue placeholder="Document type" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#262626] border-gray-600">
                          <SelectItem value="certificate">Certificate</SelectItem>
                          <SelectItem value="reference">Reference Letter</SelectItem>
                          <SelectItem value="training">Training Record</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="flex items-center space-x-2">
                        <Input
                          type="file"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) updateAdditionalDocument(doc.id, "file", file)
                          }}
                          className="bg-[#1a1a1a] border-gray-600 text-white"
                          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeAdditionalDocument(doc.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Document Notes */}
        <Card className="bg-[#1a1a1a] border-gray-600">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Additional Notes</h3>
            <FormField
              control={form.control}
              name="documentNotes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Special Instructions or Notes</FormLabel>
                  <FormControl>
                    <textarea
                      {...field}
                      className="w-full min-h-[100px] p-3 bg-[#262626] border border-gray-600 rounded-md text-white resize-none focus:border-[#f6d57f] focus:outline-none"
                      placeholder="Add any special instructions or notes about your documents..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Document Terms */}
        <Card className="bg-[#1a1a1a] border-gray-600">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Document Terms</h3>
            <FormField
              control={form.control}
              name="acceptDocumentTerms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="mt-1"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-white text-sm">
                      I confirm that all uploaded documents are authentic, current, and belong to me. 
                      I understand that providing false or misleading information may result in the rejection 
                      of my application and potential legal consequences. *
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Button type="submit" className="w-full" size="lg">
          Complete Registration
        </Button>
      </form>
    </Form>
  )
}
