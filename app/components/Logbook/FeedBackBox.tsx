import { FC } from 'react';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

interface Feedback {
  day: string;
  feedback: string;
  mood: 'Happy' | 'Neutral' | 'Sad';
}

interface FeedbackBoxProps {
  feedbacks: Feedback[];
}

const FeedbackBox: FC<FeedbackBoxProps> = ({ feedbacks }) => {
  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case 'Happy':
        return <SentimentSatisfiedIcon style={{ color: 'green' }} />;
      case 'Neutral':
        return <SentimentNeutralIcon style={{ color: 'gray' }} />;
      case 'Sad':
        return <SentimentDissatisfiedIcon style={{ color: 'red' }} />;
      default:
        return null;
    }
  };

  return (
    <div className="feedback-box">
      {feedbacks.map((feedback, index) => (
        <div key={index} className="feedback-item">
          <h6>{feedback.day}</h6>
          <p>{feedback.feedback}</p>
          <div className="feedback-mood">
            {getMoodIcon(feedback.mood)}
            <span>{feedback.mood}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeedbackBox;