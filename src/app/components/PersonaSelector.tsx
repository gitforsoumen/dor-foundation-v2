import { Users, GraduationCap, Shield } from "lucide-react";
import imgLogo from "../imports/Logo1";
import logoImg from "figma:asset/fb85e662a0f2d18cc83f90481c3f2d015fb7e1ed.png";

interface PersonaSelectorProps {
  onSelectPersona: (persona: 'student' | 'counselor' | 'admin') => void;
}

export default function PersonaSelector({ onSelectPersona }: PersonaSelectorProps) {
  return (
    <div className="min-h-screen bg-[#f6f8fc] flex flex-col items-center justify-center px-4 py-12">
      <div className="text-center mb-8 md:mb-12">
        {/* DOR Foundation Logo */}
        <div className="w-[120px] sm:w-[150px] md:w-[180px] h-auto mx-auto mb-4 sm:mb-6 md:mb-8">
          <img 
            alt="DOR Foundation Logo" 
            className="block w-full h-auto" 
            src={logoImg}
          />
        </div>
        
        {/* Hide heading and subtitle on mobile, show on sm and up */}
        <h1 className="hidden sm:block font-['Fraunces:Bold',sans-serif] text-[#a85613] text-[40px] md:text-[48px] mb-3 md:mb-4 px-4" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>
          DOR Foundation
        </h1>
        <p className="hidden sm:block font-['Wix_Madefor_Text:Regular',sans-serif] text-[#4d4b48] text-[18px] md:text-[20px] px-4">
          Scholarship Management System
        </p>
        <p className="font-['Wix_Madefor_Text:Regular',sans-serif] text-[#4d4b48] text-[14px] sm:text-[16px] mt-4 sm:mt-3 md:mt-4 px-4">
          Select your role to continue
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-5xl w-full px-4">
        {/* Student Card */}
        <button
          onClick={() => onSelectPersona('student')}
          className="bg-white rounded-[20px] p-6 sm:p-8 shadow-[0px_3px_30px_0px_rgba(54,88,136,0.07)] border border-[#e2e8f2] hover:border-[#1a4d8f] hover:shadow-[0px_6px_40px_0px_rgba(54,88,136,0.12)] transition-all group"
        >
          <div className="size-[60px] sm:size-[80px] bg-[#ecf4ff] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:bg-[#1a4d8f] transition-colors">
            <GraduationCap className="w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] text-[#1a4d8f] group-hover:text-white transition-colors" />
          </div>
          <h2 className="font-['Fraunces:Bold',sans-serif] text-[#a85613] text-[20px] sm:text-[24px] mb-2" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>
            Student
          </h2>
          <p className="font-['Wix_Madefor_Text:Regular',sans-serif] text-[#4d4b48] text-[13px] sm:text-[14px]">
            Apply for scholarships and track your application status
          </p>
        </button>

        {/* Volunteer Card */}
        <button
          onClick={() => onSelectPersona('counselor')}
          className="bg-white rounded-[20px] p-6 sm:p-8 shadow-[0px_3px_30px_0px_rgba(54,88,136,0.07)] border border-[#e2e8f2] hover:border-[#1a4d8f] hover:shadow-[0px_6px_40px_0px_rgba(54,88,136,0.12)] transition-all group"
        >
          <div className="size-[60px] sm:size-[80px] bg-[#ecf4ff] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:bg-[#1a4d8f] transition-colors">
            <Users className="w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] text-[#1a4d8f] group-hover:text-white transition-colors" />
          </div>
          <h2 className="font-['Fraunces:Bold',sans-serif] text-[#a85613] text-[20px] sm:text-[24px] mb-2" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>
            Volunteer
          </h2>
          <p className="font-['Wix_Madefor_Text:Regular',sans-serif] text-[#4d4b48] text-[13px] sm:text-[14px]">
            Review and guide student applications
          </p>
        </button>

        {/* Admin Card */}
        <button
          onClick={() => onSelectPersona('admin')}
          className="bg-white rounded-[20px] p-6 sm:p-8 shadow-[0px_3px_30px_0px_rgba(54,88,136,0.07)] border border-[#e2e8f2] hover:border-[#1a4d8f] hover:shadow-[0px_6px_40px_0px_rgba(54,88,136,0.12)] transition-all group"
        >
          <div className="size-[60px] sm:size-[80px] bg-[#ecf4ff] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:bg-[#1a4d8f] transition-colors">
            <Shield className="w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] text-[#1a4d8f] group-hover:text-white transition-colors" />
          </div>
          <h2 className="font-['Fraunces:Bold',sans-serif] text-[#a85613] text-[20px] sm:text-[24px] mb-2" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>
            Admin
          </h2>
          <p className="font-['Wix_Madefor_Text:Regular',sans-serif] text-[#4d4b48] text-[13px] sm:text-[14px]">
            Manage applications and scholarship programs
          </p>
        </button>
      </div>
    </div>
  );
}