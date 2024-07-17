import { FC } from 'react';
import "../../css/logbook.css"; 

interface MonthSelectorProps {
  selectedMonth: string;
  setSelectedMonth: (month: string) => void;
}

const MonthSelector: FC<MonthSelectorProps> = ({ selectedMonth, setSelectedMonth }) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const currentMonthIndex = months.indexOf(selectedMonth);

  return (
    <div className="logbook-header">
      <button
        className="nav-button"
        onClick={() => setSelectedMonth(months[Math.max(currentMonthIndex - 1, 0)])}
      >
        &lt;
      </button>
      <div className="month-name">
        {selectedMonth} Logbook
      </div>
      <button
        className="nav-button"
        onClick={() => setSelectedMonth(months[Math.min(currentMonthIndex + 1, months.length - 1)])}
      >
        &gt;
      </button>
    </div>
  );
}

export default MonthSelector;