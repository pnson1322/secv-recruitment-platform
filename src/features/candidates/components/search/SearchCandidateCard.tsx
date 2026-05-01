import { Mail, Star } from "lucide-react";
import CandidateAvatar from "../shared/CandidateAvatar";
import type { StudentCardItem } from "../../types/student-card.types";

type Props = {
  student: StudentCardItem;
  onViewProfile: (studentId: number) => void;
  onInvite: (student: StudentCardItem) => void;
  inviteDisabled?: boolean;
  inviteDisabledReason?: string | null;
};

function getYearLabel(student: StudentCardItem): string {
  const currentYear = String(student.currentYear ?? "").trim();
  const studentStatus = String(student.studentStatus ?? "")
    .trim()
    .toUpperCase();

  if (
    studentStatus === "GRADUATED" ||
    currentYear.toUpperCase() === "GRADUATED"
  ) {
    return "Đã tốt nghiệp";
  }

  if (!currentYear) {
    return "Chưa cập nhật năm học";
  }

  return `Năm ${currentYear}`;
}

function getGpaLabel(gpa: StudentCardItem["gpa"]): string {
  if (gpa === null || gpa === undefined || gpa === "") {
    return "Chưa cập nhật";
  }

  const numericValue = Number(gpa);

  if (Number.isFinite(numericValue)) {
    return numericValue.toFixed(1);
  }

  return String(gpa);
}

export default function SearchCandidateCard({
  student,
  onViewProfile,
  onInvite,
  inviteDisabled = false,
  inviteDisabledReason,
}: Props) {
  const visibleSkills = student.skills.slice(0, 5);
  const remainingSkillsCount = Math.max(
    student.skills.length - visibleSkills.length,
    0,
  );

  return (
    <article className="flex h-full flex-col rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-5">
      <div className="flex-1">
        <div className="flex items-start gap-3.5">
          <CandidateAvatar
            name={student.fullName}
            avatarUrl={student.avatarUrl}
            size={56}
          />

          <div className="min-w-0 flex-1">
            <h3 className="truncate text-[18px] font-bold text-slate-900 sm:text-[20px]">
              {student.fullName}
            </h3>

            <p className="mt-0.5 text-[14px] font-medium text-slate-500">
              {getYearLabel(student)}
            </p>

            <div className="mt-2 flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1.5 text-[14px] font-semibold text-slate-800">
                <Star size={16} className="fill-amber-400 text-amber-400" />
                <span>GPA: {getGpaLabel(student.gpa)}</span>
              </div>

              {student.isOpenToWork ? (
                <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-[12px] font-bold text-emerald-600">
                  Đang tìm việc
                </span>
              ) : null}
            </div>
          </div>
        </div>

        <div className="mt-4">
          <p className="mb-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">
            Kỹ năng
          </p>

          <div className="flex flex-wrap gap-1.5">
            {visibleSkills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-slate-100 px-2.5 py-1 text-[13px] font-medium text-slate-700"
              >
                {skill}
              </span>
            ))}

            {remainingSkillsCount > 0 ? (
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[13px] font-medium text-slate-500">
                +{remainingSkillsCount}
              </span>
            ) : null}
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => onViewProfile(student.studentId)}
          className="h-10 rounded-2xl border border-slate-200 bg-white text-[14px] font-semibold text-slate-800 transition hover:border-cyan-300 hover:bg-slate-50"
        >
          Xem hồ sơ
        </button>

        <button
          type="button"
          onClick={() => onInvite(student)}
          disabled={inviteDisabled}
          title={inviteDisabled ? inviteDisabledReason || undefined : undefined}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-2xl bg-cyan-500 px-4 text-[14px] font-semibold text-white transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:bg-cyan-300"
        >
          <Mail size={16} />
          Mời ứng tuyển
        </button>
      </div>

      {inviteDisabled && inviteDisabledReason ? (
        <p className="mt-2.5 text-[12px] text-slate-500">
          {inviteDisabledReason}
        </p>
      ) : null}
    </article>
  );
}
