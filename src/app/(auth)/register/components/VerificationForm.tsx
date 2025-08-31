"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
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
// import { Label } from "@/components/ui/label"

const verificationSchema = z.object({
  idType: z.enum(["passport", "national_id", "drivers_license", "other"]),
  idNumber: z.string().min(1, "ID number is required"),
  idExpiryDate: z.string().min(1, "Expiry date is required"),
  issuingCountry: z.string().min(2, "Issuing country is required"),
  issuingAuthority: z.string().min(2, "Issuing authority is required"),
  dateOfIssue: z.string().min(1, "Date of issue is required"),
  verificationMethod: z.enum(["sms", "email", "phone_call"]),
  phoneNumber: z.string().min(10, "Phone number is required"),
  email: z.string().email("Please enter a valid email address"),
  acceptTerms: z.boolean().refine(val => val === true, "You must accept the terms and conditions"),
  acceptPrivacy: z.boolean().refine(val => val === true, "You must accept the privacy policy"),
  marketingConsent: z.boolean().optional(),
})

export type VerificationFormData = z.infer<typeof verificationSchema>

interface VerificationFormProps {
  onNext: () => void
  onComplete: (data: VerificationFormData) => void
}

export default function VerificationForm({ onNext, onComplete }: VerificationFormProps) {
  const form = useForm<VerificationFormData>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      idType: "passport",
      verificationMethod: "sms",
      acceptTerms: false,
      acceptPrivacy: false,
      marketingConsent: false,
    },
  })

  const onSubmit = (data: VerificationFormData) => {
   
    // Call onComplete to pass data to parent, then proceed to next step
    onComplete(data)
    onNext()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Identity Document */}
        <Card className="bg-[#1a1a1a] border-gray-600">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Identity Document</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="idType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Document Type *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-[#262626] border-gray-600 text-white">
                          <SelectValue placeholder="Select document type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-[#262626] border-gray-600">
                        <SelectItem value="passport">Passport</SelectItem>
                        <SelectItem value="national_id">National ID Card</SelectItem>
                        <SelectItem value="drivers_license">Driver&apos;s License</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="idNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Document Number *</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-[#262626] border-gray-600 text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="issuingCountry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Issuing Country *</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-[#262626] border-gray-600 text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="issuingAuthority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Issuing Authority *</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-[#262626] border-gray-600 text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dateOfIssue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Date of Issue *</FormLabel>
                    <FormControl>
                      <Input {...field} type="date" className="bg-[#262626] border-gray-600 text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="idExpiryDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Expiry Date *</FormLabel>
                    <FormControl>
                      <Input {...field} type="date" className="bg-[#262626] border-gray-600 text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Contact Verification */}
        <Card className="bg-[#1a1a1a] border-gray-600">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Contact Verification</h3>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="verificationMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Preferred Verification Method *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-[#262626] border-gray-600 text-white">
                          <SelectValue placeholder="Select verification method" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-[#262626] border-gray-600">
                        <SelectItem value="sms">SMS</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="phone_call">Phone Call</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Phone Number *</FormLabel>
                      <FormControl>
                        <Input {...field} className="bg-[#262626] border-gray-600 text-white" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Email Address *</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" className="bg-[#262626] border-gray-600 text-white" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Terms and Conditions */}
        <Card className="bg-[#1a1a1a] border-gray-600">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Terms and Conditions</h3>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="acceptTerms"
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
                        I accept the{" "}
                        <a href="#" className="text-[#f6d57f] hover:underline">
                          Terms and Conditions
                        </a>{" "}
                        *
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="acceptPrivacy"
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
                        I accept the{" "}
                        <a href="#" className="text-[#f6d57f] hover:underline">
                          Privacy Policy
                        </a>{" "}
                        *
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="marketingConsent"
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
                        I would like to receive marketing communications about PMB Aero Club services and events
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Button type="submit" className="w-full" size="lg">
          Continue to Document Upload
        </Button>
      </form>
    </Form>
  )
}
