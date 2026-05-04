"use client";

import React, { useState } from "react";
import JobCategoriesStats from "./JobCategoriesStats";
import JobCategoriesTable from "./JobCategoriesTable";
import AddCategoryForm from "./AddCategoryForm";
import EditCategoryForm from "./EditCategoryForm";
import DeleteConfirmModal from "./DeleteConfirmModal";
import { useJobCategories } from "../hooks/useJobCategories";
import type { JobCategoriesDataItem } from "../types/job-categories.types";

export default function JobCategoriesPage() {
  const {
    categories,
    meta,
    isLoading,
    stats,
    isStatsLoading,
    page,
    setPage,
    createMutation,
    toggleMutation,
    deleteMutation,
    patchMutation,
  } = useJobCategories();

  const [editingCategory, setEditingCategory] = useState<JobCategoriesDataItem | null>(null);
  const [deletingCategory, setDeletingCategory] = useState<JobCategoriesDataItem | null>(null);

  const handleEdit = (category: JobCategoriesDataItem) => {
    setEditingCategory(category);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePatch = (name: string) => {
    if (editingCategory) {
      patchMutation.mutate(
        { id: editingCategory.categoryId, name },
        {
          onSuccess: () => setEditingCategory(null),
        }
      );
    }
  };

  return (
    <div className="mx-auto max-w-[1400px] space-y-8 px-4 pb-12 pt-4">
      <JobCategoriesStats stats={stats} isLoading={isStatsLoading} />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[380px_1fr]">
        <div className="space-y-6">
          {editingCategory ? (
            <EditCategoryForm
              category={editingCategory}
              onSubmit={handlePatch}
              onCancel={() => setEditingCategory(null)}
              isLoading={patchMutation.isPending}
            />
          ) : (
            <AddCategoryForm 
              onSubmit={(name) => createMutation.mutate(name)} 
              isLoading={createMutation.isPending} 
            />
          )}
        </div>

        <div className="space-y-6">
          <JobCategoriesTable
            categories={categories}
            isLoading={isLoading}
            meta={meta}
            editingId={editingCategory?.categoryId}
            onPageChange={setPage}
            onToggle={(id) => toggleMutation.mutate(id)}
            onDelete={(id) => {
              const category = categories.find(c => c.categoryId === id);
              if (category) setDeletingCategory(category);
            }}
            onEdit={handleEdit}
          />
        </div>
      </div>

      <DeleteConfirmModal
        isOpen={!!deletingCategory}
        categoryName={deletingCategory?.categoryName ?? ""}
        isLoading={deleteMutation.isPending}
        onClose={() => setDeletingCategory(null)}
        onConfirm={() => {
          if (deletingCategory) {
            deleteMutation.mutate(deletingCategory.categoryId, {
              onSuccess: () => setDeletingCategory(null),
            });
          }
        }}
      />
    </div>
  );
}
