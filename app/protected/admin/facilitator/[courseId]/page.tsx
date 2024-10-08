import DashboardCards from "@/app/components/facilitator/dashboard-cards";

export default function Page({ params }: { params: { courseId: string } }) {
  return <DashboardCards courseId={params.courseId} />;
}
