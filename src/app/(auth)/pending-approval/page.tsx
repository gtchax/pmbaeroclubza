"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Clock, 
  CreditCard, 
  CheckCircle, 
  AlertCircle, 
  Plane, 
  ArrowLeft,
  Mail,
  Phone,
  FileText,
  User
} from "lucide-react"

export default function PendingApprovalPage() {
  const [userStatus] = useState({
    approvalStatus: "PENDING", // PENDING, APPROVED, REJECTED, UNDER_REVIEW
    paymentStatus: "UNPAID", // UNPAID, PARTIAL, PAID
    documentsSubmitted: true,
    registrationComplete: true
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPROVED":
      case "PAID":
        return "bg-green-500"
      case "PENDING":
      case "UNDER_REVIEW":
        return "bg-yellow-500"
      case "REJECTED":
      case "UNPAID":
        return "bg-red-500"
      case "PARTIAL":
        return "bg-orange-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "PENDING":
        return "Pending Review"
      case "UNDER_REVIEW":
        return "Under Review"
      case "APPROVED":
        return "Approved"
      case "REJECTED":
        return "Rejected"
      case "UNPAID":
        return "Payment Required"
      case "PARTIAL":
        return "Partial Payment"
      case "PAID":
        return "Payment Complete"
      default:
        return status
    }
  }

  const calculateProgress = () => {
    let progress = 0
    if (userStatus.registrationComplete) progress += 25
    if (userStatus.documentsSubmitted) progress += 25
    if (userStatus.paymentStatus === "PAID") progress += 25
    if (userStatus.approvalStatus === "APPROVED") progress += 25
    return progress
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] via-[#262626] to-[#1a1a1a] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Back to Home Button */}
        <div className="mb-6">
          <Link href="/">
            <Button 
              variant="outline" 
              className="border-[#f6d57f] text-[#f6d57f] hover:bg-[#f6d57f] hover:text-[#262626] transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Plane className="h-12 w-12 text-[#f6d57f] mr-3" />
            <h1 className="text-4xl font-bold text-white">PMB Aero Club</h1>
          </div>
          <p className="text-gray-300 text-lg">Account Pending Approval</p>
        </div>

        {/* Main Status Card */}
        <Card className="bg-[#262626] border-[#f6d57f] shadow-2xl mb-6">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              <Clock className="h-16 w-16 text-[#f6d57f]" />
            </div>
            <CardTitle className="text-2xl text-white">Welcome to PMB Aero Club!</CardTitle>
            <CardDescription className="text-gray-300 text-lg">
              Your registration has been received and is currently being processed.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Progress Bar */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-medium">Registration Progress</span>
                  <span className="text-[#f6d57f] font-bold">{calculateProgress()}%</span>
                </div>
                <Progress value={calculateProgress()} className="h-3" />
              </div>

              {/* Status Items */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-lg">
                    <div className="flex items-center">
                      <User className="h-5 w-5 text-[#f6d57f] mr-3" />
                      <span className="text-white">Registration</span>
                    </div>
                    <Badge className="bg-green-500 text-white">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Complete
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-lg">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-[#f6d57f] mr-3" />
                      <span className="text-white">Documents</span>
                    </div>
                    <Badge className="bg-green-500 text-white">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Submitted
                    </Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-lg">
                    <div className="flex items-center">
                      <CreditCard className="h-5 w-5 text-[#f6d57f] mr-3" />
                      <span className="text-white">Payment</span>
                    </div>
                    <Badge className={`${getStatusColor(userStatus.paymentStatus)} text-white`}>
                      {userStatus.paymentStatus === "PAID" ? (
                        <CheckCircle className="h-3 w-3 mr-1" />
                      ) : (
                        <AlertCircle className="h-3 w-3 mr-1" />
                      )}
                      {getStatusText(userStatus.paymentStatus)}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-lg">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-[#f6d57f] mr-3" />
                      <span className="text-white">Admin Approval</span>
                    </div>
                    <Badge className={`${getStatusColor(userStatus.approvalStatus)} text-white`}>
                      <Clock className="h-3 w-3 mr-1" />
                      {getStatusText(userStatus.approvalStatus)}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Payment Card */}
          {userStatus.paymentStatus !== "PAID" && (
            <Card className="bg-[#262626] border-[#f6d57f] shadow-2xl">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center">
                  <CreditCard className="h-6 w-6 text-[#f6d57f] mr-2" />
                  Complete Payment
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Complete your membership payment to proceed with approval.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-[#1a1a1a] p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-300">Membership Fee</span>
                      <span className="text-[#f6d57f] font-bold">$299.00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Registration Fee</span>
                      <span className="text-[#f6d57f] font-bold">$50.00</span>
                    </div>
                    <hr className="my-2 border-gray-600" />
                    <div className="flex justify-between items-center">
                      <span className="text-white font-medium">Total</span>
                      <span className="text-[#f6d57f] font-bold text-lg">$349.00</span>
                    </div>
                  </div>
                  <Button className="w-full bg-[#f6d57f] text-[#262626] hover:bg-[#e5c470] font-semibold">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Pay Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Contact Support Card */}
          <Card className="bg-[#262626] border-[#f6d57f] shadow-2xl">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center">
                <Mail className="h-6 w-6 text-[#f6d57f] mr-2" />
                Need Help?
              </CardTitle>
              <CardDescription className="text-gray-300">
                Contact our support team if you have any questions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-[#1a1a1a] rounded-lg">
                  <Mail className="h-5 w-5 text-[#f6d57f] mr-3" />
                  <div>
                    <p className="text-white font-medium">Email Support</p>
                    <p className="text-gray-400 text-sm">support@pmbaeroclub.com</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-[#1a1a1a] rounded-lg">
                  <Phone className="h-5 w-5 text-[#f6d57f] mr-3" />
                  <div>
                    <p className="text-white font-medium">Phone Support</p>
                    <p className="text-gray-400 text-sm">+1 (555) 123-4567</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full border-[#f6d57f] text-[#f6d57f] hover:bg-[#f6d57f] hover:text-[#262626]"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Contact Support
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Information Banner */}
        <Card className="bg-[#1a1a1a] border-gray-600 shadow-2xl mt-6">
          <CardContent className="p-6">
            <div className="flex items-start">
              <AlertCircle className="h-6 w-6 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-white font-semibold mb-2">What happens next?</h3>
                <ul className="text-gray-300 space-y-1 text-sm">
                  <li>• Our admin team will review your application within 2-3 business days</li>
                  <li>• You&apos;ll receive an email notification once your payment is processed</li>
                  <li>• Upon approval, you&apos;ll gain access to your student dashboard</li>
                  <li>• You can then book lessons and access all club resources</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
