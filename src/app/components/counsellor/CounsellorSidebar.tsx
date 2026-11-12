import { LayoutDashboard, Users, ClipboardList } from "lucide-react";

interface CounsellorSidebarProps {
  currentView: "dashboard" | "students" | "profile" | "summary";
  onNavigate: (view: "dashboard" | "students" | "profile" | "summary") => void;
}

export default function CounsellorSidebar({ currentView, onNavigate }: CounsellorSidebarProps) {
  const menuItems = [
    {
      id: "dashboard" as const,
      label: "Dashboard",
      icon: LayoutDashboard
    },
    {
      id: "students" as const,
      label: "Assigned Students",
      icon: Users
    }
  ];

  return (
    <div className="fixed left-0 top-[70px] w-[240px] h-[calc(100vh-70px)] bg-white border-r border-[rgba(0,0,0,0.1)] shadow-[0px_3px_30px_0px_rgba(54,88,136,0.07)] z-40 overflow-y-auto">
      <div className="flex flex-col gap-[8px] px-[16px] pt-[16px] pb-[16px]">
        {menuItems.map((item) => {
          const isActive = currentView === item.id;
          const Icon = item.icon;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`h-[36px] w-full rounded-[6px] flex items-center px-[12px] transition-colors ${
                isActive ? "bg-[#a85613]" : "hover:bg-gray-100"
              }`}
            >
              <Icon className={`size-[16px] shrink-0 ${isActive ? "text-white" : "text-[#1a202c]"}`} />
              <p className={`ml-[8px] font-['Wix_Madefor_Text:Regular',sans-serif] font-normal text-[14px] leading-[20px] whitespace-nowrap ${
                isActive ? "text-white" : "text-[#1a202c]"
              }`}>
                {item.label}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
