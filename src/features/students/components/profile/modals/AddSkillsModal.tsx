"use client";

import { X, Search, Sparkles, Check, Loader2 } from "lucide-react";
import ClientPortal from "@/components/ClientPortal";
import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getSkillList } from "@/features/job-postings/api/job-postings.api";
import { putSkills } from "../../../api/student.api";
import { toast } from "sonner";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  currentSkillIds: number[];
};

export default function AddSkillsModal({ open, onClose, onSuccess, currentSkillIds }: Props) {
  const [search, setSearch] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const { data: allSkillsRes, isLoading } = useQuery({
    queryKey: ["all-skills"],
    queryFn: getSkillList,
    enabled: open,
  });

  const allSkills = allSkillsRes?.data || [];

  const filteredSkills = useMemo(() => {
    return allSkills.filter(s => 
      s.skillName.toLowerCase().includes(search.toLowerCase()) &&
      !currentSkillIds.includes(s.skillId)
    );
  }, [allSkills, search, currentSkillIds]);

  const onAddSkill = async (skillId: number) => {
    setIsUpdating(true);
    try {
      const newSkillIds = [...currentSkillIds, skillId];
      await putSkills({ skillIds: newSkillIds });
      toast.success("Đã thêm kỹ năng");
      onSuccess();
    } catch (error) {
      toast.error("Lỗi khi thêm kỹ năng");
    } finally {
      setIsUpdating(false);
    }
  };

  if (!open) return null;

  return (
    <ClientPortal>
      <div 
        className="fixed inset-0 z-[600] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
        onClick={onClose}
      >
        <div 
          className="flex h-[80vh] w-full max-w-[500px] flex-col overflow-hidden rounded-[24px] bg-white shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
            <h3 className="text-[18px] font-bold text-slate-900">Thêm kỹ năng mới</h3>
            <button 
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex flex-1 flex-col overflow-hidden p-6">
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Tìm kiếm kỹ năng..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-[14px] outline-none transition focus:bg-white focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500"
              />
            </div>

            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-10">
                  <Loader2 className="animate-spin text-cyan-500" size={32} />
                  <p className="mt-2 text-[14px] text-slate-500">Đang tải danh sách kỹ năng...</p>
                </div>
              ) : filteredSkills.length > 0 ? (
                <div className="grid grid-cols-1 gap-2">
                  {filteredSkills.map((skill) => (
                    <button
                      key={skill.skillId}
                      disabled={isUpdating}
                      onClick={() => onAddSkill(skill.skillId)}
                      className="flex items-center justify-between rounded-xl border border-slate-100 p-4 transition hover:border-cyan-200 hover:bg-cyan-50/30 group"
                    >
                      <span className="text-[14px] font-bold text-slate-700 group-hover:text-cyan-700">{skill.skillName}</span>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-400 group-hover:bg-cyan-500 group-hover:text-white transition">
                        <Check size={16} />
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <Sparkles size={32} className="text-slate-200 mb-2" />
                  <p className="text-[14px] text-slate-500">Không tìm thấy kỹ năng nào phù hợp</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ClientPortal>
  );
}
