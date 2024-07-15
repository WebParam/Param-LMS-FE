"use client";
import { Card } from "react-bootstrap";
import {
  FaChalkboardTeacher,
  FaClipboardList,
  FaTrophy,
  FaCommentDots,
  FaPercentage,
  FaBook,
} from "react-icons/fa";
import styles from "./card.module.css";
import Link from "next/link";

const icons = {
  schedule: <FaChalkboardTeacher color="#77c13a" size={50} />,
  createAssessment: <FaClipboardList color="#77c13a" size={50} />,
  leaderBoard: <FaTrophy color="#77c13a" size={50} />,
  feedback: <FaCommentDots color="#77c13a" size={50} />,
  markAssessment: <FaPercentage color="#77c13a" size={50} />,
  logbook: <FaBook color="#77c13a" size={50} />,
};

type IconKey = keyof typeof icons;

interface CardComponentProps {
  icon: IconKey;
  title: string;
  link: string;
  handleClick: () => void;
}

const CardComponent = ({ icon, title, link, handleClick }: CardComponentProps) => {
  return (
    <Link href={link}>
      <Card className={`text-center ${styles.cardCustomSize}`} onClick={handleClick}>
        <Card.Body className={styles.cardBodyCentered}>
          <div className={styles.iconWrapper}>{icons[icon]}</div>
          <Card.Title>
            {title.split('\n').map((line, index) => (
              <span key={index}>
                {line}
                {index < title.split('\n').length - 1 && <br />}
              </span>
            ))}
          </Card.Title>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default CardComponent;
