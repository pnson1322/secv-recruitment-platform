export type StudentCardYearValue = 1 | 2 | 3 | 4 | "GRADUATED";

export type StudentStatus = "STUDYING" | "GRADUATED" | "DROPPED_OUT";

export type StudentCardItem = {
  studentId: number;
  fullName: string;
  avatarUrl: string | null;
  currentYear?: number | string | null;
  gpa: string | number | null;
  isOpenToWork: boolean;
  skills: string[];
  studentStatus?: StudentStatus | null;
};

export type StudentCardMeta = {
  totalItems: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
};

export type StudentCardListResponse = {
  success: boolean;
  message: string;
  data: {
    data: StudentCardItem[];
    meta: StudentCardMeta;
  };
};

export type GetStudentCardsParams = {
  page?: number;
  limit?: number;
  search?: string;
  majorId?: number;
  years?: StudentCardYearValue[];
  minGpa?: number;
  skillIds?: number[];
  isOpenToWork?: boolean;
};

export type SearchCandidatesFiltersValue = {
  search: string;
  majorId: string;
  years: StudentCardYearValue[];
  minGpa: number;
  skillIds: number[];
  isOpenToWork: boolean;
};
