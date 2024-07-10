"use client"
import { Container, Row, Col } from "react-bootstrap";
import CardComponent from "@/app/components/facilitator/Card/Card";
import PageHeader from "./PageHeader";
import { usePathname, useRouter } from "next/navigation";

type IconType = "schedule" | "createAssessment" | "leaderBoard" | "feedback" | "markAssessment" | "logbook";

const DashboardCards = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = () => {
    router.push(`${pathname}?title=${encodeURIComponent("KNOWLEDGE MODULES")}`);
  };

  const cardData: { link: string; icon: IconType; title: string }[] = [
    { link: "#", icon: "schedule", title: "Schedule Class" },
    { link: "#", icon: "createAssessment", title: "Create Assessment" },
    { link: "#", icon: "leaderBoard", title: "Leader Board" },
    { link: "#", icon: "feedback", title: "Moderator Feedback" },
    { link: `/protected/admin/assessments?title=${encodeURIComponent("KNOWLEDGE MODULES")}`, icon: "markAssessment", title: "Mark Assessment" },
    { link: "#", icon: "logbook", title: "Logbook" },
  ];

  return (
    <Container className="mt-5 m-auto">
      <PageHeader title="Facilitator Dashboard" facilitator />
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
