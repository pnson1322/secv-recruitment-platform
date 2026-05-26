"use client";

import StudentWelcomeBanner from "./student/StudentWelcomeBanner";
import RecommendationsSection from "./student/RecommendationsSection";
import AllJobsSection from "./student/AllJobsSection";

export default function StudentDashboardPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-2 sm:px-6 lg:px-8">
      <StudentWelcomeBanner />

      <RecommendationsSection />

      <AllJobsSection />
    </div>
  );
}
