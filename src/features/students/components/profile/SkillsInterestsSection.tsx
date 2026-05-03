"use client";

import { Target, X, Plus, Sparkles } from "lucide-react";
import { useState } from "react";

type Props = {
  skills: { skillId: number; skillName: string }[];
  onAddClick: () => void;
  onRemoveSkill: (skillId: number) => Promise<void>;
};

export default function SkillsInterestsSection({ skills, onAddClick, onRemoveSkill }: Props) {
  return (
    <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-600">
          <Sparkles size={22} />
        </div>
        <div>
          <h2 className="text-[20px] font-bold text-slate-900 uppercase">Kỹ năng của bạn</h2>
          <p className="text-[14px] text-slate-500">Thêm các kỹ năng chuyên môn để hồ sơ của bạn nổi bật hơn.</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2.5">
        {skills.length > 0 ? (
          skills.map((skill) => (
            <div 
              key={skill.skillId}
              className="flex items-center gap-2 rounded-full border border-cyan-100 bg-cyan-50/50 px-4 py-1.5 text-[14px] font-semibold text-cyan-700 transition hover:bg-cyan-100"
            >
              {skill.skillName}
              <button 
                onClick={() => onRemoveSkill(skill.skillId)}
                className="text-cyan-400 hover:text-cyan-600 transition"
              >
                <X size={14} />
              </button>
            </div>
          ))
        ) : (
          <div className="flex w-full flex-col items-center justify-center py-6 text-center border-2 border-dashed border-slate-100 rounded-[20px]">
             <Sparkles size={32} className="text-slate-200 mb-2" />
             <p className="text-[14px] text-slate-400 font-medium">Chưa có kỹ năng nào được thêm.</p>
          </div>
        )}
        
        <button 
          onClick={onAddClick}
          className="flex items-center gap-1.5 rounded-full border-2 border-dashed border-slate-200 px-4 py-1.5 text-[14px] font-bold text-slate-400 transition hover:border-cyan-300 hover:text-cyan-500"
        >
          <Plus size={14} />
          Thêm kỹ năng
        </button>
      </div>
    </section>
  );
}
