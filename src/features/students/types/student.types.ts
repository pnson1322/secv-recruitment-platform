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
  isActive: boolean;
};

export type UploadResumeResponse = {
  message: string;
  data: {
    resume_id: number;
    student_id: number;
    resume_name: string;
    cv_url: string;
    is_default: boolean;
    created_at: string;
  };
};

export type MyProfile = {
  studentId: number;
  fullName: string;
  avatarUrl: string | null;
  currentYear: number;
  gpa: string;
  isOpenToWork: boolean;
  skills: {
    skillId: number;
    skillName: string;
  }[];
  resumes: StudentResume[];
};

export type UpdateStudentInfoBody = {
  fullName?: string;
  email?: string;
  phoneNumber?: string;
};

export type StudentGeneralStats = {
  totalStudents: number;
  studying: number;
  graduated: number;
};

export type StudentAdminListItem = {
  studentId: number;
  fullName: string;
  studentCode: string;
  email: string;
  currentYear: number;
  enrollmentYear: number;
  studentStatus: "STUDYING" | "GRADUATED" | "DROPPED_OUT";
  totalApplications: number;
  isActive: boolean;
};

export type StudentListParams = {
  page?: number;
  limit?: number;
  status?: string;
  keyword?: string;
};
