import type { StudentStatus } from "./student-card.types";

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type ApplicationStatus =
  | "submitted"
  | "interviewing"
  | "passed"
  | "rejected";

export type InvitationStatus = "pending" | "accepted" | "rejected" | "expired";

export type CandidateTab =
  | "all"
  | "pending" 
  | "approved" 
  | "result" 
  | "invited";

export type ResultSubFilter = "all" | "passed" | "rejected";

export type CandidateSkill = {
  skillId: number;
  skillName: string;
};

export type CandidateStudent = {
  studentId: number;
  fullName: string;
  email: string;
  avatarUrl: string | null;
  currentYear?: number;
  majorName?: string;
  gpa?: string;
  phone?: string;
  skills?: CandidateSkill[];
  isOpenToWork?: boolean;
  studentStatus?: StudentStatus;
};

export type CandidateJob = {
  jobId?: number;
  jobTitle: string;
};

export type Application = {
  applicationId: number;
  status: ApplicationStatus;
  cvUrl: string;
  createdAt: string;
  updatedAt?: string;
  student: CandidateStudent;
  job: CandidateJob;
  adminNote?: string | null;
  hrNote?: string | null;
};

export type Invitation = {
  invitationId: number;
  status: InvitationStatus;
  message: string;
  createdAt: string;
  student: CandidateStudent;
  job: CandidateJob;
};

export type ApplicationData = {
  data: Application[];
  meta: {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
  };
};

export type InvitationData = {
  data: Invitation[];
  meta: {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
  };
};

export type ApplicationStatsResponse = {
  total: number;
  byStatus: {
    submitted: number;
    interviewing: number;
    passed: number;
    rejected: number;
  };
};

export type InvitationStatsResponse = {
  total: number;
  byStatus: {
    pending: number;
    accepted: number;
    rejected: number;
    expired: number;
  };
};

export type ResultStats = {
  total: number;
  passed: number;
  failed: number;
};

export type UpdateApplicationStatus = {
  props: {
    id: number;
    jobId: number;
    studentId: number;
    cvUrl: string;
    coverLetter: string;
    status: ApplicationStatus;
    createdAt: string;
    updatedAt: string;
  }
}

export type SendInvitation = {
  props: {
    id: number;
    jobId: number;
    studentId: number;
    message: string;
    status: ApplicationStatus;
    createdAt: string;
    updatedAt: string;
  }
}