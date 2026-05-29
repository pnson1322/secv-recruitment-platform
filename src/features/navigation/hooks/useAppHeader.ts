import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { getAccessToken } from "@/features/auth/lib/auth-storage";
import { useNotificationSocket } from "@/features/notification/hooks/useNotificationSocket";
import { disconnectSocket } from "@/lib/socket";
import type { CompanyProfile } from "@/features/company-profile/types/company.types";
import { getMyCompany } from "@/features/company-profile/api/company.api";
import {
  adminNav,
  recruiterNav,
  recruiterPendingNav,
  studentNav,
} from "../config/header-nav.config";

export type HeaderState = {
  roleLabel: string;
  name: string;
  avatarUrl: string | null | undefined;
  navItems: typeof studentNav;
  pendingBadge: string | null;
};

export function useAppHeader() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();

  const [company, setCompany] = useState<CompanyProfile | null>(null);
  const [openMobile, setOpenMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const socketToken = useMemo(
    () => getAccessToken() ?? undefined,
    [user?.user_id],
  );

  useNotificationSocket(socketToken, {
    enabled: !!user,
    showToast: !isNotificationOpen,
    onlyToastWhenTabHidden: false,
  });

  useEffect(() => {
    if (user?.role !== "COMPANY") return;

    let mounted = true;

    getMyCompany()
      .then((res) => {
        if (mounted) setCompany(res.data ?? null);
      })
      .catch(() => {
        if (mounted) setCompany(null);
      });

    return () => {
      mounted = false;
    };
  }, [user?.role]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!openMobile) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [openMobile]);

  const headerState = useMemo<HeaderState | null>(() => {
    if (!user) return null;

    if (user.role === "STUDENT") {
      return {
        roleLabel: "Sinh viên",
        name: user.full_name || user.email.split("@")[0],
        avatarUrl: user.avatar_url,
        navItems: studentNav,
        pendingBadge: null,
      };
    }

    if (user.role === "ADMIN") {
      return {
        roleLabel: "Quản trị viên",
        name: user.full_name || user.email.split("@")[0],
        avatarUrl: user.avatar_url,
        navItems: adminNav,
        pendingBadge: null,
      };
    }

    const isApproved = company?.status === "APPROVED";

    return {
      roleLabel: "Nhà tuyển dụng",
      name: user.full_name || company?.companyName || user.email.split("@")[0],
      avatarUrl: user.avatar_url || company?.logoUrl || null,
      navItems: isApproved ? recruiterNav : recruiterPendingNav,
      pendingBadge: isApproved ? null : "Chờ duyệt",
    };
  }, [user, company]);

  const homeHref = useMemo(() => {
    if (!user) return "/login";

    if (user.role === "STUDENT") return "/student/dashboard";
    if (user.role === "ADMIN") return "/admin/dashboard";

    return company?.status === "APPROVED"
      ? "/recruiter/dashboard"
      : "/recruiter/profile";
  }, [user, company]);

  const handleLogout = () => {
    setOpenMobile(false);
    setIsNotificationOpen(false);
    disconnectSocket();
    logout();
    router.replace("/login");
  };

  const closeMobileMenu = () => setOpenMobile(false);
  const openMobileMenu = () => setOpenMobile(true);

  const isReady = !isLoading && !!user && !!headerState;

  return {
    isReady,
    isScrolled,
    openMobile,
    headerState,
    homeHref,
    handleLogout,
    closeMobileMenu,
    openMobileMenu,
    setIsNotificationOpen,
  };
}
