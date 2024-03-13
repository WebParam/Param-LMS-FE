import {NextPage} from 'next';

const TableRow: NextPage<{ assessment: { courseTitle: string } }> = ({ assessment }) => {

    return (

  <tr className="selected">

      <td>{assessment.courseTitle} </td>
      <td className="text-center js-lists-values-projects small">-</td>
      <td className="text-center js-lists-values-projects small">-</td>
      <td className="text-center js-lists-values-projects small">-</td>
      <td className="text-center js-lists-values-projects small">-</td>
  </tr>  )
}

export default TableRow