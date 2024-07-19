import React from 'react';
import SkeletonLoader from './SkeletonLoader';

type Props = {
  questionName: string;
  questionDescription: string;
  questionScore: number;
  answers: { label: string; isCorrect: boolean }[];
  studentMultipleChoiceAnswer: { label: string }[];
};

const MultipleChoiceSkeleton: React.FC = () => {
  const dummyAnswers = new Array(4).fill(null); // Adjust the number of dummy answers as needed

  return (
    <div className="card table-responsive my-24pt">
      <table className="table table-flush table--elevated">
        <thead>
          <tr>
            <th>
              <SkeletonLoader width="50%" height="1.5em" />
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>ANSWERS: </strong>
            </td>
            <td></td>
          </tr>
          <tr className="d-flex flex-column">
            {dummyAnswers.map((_, index) => (
              <td key={index} className="py-2 d-flex">
                <SkeletonLoader width="10%" height="1.5em" />
                <SkeletonLoader width="80%" height="1.5em" style={{ marginLeft: '0.5em' }} />
              </td>
            ))}
            <td className="py-2 d-flex flex-column justify-content-between align-items-center">
              <p>
                <SkeletonLoader width="100%" height="2em" />
              </p>
              <p>
                <SkeletonLoader width="100%" height="2em" />
              </p>
              <p>
                <SkeletonLoader width="100%" height="2em" />
              </p>
            </td>
            <td style={{ width: '170px' }} className="py-1 d-flex flex-row align-items-center align-self-end">
              <SkeletonLoader width="100%" height="2em" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MultipleChoiceSkeleton;
