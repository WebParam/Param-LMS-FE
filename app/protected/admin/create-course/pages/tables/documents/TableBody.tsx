import { NextPage } from "next";
import Button from "../../(components)/Button";

const TableBody: NextPage<{ list: any[] }> = ({ list }) => {
  return (
    <>
      <tbody className="list" id="staff">
        {list &&
          list.map((data: any, key) => (
            <tr key={key} className="selected">
                 <td style={{width: "300px" }} className="text-center mx-auto text-justify js-lists-values-projects small">
              <div className="d-flex align-items-center ml-5">
  <p>
    <i className="fas fa-file-alt mr-2"></i>{" "}
  </p>
  <p className="text-justify">{data}</p>
</div>
              </td>
              <td style={{width: "300px" }} className="text-center js-lists-values-projects small">
                <Button
                  classes="btn btn-outline-danger rounded-pill px-4 py-2"
                  text="View"
                />
              </td>
              <td style={{width: "300px" }} className="text-center js-lists-values-projects small">
                <Button
                  classes="btn btn-outline-success rounded-pill px-4 py-2 "
                  text="Paraphase"
                />
              </td>
            </tr>
          ))}
      </tbody>
    </>
  );
};

export default TableBody;
