"use client";
import { Container, Row, Col } from "react-bootstrap";
import CardComponent from "../facilitator/Card/Card";
import PageHeader from "../facilitator/PageHeader";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useParams } from "react-router-dom";

type IconType =
  | "schedule"
  | "createAssessment"
  | "leaderBoard"
  | "feedback"
  | "markAssessment"
  | "logbook";

const DashboardCards = ({ courseId }: { courseId: string }) => {
  const pathname = usePathname();
  // const { courseId } = useParams();
  const router = useRouter();

  const handleClick = () => {
    router.push(`${pathname}?title=${encodeURIComponent("KNOWLEDGE MODULES")}`);
  };
  const searchParams = useSearchParams();
  const courseTitle = searchParams.get("title") || "";

  const cardData: { link: string; icon: IconType; title: string }[] = [
    {
      link: `/protected/admin/scheduleclass?title=${courseTitle}&id=${courseId}`,
      icon: "schedule",
      title: "Schedule Class",
    },
    { link: "#", icon: "createAssessment", title: "Schedule Assessment" },
    { link: "#", icon: "leaderBoard", title: "Leader Board" },
    {
      link: `/protected/admin/moderator-feedback/pages/assessments?title=${courseTitle}&id=${courseId}`,
      icon: "feedback",
      title: "Moderator Feedback",
    },
    {
      link: `/protected//admin/courses/${courseId}/grade/assessments?title=${courseTitle}`,
      icon: "markAssessment",
      title: `Mark Assessments`,
    },
    {
      link: `/protected/admin/logbook/pages/completed?title=${courseTitle}&id=${courseId}`,
      icon: "logbook",
      title: "Logbook",
    },
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
