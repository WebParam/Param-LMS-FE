import { FC } from 'react';

interface Logbook {
  daysLogged: number;
  totalDays: number;
}

interface Student {
  name: string;
  logbooks: Logbook[];
}

interface StudentListProps {
  students: Student[];
  setSelectedStudent: (student: Student) => void;
}

const StudentList: FC<StudentListProps> = ({ students, setSelectedStudent }) => {
  return (
    <div className="list-group">
      {students.map((student, index) => (
        <button
          key={index}
          className="list-group-item list-group-item-action"
          onClick={() => setSelectedStudent(student)}
        >
          {student.name}
        </button>
      ))}
    </div>
  );
}

export default StudentList;
