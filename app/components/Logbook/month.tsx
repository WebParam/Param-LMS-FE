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

  const handlePreviousMonth = () => {
    const currentIndex = months.indexOf(selectedMonth);
    const previousIndex = (currentIndex === 0) ? months.length - 1 : currentIndex - 1;
    setSelectedMonth(months[previousIndex]);
  };

  const handleNextMonth = () => {
    const currentIndex = months.indexOf(selectedMonth);
    const nextIndex = (currentIndex === months.length - 1) ? 0 : currentIndex + 1;
    setSelectedMonth(months[nextIndex]);
  };

  return (
    <div className="logbook-header">
      <button className="nav-button-prev" onClick={handlePreviousMonth}>&lt;</button>
      <div className="month-name">
        {selectedMonth} Logbook
      </div>
      {/* <button className="nav-button-next nav-button-right" onClick={handleNextMonth}   >  &gt;</button> */}
    </div>
  );
}

export default MonthSelector;