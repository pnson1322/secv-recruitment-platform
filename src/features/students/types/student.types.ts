export type StudentStatus = "STUDYING" | "GRADUATED" | "DROPPED_OUT";

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
