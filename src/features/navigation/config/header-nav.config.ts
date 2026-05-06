import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  BriefcaseBusiness,
  Building2,
  FileText,
  Heart,
  LayoutDashboard,
  MessageSquare,
  Search,
  Settings,
  ShieldCheck,
  Users,
  UserRound,
  Layers3,
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const studentNav: NavItem[] = [
  { label: "Trang chủ", href: "/student/dashboard", icon: LayoutDashboard },
  { label: "Công ty", href: "/student/companies", icon: Building2 },
  { label: "Ứng tuyển", href: "/student/applications", icon: FileText },
  { label: "Đã lưu", href: "/student/saved-jobs", icon: Heart },
  { label: "Hồ sơ & CV", href: "/student/profile", icon: UserRound },
  { label: "Tin nhắn", href: "/student/messages", icon: MessageSquare },
  { label: "Cài đặt", href: "/student/settings", icon: Settings },
];

export const recruiterNav: NavItem[] = [
  { label: "Tổng quan", href: "/recruiter/dashboard", icon: BarChart3 },
  {
    label: "Tin tuyển dụng",
    href: "/recruiter/job-postings",
    icon: BriefcaseBusiness,
  },
  { label: "Ứng viên", href: "/recruiter/candidates", icon: Users },
  { label: "Tìm ứng viên", href: "/recruiter/search-candidates", icon: Search },
  { label: "Tin nhắn", href: "/recruiter/messages", icon: MessageSquare },
  { label: "Hồ sơ công ty", href: "/recruiter/profile", icon: Building2 },
  { label: "Cài đặt", href: "/recruiter/settings", icon: Settings },
];

export const recruiterPendingNav: NavItem[] = [
  { label: "Hồ sơ công ty", href: "/recruiter/profile", icon: Building2 },
  { label: "Cài đặt", href: "/recruiter/settings", icon: Settings },
];

export const adminNav: NavItem[] = [
  { label: "Tổng quan", href: "/admin/dashboard", icon: BarChart3 },
  { label: "Sinh viên", href: "/admin/students", icon: Users },
  { label: "Kiểm duyệt", href: "/admin/moderation", icon: ShieldCheck },
  { label: "Thể loại", href: "/admin/categories", icon: Layers3 },
  { label: "Giám sát", href: "/admin/monitoring", icon: BarChart3 },
  { label: "Cài đặt", href: "/admin/settings", icon: Settings },
];
