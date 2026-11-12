import { useState, useEffect } from "react";
import { ChevronLeft, Info, Calendar, FileText, CheckCircle2, Clock, AlertCircle, X, Phone, Globe, Instagram, Linkedin, Upload, BookOpen, HelpCircle, ExternalLink, MapPin, RotateCcw } from "lucide-react";
import { Progress } from "./ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import DocumentUpload from "./DocumentUpload";
import svgPaths from "../imports/svg-2b3thlea66";

interface DashboardProps {
  user: {
    name: string;
    email: string;
    mobile: string;
  };
  onStartApplication: () => void;
  onChooseSlot: () => void;
  onBackToPersona: () => void;
  openDocumentsOnDashboard?: boolean;
  setOpenDocumentsOnDashboard?: (value: boolean) => void;
}

export default function Dashboard({ user, onStartApplication, onChooseSlot, onBackToPersona, openDocumentsOnDashboard = false, setOpenDocumentsOnDashboard }: DashboardProps) {
  const [showDocumentUpload, setShowDocumentUpload] = useState(openDocumentsOnDashboard);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  // Mock appointment data - in real app, this would come from backend
  const [appointment, setAppointment] = useState<{
    date: string;
    time: string;
    location: string;
    status: string;
  } | null>({
    date: 'Monday, December 15, 2025',
    time: '2:00 PM - 3:00 PM',
    location: 'Dehradun',
    status: 'Confirmed'
  });

  const handleCancelAppointment = () => {
    setShowCancelConfirm(true);
  };

  const handleConfirmCancel = () => {
    setAppointment(null);
    setShowCancelConfirm(false);
  };

  const handleRescheduleAppointment = () => {
    // Navigate to slot booking with reschedule flag
    onChooseSlot();
  };

  // Sync showDocumentUpload with prop changes
  useEffect(() => {
    if (openDocumentsOnDashboard) {
      setShowDocumentUpload(true);
      // Reset the flag after opening
      if (setOpenDocumentsOnDashboard) {
        setOpenDocumentsOnDashboard(false);
      }
    }
  }, [openDocumentsOnDashboard, setOpenDocumentsOnDashboard]);

  const applicationStatus = {
    status: 'in-progress', // 'not-started' | 'in-progress' | 'submitted' | 'under-review' | 'approved' | 'rejected'
    progress: 40, // 0-100
    lastUpdated: '2025-11-05',
    currentStep: 'Family & Finance'
  };

  const notifications = [
    {
      id: 1,
      type: 'interview',
      title: 'Interview has been scheduled',
      message: 'Your scholarship interview has been scheduled for November 15, 2025 at 10:00 AM.',
      date: '2025-11-08',
      icon: Calendar
    },
    {
      id: 2,
      type: 'exam',
      title: 'Exam has been scheduled',
      message: 'Your scholarship exam has been scheduled for November 20, 2025 at 2:00 PM.',
      date: '2025-11-07',
      icon: FileText
    },
    {
      id: 3,
      type: 'reminder',
      title: 'Complete Your Application',
      message: 'You have completed 2 out of 5 steps. Continue your application to submit before the deadline.',
      date: '2025-11-06',
      icon: Clock
    },
    {
      id: 4,
      type: 'document',
      title: 'Document Upload Pending',
      message: 'Please upload your academic documents and passport size photograph.',
      date: '2025-11-05',
      icon: FileText
    },
    {
      id: 5,
      type: 'deadline',
      title: 'Application Deadline Approaching',
      message: 'The scholarship application deadline is on November 30, 2025.',
      date: '2025-11-04',
      icon: AlertCircle
    }
  ];

  const requiredDocuments = [
    { name: '9th Class Marksheet', uploaded: true },
    { name: '10th Class Marksheet', uploaded: true },
    { name: '11th Class Marksheet', uploaded: true },
    { name: '12th Class Marksheet', uploaded: true },
    { name: 'Family Income Proof', uploaded: true },
    { name: 'Caste Certificate', uploaded: true },
  ];

  if (showDocumentUpload) {
    return <DocumentUpload onBack={() => setShowDocumentUpload(false)} />;
  }

  return (
    <div className="min-h-screen bg-[#f6f8fc] py-6 sm:py-8 md:py-12">
      <div className="max-w-[1366px] mx-auto px-4 sm:px-6 md:px-8">
        {/* Header */}
        <div className="mb-8 sm:mb-10 md:mb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-['Fraunces:Bold',sans-serif] font-bold text-[#a85613] text-[24px] sm:text-[30px] md:text-[36px] mb-2" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>
              Welcome, {user.name.split(' ')[0]}!
            </h1>
            <p className="font-['Wix_Madefor_Text:Regular',sans-serif] text-[#4d4b48] text-[14px] sm:text-[16px]">
              Track your scholarship application and stay updated
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Left Column - Application Status */}
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            {/* Application Progress Card */}
            <div className="bg-white rounded-[16px] sm:rounded-[20px] p-5 sm:p-6 md:p-8 shadow-[0px_3px_30px_0px_rgba(54,88,136,0.07)] border border-[#e2e8f2]">
              <div className="flex flex-col sm:flex-row items-start justify-between mb-6 gap-3">
                <div>
                  <h2 className="font-['Fraunces:Bold',sans-serif] font-bold text-[#a85613] text-[20px] sm:text-[22px] md:text-[24px] mb-1" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>
                    Application Status
                  </h2>
                  <p className="font-['Wix_Madefor_Text:Regular',sans-serif] text-[#4d4b48] text-[13px] sm:text-[14px]">
                    Current Step: {applicationStatus.currentStep}
                  </p>
                </div>
                <div className="flex items-center gap-2 bg-[#ecf4ff] px-3 sm:px-4 py-1.5 sm:py-2 rounded-[100px]">
                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1a4d8f]" />
                  <span className="font-['Wix_Madefor_Text:SemiBold',sans-serif] text-[#1a4d8f] text-[12px] sm:text-[14px]">
                    In Progress
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-['Wix_Madefor_Text:SemiBold',sans-serif] text-[#4d4b48] text-[14px]">
                    Overall Progress
                  </span>
                  <span className="font-['Wix_Madefor_Text:Bold',sans-serif] text-[#1a4d8f] text-[16px]">
                    {applicationStatus.progress}%
                  </span>
                </div>
                <Progress value={applicationStatus.progress} className="h-3" />
              </div>

              {/* Steps */}
              <div className="space-y-4">
                {[
                  { name: 'Personal Details', completed: true },
                  { name: 'Academic Details', completed: true },
                  { name: 'Family & Finance', completed: false },
                  { name: 'Review & Submit', completed: false }
                ].map((step, index) => (
                  <div key={index} className="flex items-center gap-3">
                    {step.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-[#25c196] flex-shrink-0" />
                    ) : step.current ? (
                      <div className="w-5 h-5 border-2 border-[#1a4d8f] rounded-full flex-shrink-0" />
                    ) : (
                      <div className="w-5 h-5 border-2 border-[#aeaeae] rounded-full flex-shrink-0" />
                    )}
                    <span className={`font-['Wix_Madefor_Text:${step.current ? 'SemiBold' : 'Regular'}',sans-serif] text-[14px] ${step.completed ? 'text-[#25c196]' : step.current ? 'text-[#1a4d8f]' : 'text-[#969696]'}`}>
                      {step.name}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 sm:mt-8 flex justify-center sm:justify-end">
                <button
                  onClick={onStartApplication}
                  className="bg-[#1a4d8f] text-white h-[42px] sm:h-[44px] px-5 sm:px-6 rounded-[100px] font-['Wix_Madefor_Text:Bold',sans-serif] font-bold text-[13px] sm:text-[14px] hover:bg-[#153d73] transition-colors w-full sm:w-auto text-center"
                >
                  {applicationStatus.progress > 0 ? 'Continue Application' : 'Start Application'}
                </button>
              </div>
            </div>

            {/* Document Upload Section */}
            <div className="bg-white rounded-[16px] sm:rounded-[20px] p-5 sm:p-6 md:p-8 shadow-[0px_3px_30px_0px_rgba(54,88,136,0.07)] border border-[#e2e8f2]">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="font-['Fraunces:Bold',sans-serif] font-bold text-[#a85613] text-[20px] sm:text-[22px] md:text-[24px] mb-1" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>
                    Documents
                  </h2>
                  <p className="font-['Wix_Madefor_Text:Regular',sans-serif] text-[#4d4b48] text-[13px] sm:text-[14px]">
                    Upload mandatory documents for verification
                  </p>
                </div>
              </div>

              {/* Document List */}
              <div className="space-y-3 mb-6">
                {requiredDocuments.map((doc, index) => (
                  <div key={index} className="bg-[#f6f8fc] flex items-center justify-between px-3 py-[12px] rounded-[8px] h-[45px]">
                    <div className="flex items-center gap-3">
                      {/* Document Icon - SVG from Figma */}
                      <div className="relative shrink-0 size-[20px]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                          <g>
                            <path d={svgPaths.p2cab3600} stroke="#1A4D8F" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                            <path d={svgPaths.p215db800} stroke="#1A4D8F" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                            <path d="M8.33268 7.5H6.66602" stroke="#1A4D8F" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                            <path d="M13.3327 10.833H6.66602" stroke="#1A4D8F" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                            <path d="M13.3327 14.167H6.66602" stroke="#1A4D8F" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                          </g>
                        </svg>
                      </div>
                      <p className="font-['Wix_Madefor_Text:SemiBold',sans-serif] font-semibold leading-[21px] text-[#4d4b48] text-[14px]">
                        {doc.name}
                      </p>
                    </div>
                    {doc.uploaded ? (
                      <div className="flex items-center gap-2">
                        {/* Uploaded Check Icon - SVG from Figma */}
                        <div className="relative shrink-0 size-[16px]">
                          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                            <g>
                              <path d={svgPaths.p13d97800} fill="#25C196" />
                            </g>
                          </svg>
                        </div>
                        <p className="font-['Wix_Madefor_Text:SemiBold',sans-serif] font-semibold leading-[19.5px] text-[#25c196] text-[13px]">
                          Uploaded
                        </p>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        {/* Required Alert Icon - SVG from Figma */}
                        <div className="relative shrink-0 size-[20px]">
                          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                            <g clipPath="url(#clip0_required)">
                              <path d={svgPaths.p43bca00} stroke="#FB2C36" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                              <path d="M10 6.66699V10.0003" stroke="#FB2C36" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                              <path d="M10 13.333H10.0083" stroke="#FB2C36" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                            </g>
                            <defs>
                              <clipPath id="clip0_required">
                                <rect fill="white" height="20" width="20" />
                              </clipPath>
                            </defs>
                          </svg>
                        </div>
                        <p className="font-['Wix_Madefor_Text:SemiBold',sans-serif] font-semibold leading-[19.5px] text-[#fb2c36] text-[13px]">
                          Required
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex justify-center sm:justify-end">
                <button
                  onClick={() => setShowDocumentUpload(true)}
                  className="bg-[#1a4d8f] text-white h-[42px] sm:h-[44px] px-5 sm:px-6 rounded-[100px] font-['Wix_Madefor_Text:Bold',sans-serif] font-bold text-[13px] sm:text-[14px] hover:bg-[#153d73] transition-colors w-full sm:w-auto text-center flex items-center justify-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  Upload Documents
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Notifications */}
          <div className="space-y-6">
            {/* Slot Booking for In-Person Verification */}
            <div className="bg-white rounded-[20px] p-6 shadow-[0px_3px_30px_0px_rgba(54,88,136,0.07)] border border-[#e2e8f2]">
              <h2 className="font-['Fraunces:Bold',sans-serif] font-bold text-[#a85613] text-[20px] mb-2" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>
                Slot Booking for In-Person Verification
              </h2>
              
              {appointment ? (
                // Show appointment details when confirmed
                <>
                  <p className="font-['Wix_Madefor_Text:Regular',sans-serif] text-[#969696] text-[13px] mb-4">
                    Your appointment has been scheduled
                  </p>

                  {/* Appointment Details */}
                  <div className="bg-gradient-to-br from-[#ecf4ff] to-[#f6f8fc] rounded-[16px] p-5 mb-4 border border-[#1a4d8f]/10">
                    <div className="space-y-4">
                      {/* Date */}
                      <div className="flex items-start gap-3">
                        <div className="size-10 bg-white rounded-[10px] flex items-center justify-center shadow-sm flex-shrink-0">
                          <Calendar className="w-5 h-5 text-[#1a4d8f]" />
                        </div>
                        <div className="flex-1">
                          <p className="font-['Wix_Madefor_Text:SemiBold',sans-serif] text-[#969696] text-[12px] mb-1">
                            Date
                          </p>
                          <p className="font-['Wix_Madefor_Text:Bold',sans-serif] text-[#4d4b48] text-[14px]">
                            {appointment.date}
                          </p>
                        </div>
                      </div>

                      <div className="border-t border-white/50" />

                      {/* Time */}
                      <div className="flex items-start gap-3">
                        <div className="size-10 bg-white rounded-[10px] flex items-center justify-center shadow-sm flex-shrink-0">
                          <Clock className="w-5 h-5 text-[#1a4d8f]" />
                        </div>
                        <div className="flex-1">
                          <p className="font-['Wix_Madefor_Text:SemiBold',sans-serif] text-[#969696] text-[12px] mb-1">
                            Time
                          </p>
                          <p className="font-['Wix_Madefor_Text:Bold',sans-serif] text-[#4d4b48] text-[14px]">
                            {appointment.time}
                          </p>
                        </div>
                      </div>

                      <div className="border-t border-white/50" />

                      {/* Location */}
                      <div className="flex items-start gap-3">
                        <div className="size-10 bg-white rounded-[10px] flex items-center justify-center shadow-sm flex-shrink-0">
                          <MapPin className="w-5 h-5 text-[#1a4d8f]" />
                        </div>
                        <div className="flex-1">
                          <p className="font-['Wix_Madefor_Text:SemiBold',sans-serif] text-[#969696] text-[12px] mb-1">
                            Location
                          </p>
                          <p className="font-['Wix_Madefor_Text:Bold',sans-serif] text-[#4d4b48] text-[14px]">
                            {appointment.location}
                          </p>
                        </div>
                      </div>

                      <div className="border-t border-white/50" />

                      {/* Status */}
                      <div className="flex items-start gap-3">
                        <div className="size-10 bg-white rounded-[10px] flex items-center justify-center shadow-sm flex-shrink-0">
                          <CheckCircle2 className="w-5 h-5 text-[#25c196]" />
                        </div>
                        <div className="flex-1">
                          <p className="font-['Wix_Madefor_Text:SemiBold',sans-serif] text-[#969696] text-[12px] mb-1">
                            Status
                          </p>
                          <p className="font-['Wix_Madefor_Text:Bold',sans-serif] text-[#25c196] text-[14px]">
                            {appointment.status}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <button
                      onClick={handleRescheduleAppointment}
                      className="w-full bg-gradient-to-r from-[#1a4d8f] to-[#153d73] text-white h-[44px] px-6 rounded-[100px] font-['Wix_Madefor_Text:Bold',sans-serif] text-[14px] hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Reschedule Appointment
                    </button>
                    <button
                      onClick={handleCancelAppointment}
                      className="w-full bg-white border-2 border-[#fb2c36] text-[#fb2c36] h-[44px] px-6 rounded-[100px] font-['Wix_Madefor_Text:Bold',sans-serif] text-[14px] hover:bg-[#fff5f5] transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      Cancel Appointment
                    </button>
                  </div>
                </>
              ) : (
                // Show booking button when no appointment
                <>
                  <p className="font-['Wix_Madefor_Text:Regular',sans-serif] text-[#969696] text-[13px] mb-4">
                    Book your preferred slot for the interview
                  </p>
                  <button
                    onClick={onChooseSlot}
                    className="w-full bg-gradient-to-r from-[#1a4d8f] to-[#153d73] text-white h-[44px] px-6 rounded-[100px] font-['Wix_Madefor_Text:Bold',sans-serif] text-[14px] hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    Book Appointment
                  </button>
                </>
              )}
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-[20px] p-6 shadow-[0px_3px_30px_0px_rgba(54,88,136,0.07)] border border-[#e2e8f2] flex flex-col h-[520px]">
              <h2 className="font-['Fraunces:Bold',sans-serif] font-bold text-[#a85613] text-[20px] mb-4" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>
                Notifications
              </h2>

              <div className="space-y-4 overflow-y-auto pr-2 flex-1">
                {notifications.map((notification) => {
                  const IconComponent = notification.icon;
                  return (
                    <div key={notification.id} className="border-b border-[#e2e8f2] pb-4 last:border-b-0 last:pb-0">
                      <div className="flex gap-3">
                        <div className="size-8 bg-[#ecf4ff] rounded-full flex items-center justify-center flex-shrink-0">
                          <IconComponent className="w-4 h-4 text-[#1a4d8f]" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-['Wix_Madefor_Text:Bold',sans-serif] text-[#4d4b48] text-[14px] mb-1">
                            {notification.title}
                          </h3>
                          <p className="font-['Wix_Madefor_Text:Regular',sans-serif] text-[#4d4b48] text-[13px] mb-2">
                            {notification.message}
                          </p>
                          <div className="flex items-center gap-1 text-[#969696]">
                            <Calendar className="w-3 h-3" />
                            <span className="font-['Wix_Madefor_Text:Regular',sans-serif] text-[12px]">
                              {notification.date}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Resource Centre */}
            <div className="bg-white rounded-[20px] p-6 shadow-[0px_3px_30px_0px_rgba(54,88,136,0.07)] border border-[#e2e8f2]">
              <h2 className="font-['Fraunces:Bold',sans-serif] font-bold text-[#a85613] text-[20px] mb-4" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>
                Resource Centre
              </h2>

              <div className="space-y-3">
                {/* Application Guide */}
                <a
                  href="#"
                  className="flex items-center justify-between p-4 bg-[#f6f8fc] rounded-[12px] hover:bg-[#ecf4ff] transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="size-10 bg-[#ecf4ff] rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-[#1a4d8f] transition-colors">
                      <BookOpen className="w-5 h-5 text-[#1a4d8f] group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h3 className="font-['Wix_Madefor_Text:Bold',sans-serif] text-[#4d4b48] text-[14px]">
                        Application Guide
                      </h3>
                      <p className="font-['Wix_Madefor_Text:Regular',sans-serif] text-[#969696] text-[12px]">
                        Step-by-step instructions
                      </p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[#969696] group-hover:text-[#1a4d8f] transition-colors" />
                </a>

                {/* FAQs */}
                <a
                  href="#"
                  className="flex items-center justify-between p-4 bg-[#f6f8fc] rounded-[12px] hover:bg-[#ecf4ff] transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="size-10 bg-[#ecf4ff] rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-[#1a4d8f] transition-colors">
                      <HelpCircle className="w-5 h-5 text-[#1a4d8f] group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h3 className="font-['Wix_Madefor_Text:Bold',sans-serif] text-[#4d4b48] text-[14px]">
                        FAQs
                      </h3>
                      <p className="font-['Wix_Madefor_Text:Regular',sans-serif] text-[#969696] text-[12px]">
                        Frequently asked questions
                      </p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[#969696] group-hover:text-[#1a4d8f] transition-colors" />
                </a>

                {/* Document Checklist */}
                <a
                  href="#"
                  className="flex items-center justify-between p-4 bg-[#f6f8fc] rounded-[12px] hover:bg-[#ecf4ff] transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="size-10 bg-[#ecf4ff] rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-[#1a4d8f] transition-colors">
                      <FileText className="w-5 h-5 text-[#1a4d8f] group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h3 className="font-['Wix_Madefor_Text:Bold',sans-serif] text-[#4d4b48] text-[14px]">
                        Document Checklist
                      </h3>
                      <p className="font-['Wix_Madefor_Text:Regular',sans-serif] text-[#969696] text-[12px]">
                        List of required documents
                      </p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[#969696] group-hover:text-[#1a4d8f] transition-colors" />
                </a>

                {/* Contact Support */}
                <a
                  href="#"
                  className="flex items-center justify-between p-4 bg-[#f6f8fc] rounded-[12px] hover:bg-[#ecf4ff] transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="size-10 bg-[#ecf4ff] rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-[#1a4d8f] transition-colors">
                      <Phone className="w-5 h-5 text-[#1a4d8f] group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h3 className="font-['Wix_Madefor_Text:Bold',sans-serif] text-[#4d4b48] text-[14px]">
                        Contact Support
                      </h3>
                      <p className="font-['Wix_Madefor_Text:Regular',sans-serif] text-[#969696] text-[12px]">
                        Get help from our team
                      </p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[#969696] group-hover:text-[#1a4d8f] transition-colors" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cancel Confirmation Dialog */}
      {showCancelConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-[24px] p-8 max-w-md w-full shadow-2xl transform animate-in">
            <div className="text-center mb-6">
              <div className="size-16 bg-[#fff5f5] rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-[#fb2c36]" />
              </div>
              <h2 className="font-['Fraunces:Bold',sans-serif] font-bold text-[#1a4d8f] text-[24px] mb-2" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>
                Cancel Appointment?
              </h2>
              <p className="font-['Wix_Madefor_Text:Regular',sans-serif] text-[#969696] text-[15px]">
                Are you sure you want to cancel your scheduled appointment? This action cannot be undone.
              </p>
            </div>

            <div className="bg-[#f6f8fc] rounded-[16px] p-5 mb-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-[#969696]" />
                  <div className="flex-1">
                    <span className="font-['Wix_Madefor_Text:SemiBold',sans-serif] text-[#4d4b48] text-[14px]">
                      {appointment?.date}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[#969696]" />
                  <div className="flex-1">
                    <span className="font-['Wix_Madefor_Text:SemiBold',sans-serif] text-[#4d4b48] text-[14px]">
                      {appointment?.time}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-[#969696]" />
                  <div className="flex-1">
                    <span className="font-['Wix_Madefor_Text:SemiBold',sans-serif] text-[#4d4b48] text-[14px]">
                      {appointment?.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowCancelConfirm(false)}
                className="flex-1 bg-white border-2 border-[#e2e8f2] text-[#4d4b48] h-[48px] rounded-[100px] font-['Wix_Madefor_Text:Bold',sans-serif] text-[15px] hover:bg-[#f6f8fc] transition-colors"
              >
                Keep Appointment
              </button>
              <button
                onClick={handleConfirmCancel}
                className="flex-1 bg-[#fb2c36] text-white h-[48px] rounded-[100px] font-['Wix_Madefor_Text:Bold',sans-serif] text-[15px] hover:bg-[#e02831] transition-all shadow-md hover:shadow-lg"
              >
                Cancel Appointment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}