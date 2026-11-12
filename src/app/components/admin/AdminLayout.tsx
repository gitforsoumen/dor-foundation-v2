import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import AdminDashboard from "./AdminDashboard";
import ApplicationReview from "./ApplicationReview";
import Reports from "./Reports";
import ManageUsers from "./ManageUsers";
import ManageVolunteers from "./ManageVolunteers";
import MapStudentVolunteer from "./MapStudentVolunteer";
import SlotManagement from "./SlotManagement";
import SeatsManagement from "./SeatsManagement";
import ActivityLog from "./ActivityLog";
import Footer from "../Footer";

type AdminView = "dashboard" | "review" | "users" | "volunteers" | "mapping" | "slots" | "seats" | "reports" | "activityLog";

interface AdminUser {
  name: string;
  email: string;
  role: string;
}

interface AdminLayoutProps {
  onLogout: () => void;
  adminUser: AdminUser | null;
}

export default function AdminLayout({ onLogout, adminUser }: AdminLayoutProps) {
  const [currentView, setCurrentView] = useState<AdminView>("dashboard");
  const [selectedApplicationId, setSelectedApplicationId] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavigateToReview = (appId?: string) => {
    setSelectedApplicationId(appId || null);
    setCurrentView("review");
    setIsMobileMenuOpen(false); // Close mobile menu when navigating
  };

  const handleNavigate = (view: AdminView) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false); // Close mobile menu when navigating
  };

  const handleNavigateToActivityLog = (appId: string) => {
    setSelectedApplicationId(appId);
    setCurrentView("activityLog");
    setIsMobileMenuOpen(false);
  };

  const renderView = () => {
    switch (currentView) {
      case "dashboard":
        return <AdminDashboard onNavigateToReview={handleNavigateToReview} />;
      case "review":
        return <ApplicationReview onBack={() => setCurrentView("dashboard")} initialAppId={selectedApplicationId} onNavigateToActivityLog={handleNavigateToActivityLog} />;
      case "users":
        return <ManageUsers />;
      case "volunteers":
        return <ManageVolunteers />;
      case "mapping":
        return <MapStudentVolunteer />;
      case "slots":
        return <SlotManagement />;
      case "seats":
        return <SeatsManagement />;
      case "reports":
        return <Reports />;
      case "activityLog":
        return <ActivityLog onBack={() => {
          setCurrentView("review");
        }} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f8fc] flex flex-col">
      {/* Fixed Header */}
      <AdminHeader 
        adminUser={adminUser} 
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
              <AdminSidebar currentView={currentView} onNavigate={handleNavigate} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      {/* Fixed Sidebar - Hidden on mobile */}
      <div className="hidden lg:block">
        <AdminSidebar currentView={currentView} onNavigate={handleNavigate} />
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