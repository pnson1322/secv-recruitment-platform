export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type StudentStatus = "STUDYING" | "GRADUATED" | "DROPPED_OUT";

export type EvaluationBody = {
  companyId: number;
  ratting: number;
  content: string;
};

export type EvaluationResponse = {
  id: number;
  studentId: number;
  companyId: number;
  rating: number;
  content: string;
  createdAt: string;
};

export type StudentResume = {
  resumeId: number;
  resumeName: string;
  cvUrl: string;
  isDefault: boolean;
};

export type StudentProfile = {
  studentId: number;
  fullName: string;
  studentCode: string;
  emailStudent: string;
  phone: string;
  createdAt: string;
  studentStatus: StudentStatus;
  currentYear: number;
  enrollmentYear: number;
  gpa: number;
  isOpenToWork: boolean;
  majorName: string;
  skills: string[];
  resumes: StudentResume[];
  totalApplications?: number;
};
