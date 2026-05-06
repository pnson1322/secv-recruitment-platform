"use client";

import { Eye, Ban, User, CheckCircle2 } from "lucide-react";
import { useStudentTable } from "../../hooks/useStudentTable";
import type { StudentAdminListItem } from "../../types/student.types";
import StudentProfileModal from "../StudentProfileModal";

type Props = {
  students: StudentAdminListItem[];
  isLoading: boolean;
};

const STATUS_META = {
  STUDYING: { label: "Đang học", color: "bg-blue-50 text-blue-600", dot: "bg-blue-500" },
  GRADUATED: { label: "Đã tốt nghiệp", color: "bg-emerald-50 text-emerald-600", dot: "bg-emerald-500" },
  DROPPED_OUT: { label: "Thôi học", color: "bg-red-50 text-red-600", dot: "bg-red-500" },
};

export default function StudentTable({ students, isLoading }: Props) {
  const {
    selectedStudentId,
    openDetail,
    setOpenDetail,
    toggleActiveMutation,
    handleViewDetail,
    handleToggleActive,
  } = useStudentTable();

  if (isLoading) {
    return (
      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="h-14 bg-slate-50/80 animate-pulse" />
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex h-16 items-center border-t border-slate-50 px-6 animate-pulse">
            <div className="h-10 w-10 rounded-full bg-slate-50 mr-4" />
            <div className="h-4 w-40 rounded bg-slate-50" />
          </div>
        ))}
      </div>
    );
  }

  if (students.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-100 bg-white py-24 shadow-sm">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-slate-50 text-slate-200">
          <User size={48} />
        </div>
        <p className="mt-6 text-[18px] font-bold text-slate-900">Danh sách trống</p>
        <p className="text-[14px] text-slate-500">Hiện không có sinh viên nào khớp với bộ lọc.</p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-blue-50 border-b border-blue-100">
                <th className="whitespace-nowrap px-6 py-5 text-[14px] font-bold uppercase tracking-wider text-slate-500 text-center">Sinh viên</th>
                <th className="whitespace-nowrap px-6 py-5 text-[14px] font-bold uppercase tracking-wider text-slate-500 text-center">MSSV</th>
                <th className="whitespace-nowrap px-6 py-5 text-[14px] font-bold uppercase tracking-wider text-slate-500 text-center">Email</th>
                <th className="whitespace-nowrap px-6 py-5 text-[14px] font-bold uppercase tracking-wider text-slate-500 text-center">Năm học</th>
                <th className="whitespace-nowrap px-6 py-5 text-[14px] font-bold uppercase tracking-wider text-slate-500 text-center">Trạng thái học</th>
                <th className="whitespace-nowrap px-6 py-5 text-[14px] font-bold uppercase tracking-wider text-slate-500 text-center">Tài khoản</th>
                <th className="whitespace-nowrap px-6 py-5 text-[14px] font-bold uppercase tracking-wider text-slate-500 text-center">Đơn đã nộp</th>
                <th className="whitespace-nowrap px-6 py-5 text-[14px] font-bold uppercase tracking-wider text-slate-500 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {students.map((student) => {
                const status = STATUS_META[student.studentStatus];
                return (
                  <tr key={student.studentId} className="group hover:bg-blue-50/20 transition-colors">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-[15px] font-bold text-white uppercase shadow-sm transition-transform group-hover:scale-105">
                          {student.fullName.charAt(0)}
                        </div>
                        <span className="text-[15px] font-semibold text-slate-900">{student.fullName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className="text-[14px] font-semibold text-slate-600">{student.studentCode}</span>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className="text-[14px] font-medium text-slate-600">{student.email}</span>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className="text-[14px] font-semibold text-slate-600">
                        {student.studentStatus === "GRADUATED" ? "Đã tốt nghiệp" : `Năm ${student.currentYear}`}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <div className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-bold uppercase tracking-tight ${status.color}`}>
                        {status.label}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <div className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-bold uppercase tracking-tight ${(student.isActive ?? (student as any).is_active) ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}>
                        {(student.isActive ?? (student as any).is_active) ? "Hoạt động" : "Bị khóa"}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className="text-[15px] font-bold text-slate-700">{student.totalApplications}</span>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <div className="flex items-center justify-center gap-3">
                        <button 
                          onClick={() => handleViewDetail(student.studentId)}
                          className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition-all hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-200 active:scale-90"
                          title="Xem chi tiết"
                        >
                          <Eye size={20} strokeWidth={2.5} />
                        </button>
                        <button 
                          onClick={() => {
                            const currentActive = student.isActive ?? (student as any).is_active;
                            handleToggleActive(student.studentId, currentActive);
                          }}
                          disabled={toggleActiveMutation.isPending}
                          className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all active:scale-90 disabled:opacity-50 ${
                            (student.isActive ?? (student as any).is_active) 
                              ? "bg-slate-100 text-slate-500 hover:bg-red-500 hover:text-white hover:shadow-lg hover:shadow-red-200" 
                              : "bg-emerald-50 text-emerald-500 hover:bg-emerald-500 hover:text-white hover:shadow-lg hover:shadow-emerald-200"
                          }`}
                          title={(student.isActive ?? (student as any).is_active) ? "Khóa sinh viên" : "Mở khóa sinh viên"}
                        >
                          {(student.isActive ?? (student as any).is_active) ? <Ban size={20} strokeWidth={2.5} /> : <CheckCircle2 size={20} strokeWidth={2.5} />}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <StudentProfileModal
        open={openDetail}
        onClose={() => setOpenDetail(false)}
        studentId={selectedStudentId}
        role="admin"
      />
    </>
  );
}
