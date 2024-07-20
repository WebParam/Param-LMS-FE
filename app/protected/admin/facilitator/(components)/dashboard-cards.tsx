"use client";
import { Container, Row, Col } from "react-bootstrap";
import CardComponent from "@/app/components/facilitator/Card/Card";
import PageHeader from "./PageHeader";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type IconType =
  | "schedule"
  | "createAssessment"
  | "leaderBoard"
  | "feedback"
  | "markAssessment"
  | "logbook";

const DashboardCards = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = () => {
    router.push(`${pathname}?title=${encodeURIComponent("KNOWLEDGE MODULES")}`);
  };

  const cardData: { link: string; icon: IconType; title: string }[] = [
    { link: "#", icon: "schedule", title: "Schedule Class" },
    { link: "#", icon: "createAssessment", title: "Create Assessment" },
    { link: "#", icon: "leaderBoard", title: "Leader Board" },
    {
      link: `/protected/admin/moderator-feedback/pages/assessments?title=Assessments Feedback&homeTitle=HOME&page=grouped&button-title=Dashboard`,
      icon: "feedback",
      title: "Moderator Feedback",
    },
    {
      link: `/protected/admin/assessments-assignments/pages/assessments?title=${encodeURIComponent(
        "Mark Assessments"
      )}&homeTitle=Facilitator Dashboard&button-title=Dashboard&page=grouped`,
      icon: "markAssessment",
      title: `Mark\n Assessments \n& \n Assignments`,
    },
    { link: "#", icon: "logbook", title: "Logbook" },
  ];

  return (
    <Container className="mt-5 m-auto">
      <PageHeader title="Facilitator Dashboard" />
      <Row className="mt-4 ml-5 justify-content-center">
        {cardData.map((card, index) => (
          <Col key={index} md={6} lg={4} className="mb-4 mx-auto">
            <CardComponent
              link={card.link}
              icon={card.icon}
              title={card.title}
              handleClick={handleClick}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default DashboardCards;
