import { FC } from 'react';

interface WeekSelectorProps {
  selectedWeek: number;
  setSelectedWeek: (week: number) => void;
}

const WeekSelector: FC<WeekSelectorProps> = ({ selectedWeek, setSelectedWeek }) => {
  return (
    <div className="btn-group">
      {[...Array(4)].map((_, index) => (
        <button
          key={index}
          className={`btn btn-primary ${selectedWeek === index ? 'active' : ''}`}
          onClick={() => setSelectedWeek(index)}
        >
          Week {index + 1}
        </button>
      ))}
    </div>
  );
}

export default WeekSelector;
