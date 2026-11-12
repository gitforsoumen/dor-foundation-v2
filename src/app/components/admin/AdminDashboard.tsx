import { Download, Users, Clock, CheckCircle, TrendingUp, UserCheck, UserX, Eye, MoreVertical, FileDown, FileText } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, PieChart, Pie } from "recharts";
import CounselorLoadBalanceCard from "../../imports/Card2";
import CardMenu from "./CardMenu";
import svgPaths from "../../imports/svg-683k90k0op";

interface AdminDashboardProps {
  onNavigateToReview?: (appId?: string) => void;
}

export default function AdminDashboard({ onNavigateToReview }: AdminDashboardProps) {

  // Mock data - in real app, this would come from API
  const metrics = {
    totalApplications: 156,
    pendingReview: 42,
    accepted: 89,
    rejected: 25,
    finalAdmissions: 76,
    conversionRate: 78.5,
    dropoutRate: 5.2
  };

  // Application Trends Data
  const applicationTrendsData = [
    { month: "Jan", applications: 125, accepted: 98 },
    { month: "Feb", applications: 145, accepted: 112 },
    { month: "Mar", applications: 168, accepted: 128 },
    { month: "Apr", applications: 152, accepted: 118 },
    { month: "May", applications: 178, accepted: 142 },
    { month: "Jun", applications: 156, accepted: 124 }
  ];

  // Application Status Distribution Data
  const statusDistributionData = [
    { name: "Pending Review", value: 42, color: "#a85613" },
    { name: "Under Review", value: 35, color: "#1a4d8f" },
    { name: "Accepted", value: 89, color: "#25c196" },
    { name: "Rejected", value: 25, color: "#ef4444" },
    { name: "Final Admission", value: 76, color: "#6b6b6b" }
  ];

  // Recent Applications Data
  const recentApplications = [
    {
      id: "APP-2024-156",
      name: "Priya Sharma",
      date: "Nov 8, 2025",
      status: "Pending Review"
    },
    {
      id: "APP-2024-155",
      name: "Rajesh Kumar",
      date: "Nov 7, 2025",
      status: "Accepted"
    },
    {
      id: "APP-2024-154",
      name: "Ananya Patel",
      date: "Nov 7, 2025",
      status: "Accepted"
    },
    {
      id: "APP-2024-153",
      name: "Arjun Reddy",
      date: "Nov 6, 2025",
      status: "Pending Review"
    },
    {
      id: "APP-2024-152",
      name: "Meera Singh",
      date: "Nov 6, 2025",
      status: "Rejected"
    }
  ];

  const handleExportExcel = () => {
    console.log("Exporting to Excel...");
  };

  const handleDownloadExcel = (cardName: string) => {
    console.log(`Downloading ${cardName} data in Excel...`);
    // In real application, this would generate and download Excel file
  };

  const handleDownloadWord = (cardName: string) => {
    console.log(`Downloading ${cardName} data in Word...`);
    // In real application, this would generate and download Word file
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending Review":
        return "bg-[#a85613]/10 text-[#a85613]";
      case "Under Review":
        return "bg-[#1a4d8f]/10 text-[#1a4d8f]";
      case "Accepted":
        return "bg-[#25c196]/10 text-[#25c196]";
      case "Rejected":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="min-h-full bg-[#f6f8fc]">
      <div className="max-w-[1400px] mx-auto px-4 py-8 md:px-8 md:py-12">
        {/* Header with Export Button */}
        <div className="mb-8 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <h1 className="font-['Fraunces:Bold',sans-serif] font-bold text-[#a85613] text-[24px] sm:text-[30px] md:text-[36px] mb-2" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>
              Welcome, Saikat!
            </h1>
            <p className="font-['Wix_Madefor_Text:Regular',sans-serif] text-[#4d4b48] text-[16px]">
              Overview of scholarship applications and management
            </p>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Total Applications */}
            <Card className="bg-white rounded-[20px] border-[#e2e8f2] shadow-[0px_3px_30px_0px_rgba(54,88,136,0.07)]">
              <div className="p-5">
                <div className="mb-2">
                  <div className="w-10 h-10 bg-[rgba(26,77,143,0.1)] rounded-[10px] flex items-center justify-center">
                    <div className="w-5 h-5">
                      <svg className="block w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                        <g>
                          <path d={svgPaths.p39a73980} stroke="#1A4D8F" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                          <path d={svgPaths.p2f391800} stroke="#1A4D8F" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                          <path d={svgPaths.p2ceba900} stroke="#1A4D8F" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                          <path d={svgPaths.p5fae200} stroke="#1A4D8F" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="font-['Fraunces:Bold',sans-serif] font-bold text-[#1a4d8f] text-[36px] leading-[1.2] mb-1" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>
                    {metrics.totalApplications}
                  </p>
                  <p className="font-['Wix_Madefor_Text:SemiBold',sans-serif] text-[#6b6b6b] text-[13px]">
                    Total Applications
                  </p>
                </div>
              </div>
            </Card>

            {/* Final Admissions */}
            <Card className="bg-white rounded-[20px] border-[#e2e8f2] shadow-[0px_3px_30px_0px_rgba(54,88,136,0.07)]">
              <div className="p-5">
                <div className="mb-2">
                  <div className="w-10 h-10 bg-[rgba(26,77,143,0.1)] rounded-[10px] flex items-center justify-center">
                    <div className="w-5 h-5">
                      <svg className="block w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                        <g>
                          <path d={svgPaths.p16d93690} stroke="#1A4D8F" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                          <path d={svgPaths.p39a73980} stroke="#1A4D8F" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                          <path d={svgPaths.p5fae200} stroke="#1A4D8F" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="font-['Fraunces:Bold',sans-serif] font-bold text-[#1a4d8f] text-[36px] leading-[1.2] mb-1" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>
                    {metrics.finalAdmissions}
                  </p>
                  <p className="font-['Wix_Madefor_Text:SemiBold',sans-serif] text-[#6b6b6b] text-[13px]">
                    Final Admissions
                  </p>
                </div>
              </div>
            </Card>

            {/* Pending Review */}
            <Card className="bg-white rounded-[20px] border-[#e2e8f2] shadow-[0px_3px_30px_0px_rgba(54,88,136,0.07)]">
              <div className="p-5">
                <div className="mb-2">
                  <div className="w-10 h-10 bg-[rgba(168,86,19,0.1)] rounded-[10px] flex items-center justify-center">
                    <div className="w-5 h-5">
                      <svg className="block w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                        <g clipPath="url(#clip0_167_1933)">
                          <path d="M10 5V10L13.3333 11.6667" stroke="#A85613" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                          <path d={svgPaths.pcf43b00} stroke="#A85613" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                        </g>
                        <defs>
                          <clipPath id="clip0_167_1933">
                            <rect fill="white" height="20" width="20" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="font-['Fraunces:Bold',sans-serif] font-bold text-[#a85613] text-[36px] leading-[1.2] mb-1" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>
                    {metrics.pendingReview}
                  </p>
                  <p className="font-['Wix_Madefor_Text:SemiBold',sans-serif] text-[#6b6b6b] text-[13px]">
                    Pending Review
                  </p>
                </div>
              </div>
            </Card>

            {/* Accepted vs Rejected */}
            <Card className="bg-white rounded-[20px] border-[#e2e8f2] shadow-[0px_3px_30px_0px_rgba(54,88,136,0.07)]">
              <div className="p-5">
                <div className="mb-2">
                  <div className="w-10 h-10 bg-[rgba(37,193,150,0.1)] rounded-[10px] flex items-center justify-center">
                    <div className="w-5 h-5">
                      <svg className="block w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                        <g clipPath="url(#clip0_167_1940)">
                          <path d={svgPaths.p1fd511f0} stroke="#25C196" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                          <path d={svgPaths.p3fe63d80} stroke="#25C196" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                        </g>
                        <defs>
                          <clipPath id="clip0_167_1940">
                            <rect fill="white" height="20" width="20" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-baseline gap-1 mb-1">
                    <p className="font-['Fraunces:Bold',sans-serif] font-bold text-[#25c196] text-[36px] leading-[1.2]" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>
                      {metrics.accepted}
                    </p>
                    <span className="font-['Wix_Madefor_Text:Regular',sans-serif] text-[#969696] text-[14px]">
                      / {metrics.rejected}
                    </span>
                  </div>
                  <p className="font-['Wix_Madefor_Text:SemiBold',sans-serif] text-[#6b6b6b] text-[13px]">
                    Accepted vs Rejected
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Recent Applications Section */}
        <Card className="bg-white rounded-[20px] border-[#e2e8f2] shadow-[0px_3px_30px_0px_rgba(54,88,136,0.07)] mb-8">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-['Fraunces:Bold',sans-serif] font-bold leading-[30px] text-[#a85613] text-[20px]" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>
                Recent Applications
              </h2>
              <Button
                onClick={() => onNavigateToReview?.()}
                variant="outline"
                className="border-[#1a4d8f] text-[#1a4d8f] hover:bg-[#1a4d8f] hover:text-white h-[40px] px-5 rounded-[100px] font-['Wix_Madefor_Text:SemiBold',sans-serif]"
              >
                View All
              </Button>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-[#e2e8f2]">
                    <TableHead className="font-['Wix_Madefor_Text:Bold',sans-serif] text-[#4d4b48]">Application ID</TableHead>
                    <TableHead className="font-['Wix_Madefor_Text:Bold',sans-serif] text-[#4d4b48]">Student Name</TableHead>
                    <TableHead className="font-['Wix_Madefor_Text:Bold',sans-serif] text-[#4d4b48]">Date Submitted</TableHead>
                    <TableHead className="font-['Wix_Madefor_Text:Bold',sans-serif] text-[#4d4b48]">Status</TableHead>
                    <TableHead className="font-['Wix_Madefor_Text:Bold',sans-serif] text-[#4d4b48] text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentApplications.map((application) => (
                    <TableRow key={application.id} className="border-[#e2e8f2]">
                      <TableCell className="font-['Wix_Madefor_Text:Medium',sans-serif] text-[#1a4d8f]">
                        {application.id}
                      </TableCell>
                      <TableCell className="font-['Wix_Madefor_Text:Regular',sans-serif] text-[#4d4b48]">
                        {application.name}
                      </TableCell>
                      <TableCell className="font-['Wix_Madefor_Text:Regular',sans-serif] text-[#4d4b48]">
                        {application.date}
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getStatusColor(application.status)} border-0 font-['Wix_Madefor_Text:SemiBold',sans-serif]`}>
                          {application.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          onClick={() => onNavigateToReview?.(application.id)}
                          variant="ghost"
                          size="sm"
                          className="text-[#1a4d8f] hover:bg-[#1a4d8f]/10 h-[32px] px-3 rounded-[8px]"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}