"use client"; // Add this line

import { useState } from 'react';
import StudentList from './StudentList';
import WeekSelector from './WeekSelector';
import StudentLogbook from './displayedLog';
import MonthSelector from './month';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import "../../css/logbook.css"; 


interface Logbook {
  daysLogged: number;
  totalDays: number;
}

interface Student {
  name: string;
  logbooks: Logbook[];
}

const students: Student[] = [
  { name: 'Jane Smith', logbooks: [{ daysLogged: 4, totalDays: 5 }, { daysLogged: 5, totalDays: 5 }, { daysLogged: 0, totalDays: 5 }, { daysLogged: 5, totalDays: 5 }] },
  { name: 'John Doe', logbooks: [{ daysLogged: 5, totalDays: 5 }, { daysLogged: 5, totalDays: 5 }, { daysLogged: 5, totalDays: 5 }, { daysLogged: 5, totalDays: 5 }] },
  { name: 'Sihle Nkosi', logbooks: [{ daysLogged: 5, totalDays: 5 }, { daysLogged: 5, totalDays: 5 }, { daysLogged: 5, totalDays: 5 }, { daysLogged: 5, totalDays: 5 }] },
  { name: 'Johannes Pile', logbooks: [{ daysLogged: 5, totalDays: 5 }, { daysLogged: 5, totalDays: 5 }, { daysLogged: 5, totalDays: 5 }, { daysLogged: 5, totalDays: 5 }] },
  { name: 'Buhle Avenaant', logbooks: [{ daysLogged: 5, totalDays: 5 }, { daysLogged: 5, totalDays: 5 }, { daysLogged: 5, totalDays: 5 }, { daysLogged: 5, totalDays: 5 }] },
  { name: 'Lesego Nkosi', logbooks: [{ daysLogged: 5, totalDays: 5 }, { daysLogged: 5, totalDays: 5 }, { daysLogged: 5, totalDays: 5 }, { daysLogged: 5, totalDays: 5 }] },
  { name: 'Akani Maluleka', logbooks: [{ daysLogged: 5, totalDays: 5 }, { daysLogged: 5, totalDays: 5 }, { daysLogged: 5, totalDays: 5 }, { daysLogged: 5, totalDays: 5 }] },
  { name: 'Bontle Smith', logbooks: [{ daysLogged: 5, totalDays: 5 }, { daysLogged: 5, totalDays: 5 }, { daysLogged: 5, totalDays: 5 }, { daysLogged: 5, totalDays: 5 }] },
  { name: 'Mohapi Nku', logbooks: [{ daysLogged: 5, totalDays: 5 }, { daysLogged: 5, totalDays: 5 }, { daysLogged: 5, totalDays: 5 }, { daysLogged: 5, totalDays: 5 }] },
  { name: 'Sithole Nkomo', logbooks: [{ daysLogged: 5, totalDays: 5 }, { daysLogged: 5, totalDays: 5 }, { daysLogged: 5, totalDays: 5 }, { daysLogged: 5, totalDays: 5 }] },
  
];

export default function Logbook() {
  const [selectedStudent, setSelectedStudent] = useState<Student>(students[0]);
  const [selectedWeek, setSelectedWeek] = useState<number>(0);
  const [selectedMonth, setSelectedMonth] = useState<string>('July');

  return (
    <div className="logbook-container container mt-4 p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <MonthSelector selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
      </div>
      <div className="d-flex justify-content-around mb-3">
        <button className="btn btn-custom-green" onClick={() => setSelectedWeek(0)}>Week 1</button>
        <button className="btn btn-custom-green" onClick={() => setSelectedWeek(1)}>Week 2</button>
        <button className="btn btn-custom-green" onClick={() => setSelectedWeek(2)}>Week 3</button>
        <button className="btn btn-custom-green" onClick={() => setSelectedWeek(3)}>Week 4</button>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <table className="table">
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Attendance Logged</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr key={index} onClick={() => setSelectedStudent(student)}>
                      <td>{student.name}</td>
                      <td>{student.logbooks[selectedWeek].daysLogged}/{student.logbooks[selectedWeek].totalDays}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <StudentLogbook student={selectedStudent} week={selectedWeek} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}