import DashboardCards from "@/components/Main/dashboard-cards";

export default function Page({ params }: { params: { courseId: string } }) {
  return <DashboardCards courseId={params.courseId} />;
}
