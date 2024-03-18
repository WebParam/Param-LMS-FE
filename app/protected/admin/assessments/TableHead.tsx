const TableHead = () => {
  return (
<thead>
                    <tr>
                        <th>
                            <a 
                                className="sort"
                                data-sort="js-lists-values-employee-name">Title</a>
                        </th>

                        <th className="text-center">
                            <a 
                                className="sort"
                                data-sort="js-lists-values-employer-name">Average Score</a>
                        </th>
                        <th className="text-center">
                            <a 
                                className="sort"
                                data-sort="js-lists-values-employer-name">Completed</a>
                        </th>
                        <th className="text-center">
                            <a 
                                className="sort"
                                data-sort="js-lists-values-employer-name">Pending</a>
                        </th>
                        <th className="text-center">
                            <a 
                                className="sort"
                                data-sort="js-lists-values-employer-name">Graded</a>
                        </th>
                    </tr>
      </thead>
  )
}

export default TableHead