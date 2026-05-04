import JobPostingDetailPageContent from "@/features/job-postings/components/company/JobPostingDetailPageContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chi tiết Tin tuyển dụng",
  description: "Xem chi tiết và quản lý tin tuyển dụng",
};

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;

  return <JobPostingDetailPageContent jobId={Number(id)} />;
}
