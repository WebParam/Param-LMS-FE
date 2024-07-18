import { FC } from 'react';
import moment from 'moment';
import FeedbackBox from './FeedBackBox';
import DownloadButton from './DownloadButton';

interface Logbook {
  daysLogged: number;
  totalDays: number;
}

interface Student {
  name: string;
  logbooks: Logbook[];
}

interface StudentLogbookProps {
  student: Student;
  week: number;
}

interface Feedback {
  day: string;
  feedback: string;
  mood: 'Happy' | 'Neutral' | 'Sad';
}

const feedbacks: { [key: string]: Feedback[] } = {
  'John Doe': [
    {
      day: 'Monday',
      feedback: 'The class was very engaging and I learned a lot about algebra.',
      mood: 'Happy',
    },
    {
      day: 'Tuesday',
      feedback: 'The class was okay, but I found the topic on geometry a bit challenging.',
      mood: 'Neutral',
    },
    {
      day: 'Wednesday',
      feedback: 'Today\'s class on calculus was very difficult to follow.',
      mood: 'Sad',
    },
    {
      day: 'Thursday',
      feedback: 'The class on statistics was interesting, and I enjoyed the group activities.',
      mood: 'Happy',
    },
    {
      day: 'Friday',
      feedback: 'The class on trigonometry was very informative and well-taught.',
      mood: 'Happy',
    },
  ],
  'Jane Smith': [
    {
      day: 'Monday',
      feedback: 'I enjoyed the class on algebra, it was very interactive.',
      mood: 'Happy',
    },
    {
      day: 'Tuesday',
      feedback: 'Geometry was a bit tough, but I managed to understand the basics.',
      mood: 'Neutral',
    },
    {
      day: 'Wednesday',
      feedback: 'Calculus was challenging, I need to review the material again.',
      mood: 'Sad',
    },
    {
      day: 'Thursday',
      feedback: 'Statistics class was fun, especially the group activities.',
      mood: 'Happy',
    },
    {
      day: 'Friday',
      feedback: 'Trigonometry class was great, I learned a lot.',
      mood: 'Happy',
    },
  ],
  'Alice Johnson': [
    {
      day: 'Monday',
      feedback: 'The class was very engaging and I learned a lot about algebra.',
      mood: 'Happy',
    },
    {
      day: 'Tuesday',
      feedback: 'The class was okay, but I found the topic on geometry a bit challenging.',
      mood: 'Neutral',
    },
    {
      day: 'Wednesday',
      feedback: 'Today\'s class on calculus was very difficult to follow.',
      mood: 'Sad',
    },
    {
      day: 'Thursday',
      feedback: 'The class on statistics was interesting, and I enjoyed the group activities.',
      mood: 'Happy',
    },
    {
      day: 'Friday',
      feedback: 'The class on trigonometry was very informative and well-taught.',
      mood: 'Happy',
    },
  ],
};

const StudentLogbook: FC<StudentLogbookProps> = ({ student, week }) => {
  const currentLogbook = student.logbooks[week];
  const displayedFeedbacks = feedbacks[student.name].slice(0, currentLogbook.daysLogged);

  return (
    <div className="student-logbook">
      <div className="logbook-header">
        <h6>{student.name}</h6>
        <h6>Week {week + 1} Logbook</h6>
        <DownloadButton studentName={student.name} week={week} feedbacks={displayedFeedbacks} />
      </div>
      <FeedbackBox feedbacks={displayedFeedbacks} />
    </div>
  );
};

export default StudentLogbook;
