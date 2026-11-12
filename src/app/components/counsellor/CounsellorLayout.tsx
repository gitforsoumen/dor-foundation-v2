import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import CounsellorHeader from "./CounsellorHeader";
import CounsellorSidebar from "./CounsellorSidebar";
import CounsellorDashboardView from "./CounsellorDashboardView";
import AssignedStudentsList from "./AssignedStudentsList";
import StudentProfileDetails from "./StudentProfileDetails";
import CounsellingSummary from "./CounsellingSummary";
import Footer from "../Footer";

type CounsellorView = "dashboard" | "students" | "profile" | "summary";

interface CounsellorUser {
  name: string;
  email: string;
  role: string;
}

interface CounsellorLayoutProps {
  onLogout: () => void;
  counsellorUser: CounsellorUser | null;
}

export default function CounsellorLayout({ onLogout, counsellorUser }: CounsellorLayoutProps) {
  const [currentView, setCurrentView] = useState<CounsellorView>("dashboard");
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavigate = (view: CounsellorView) => {
    setCurrentView(view);
    setSelectedStudentId(null);
    setIsMobileMenuOpen(false);
  };

  const handleSelectStudent = (studentId: string) => {
    setSelectedStudentId(studentId);
    setCurrentView("profile");
  };

  const handleViewSummary = (studentId: string) => {
    setSelectedStudentId(studentId);
    setCurrentView("summary");
  };

  const handleBackToStudents = () => {
    setCurrentView("students");
    setSelectedStudentId(null);
  };

  const handleBackToDashboard = () => {
    setCurrentView("dashboard");
    setSelectedStudentId(null);
  };

  const renderView = () => {
    switch (currentView) {
      case "dashboard":
        return <CounsellorDashboardView 
          onNavigateToStudents={() => handleNavigate("students")} 
          onNavigateToStudentProfile={handleSelectStudent}
        />;
      case "students":
        return (
          <AssignedStudentsList
            onSelectStudent={handleSelectStudent}
            onBackToDashboard={handleBackToDashboard}
          />
        );
      case "profile":
        if (!selectedStudentId) return null;
        return (
          <StudentProfileDetails
            studentId={selectedStudentId}
            onBack={handleBackToStudents}
            onViewSummary={handleViewSummary}
          />
        );
      case "summary":
        if (!selectedStudentId) return null;
        return (
          <CounsellingSummary
            studentId={selectedStudentId}
            onBack={handleBackToStudents}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f8fc] flex flex-col">
      {/* Fixed Header */}
      <CounsellorHeader
        counsellorUser={counsellorUser}
        onLogout={onLogout}
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Sidebar */}
            <motion.div
              initial={{ x: -240 }}
              animate={{ x: 0 }}
              exit={{ x: -240 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                mass: 0.8
              }}
              className="fixed left-0 top-[60px] bottom-0 w-[240px] z-50 lg:hidden"
            >
              <CounsellorSidebar currentView={currentView} onNavigate={handleNavigate} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Fixed Sidebar - Hidden on mobile */}
      <div className="hidden lg:block">
        <CounsellorSidebar currentView={currentView} onNavigate={handleNavigate} />
      </div>

      {/* Main Content Area with offset for header and sidebar */}
      <main className="lg:ml-[240px] mt-[60px] lg:mt-[70px] flex-1">
        {renderView()}
      </main>

      {/* Footer with offset for sidebar */}
      <div className="lg:ml-[240px]">
        <Footer />
      </div>
    </div>
  );
}