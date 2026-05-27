"use client";

import { BriefcaseBusiness, CalendarDays, MapPin, Wallet } from "lucide-react";
import CustomSelect from "@/components/CustomSelect";
import CreateJobSectionTitle from "./CreateJobSectionTitle";
import type {
  CreateJobPostingFieldErrors,
  CreateJobPostingFormValues,
} from "../../../schemas/create-job-posting.schema";

type Option = {
  label: string;
  value: string;
};

type Props = {
  values: CreateJobPostingFormValues;
  errors: CreateJobPostingFieldErrors;
  categoryOptions: Option[];
  onChange: <K extends keyof CreateJobPostingFormValues>(
    field: K,
    value: CreateJobPostingFormValues[K],
  ) => void;
};

type SalaryModeOption = "RANGE" | "NEGOTIABLE";

const salaryModeOptions: Array<{
  label: string;
  value: SalaryModeOption;
}> = [
  { label: "Khoảng lương", value: "RANGE" },
  { label: "Thỏa thuận", value: "NEGOTIABLE" },
];

const LOCATIONS = [
  "Hà Nội",
  "Hồ Chí Minh",
  "Bình Dương",
  "Đà Nẵng",
  "Đồng Nai",
  "Long An",
  "Bà Rịa - Vũng Tàu",
  "Hải Phòng",
  "Bắc Ninh",
  "Cần Thơ",
  "Hà Nam",
  "Quảng Nam",
  "Hưng Yên",
  "Vĩnh Phúc",
  "Thừa Thiên Huế",
  "Khánh Hòa",
  "Hải Dương",
  "Tiền Giang",
  "Thanh Hóa",
  "Nam Định",
  "Bắc Giang",
  "Thái Bình",
  "Phú Thọ",
  "Nghệ An",
  "Quảng Ngãi",
  "Bình Định",
  "Quảng Ninh",
  "Lâm Đồng",
  "Kiên Giang",
  "Tây Ninh",
  "An Giang",
  "Hậu Giang",
  "Trà Vinh",
  "Bình Phước",
  "Đồng Tháp",
  "Bến Tre",
  "Vĩnh Long",
  "Lào Cai",
  "Sơn La",
  "Thái Nguyên",
  "Hòa Bình",
  "Sóc Trăng",
  "Yên Bái",
  "Phú Yên",
  "Cà Mau",
  "Lạng Sơn",
  "Tuyên Quang",
  "Bình Thuận",
  "Đắk Lắk",
  "Quảng Trị",
  "Đắk Nông",
  "Gia Lai",
  "Hà Giang",
  "Kon Tum",
  "Bắc Kạn",
  "Cao Bằng",
  "Điện Biên",
  "Lai Châu",
  "Ninh Thuận",
  "Quảng Bình",
];

const LOCATION_OPTIONS = LOCATIONS.sort().map((loc) => ({ label: loc, value: loc }));

export default function CreateJobBasicInfoSection({
  values,
  errors,
  categoryOptions,
  onChange,
}: Props) {
  const isNegotiable = values.salaryMode === "NEGOTIABLE";

  return (
    <section className="space-y-5">
      <CreateJobSectionTitle
        icon={<BriefcaseBusiness size={20} />}
        title="Thông tin cơ bản"
      />

      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-[14px] font-semibold text-(--color-text)">
            Tiêu đề công việc <span className="text-red-500">*</span>
          </label>
          <input
            data-field="jobTitle"
            value={values.jobTitle}
            onChange={(e) => onChange("jobTitle", e.target.value)}
            placeholder="Ví dụ: Frontend Developer, Backend Intern..."
            className={`h-12 w-full rounded-2xl bg-white px-4 text-[15px] text-(--color-text) outline-none transition ${
              errors.jobTitle
                ? "border border-red-400"
                : "border border-(--color-border) focus:border-(--color-accent)"
            }`}
          />
          {errors.jobTitle ? (
            <p className="mt-2 text-[13px] text-red-500">{errors.jobTitle}</p>
          ) : null}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-[14px] font-semibold text-(--color-text)">
              Địa điểm <span className="text-red-500">*</span>
            </label>
            <div className="relative [&_button]:pl-11 [&_button]:rounded-2xl [&_button]:h-12 [&_button_span]:text-[15px]">
              <div className="absolute inset-y-0 left-4 z-10 flex items-center pointer-events-none text-(--color-muted)">
                <MapPin size={18} />
              </div>
              <CustomSelect
                label=""
                placeholder="Chọn địa điểm"
                value={values.city}
                options={LOCATION_OPTIONS}
                error={errors.city}
                onChange={(value) => onChange("city", value)}
              />
            </div>
            {errors.city ? (
              <p className="mt-2 text-[13px] text-red-500">{errors.city}</p>
            ) : null}
          </div>

          <div>
            <label className="mb-2 block text-[14px] font-semibold text-(--color-text)">
              Hạn chót <span className="text-red-500">*</span>
            </label>
            <div
              className={`flex h-12 items-center gap-3 rounded-2xl bg-white px-4 ${
                errors.applicationDeadline
                  ? "border border-red-400"
                  : "border border-(--color-border)"
              }`}
            >
              <CalendarDays size={18} className="text-(--color-muted)" />
              <input
                data-field="applicationDeadline"
                type="date"
                value={values.applicationDeadline}
                onChange={(e) =>
                  onChange("applicationDeadline", e.target.value)
                }
                className="w-full bg-transparent text-[15px] text-(--color-text) outline-none"
              />
            </div>
            {errors.applicationDeadline ? (
              <p className="mt-2 text-[13px] text-red-500">
                {errors.applicationDeadline}
              </p>
            ) : null}
          </div>
        </div>

        <div>
          <label className="mb-3 block text-[14px] font-semibold text-(--color-text)">
            Mức lương <span className="text-red-500">*</span>
          </label>

          <div className="mb-4 flex flex-wrap items-center gap-7">
            {salaryModeOptions.map((option) => {
              const checked = values.salaryMode === option.value;

              return (
                <label
                  key={option.value}
                  className="inline-flex cursor-pointer items-center gap-2.5"
                >
                  <input
                    type="radio"
                    name="salaryMode"
                    checked={checked}
                    onChange={() => onChange("salaryMode", option.value)}
                    className="sr-only"
                  />

                  <span
                    className={`flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full border transition ${
                      checked
                        ? "border-(--color-accent) bg-white"
                        : "border-slate-400 bg-white"
                    }`}
                  >
                    <span
                      className={`rounded-full transition ${
                        checked
                          ? "h-2.5 w-2.5 bg-(--color-accent)"
                          : "h-0 w-0 bg-transparent"
                      }`}
                    />
                  </span>

                  <span className="text-[15px] font-semibold leading-none text-(--color-text)">
                    {option.label}
                  </span>
                </label>
              );
            })}
          </div>

          {isNegotiable ? (
            <div className="flex h-12 items-center rounded-2xl border border-(--color-border) bg-white px-4 text-[15px] text-(--color-muted)">
              Mức lương sẽ được thỏa thuận khi phỏng vấn
            </div>
          ) : (
            <div className="grid items-center gap-4 md:grid-cols-[1fr_24px_1fr]">
              <div
                className={`flex h-12 items-center gap-3 rounded-2xl bg-white px-4 ${
                  errors.salaryMin
                    ? "border border-red-400"
                    : "border border-(--color-border)"
                }`}
              >
                <Wallet size={18} className="text-(--color-muted)" />
                <input
                  data-field="salaryMin"
                  value={values.salaryMin}
                  onChange={(e) => onChange("salaryMin", e.target.value)}
                  placeholder="5000000"
                  className="w-full bg-transparent text-[15px] text-(--color-text) outline-none placeholder:text-slate-400"
                />
              </div>

              <span className="text-center text-(--color-muted)">-</span>

              <div
                className={`flex h-12 items-center gap-3 rounded-2xl bg-white px-4 ${
                  errors.salaryMax
                    ? "border border-red-400"
                    : "border border-(--color-border)"
                }`}
              >
                <Wallet size={18} className="text-(--color-muted)" />
                <input
                  data-field="salaryMax"
                  value={values.salaryMax}
                  onChange={(e) => onChange("salaryMax", e.target.value)}
                  placeholder="7 triệu VNĐ"
                  className="w-full bg-transparent text-[15px] text-(--color-text) outline-none placeholder:text-slate-400"
                />
              </div>
            </div>
          )}

          {errors.salaryMin ? (
            <p className="mt-2 text-[13px] text-red-500">{errors.salaryMin}</p>
          ) : null}
          {!errors.salaryMin && errors.salaryMax ? (
            <p className="mt-2 text-[13px] text-red-500">{errors.salaryMax}</p>
          ) : null}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-[14px] font-semibold text-(--color-text)">
              Số lượng tuyển <span className="text-red-500">*</span>
            </label>
            <input
              data-field="numberOfPositions"
              value={values.numberOfPositions}
              onChange={(e) => onChange("numberOfPositions", e.target.value)}
              placeholder="Ví dụ: 2"
              className={`h-12 w-full rounded-2xl bg-white px-4 text-[15px] text-(--color-text) outline-none transition ${
                errors.numberOfPositions
                  ? "border border-red-400"
                  : "border border-(--color-border) focus:border-(--color-accent)"
              }`}
            />
            {errors.numberOfPositions ? (
              <p className="mt-2 text-[13px] text-red-500">
                {errors.numberOfPositions}
              </p>
            ) : null}
          </div>

          <div>
            <label className="mb-2 block text-[14px] font-semibold text-(--color-text)">
              Loại công việc <span className="text-red-500">*</span>
            </label>
            <div
              data-field="categoryId"
              tabIndex={-1}
              className="rounded-2xl outline-none"
            >
              <CustomSelect
                label=""
                placeholder="Chọn loại công việc"
                value={values.categoryId}
                options={categoryOptions}
                error={errors.categoryId}
                onChange={(value) => onChange("categoryId", value)}
              />
            </div>
            {errors.categoryId ? (
              <p className="mt-2 text-[13px] text-red-500">
                {errors.categoryId}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
