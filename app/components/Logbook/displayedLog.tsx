import { FC } from 'react';
import FeedbackBox from './FeedbackBox';

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

const feedbacks = {
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
const feedbacks = [
  {
    day: 'Monday',
    feedback: 'The class was very engaging and I learned a lot about algebra.',
    mood: 'Happy',
    moodImage: 'path/to/happy.png',
  },
  {
    day: 'Tuesday',
    feedback: 'The class was okay, but I found the topic on geometry a bit challenging.',
    mood: 'Neutral',
    moodImage: 'path/to/neutral.png',
  },
  {
    day: 'Wednesday',
    feedback: 'Today\'s class on calculus was very difficult to follow.',
    mood: 'Sad',
    moodImage: 'path/to/sad.png',
  },
  {
    day: 'Thursday',
    feedback: 'The class on statistics was interesting, and I enjoyed the group activities.',
    mood: 'Happy',
    moodImage: 'path/to/happy.png',
  },
];

const StudentLogbook: FC<StudentLogbookProps> = ({ student, week }) => {
  return (
    <div>
      <h6>{student.name}</h6>
      <h6>Week {week + 1} Logbook</h6>
      <FeedbackBox feedbacks={feedbacks} />
    </div>
  );
}

export default StudentLogbook;