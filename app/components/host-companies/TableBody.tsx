"use client";
import { NextPage } from "next";
import Link from "next/link";
import { useEffect } from "react";
const TableBody: NextPage<{ list: any }> = ({ list }) => {

  return (
    <>
      <tbody className="list" id="staff">
        {list &&
          list.map((data: any) => {
            return (
              <tr key={data.id} className="selected">
                
               
                <td className="text-center js-lists-values-projects small">
                  {data.companyName ?? "N/A"}
                </td>
                <td className="text-center js-lists-values-projects small">
                  {data.companyLocation ?? "N/A"}
                </td>
                
                <td className="text-center js-lists-values-projects small">
                  {data.industry ?? "N/A"}
                </td>
                <td className="text-center js-lists-values-projects small">
                  {data.numberOfEmployees}
                </td>
                <td  style={{cursor:"pointer !important"}} className="text-center js-lists-values-projects small">
                  <div className="d-flex align-items-center justify-content-center ">
                    <Link
              
                    href={`/protected/admin/host-companies/companies/${data?.companyId}?company-name=${data.companyName}`}
                    >
                      <i  className="material-icons icon-holder--outline-success rounded-lg mr-8pt">
                        visibility
                      </i>
                    </Link>
                  </div>
                </td>
              </tr>
            );
          })}
      </tbody>
    </>
  );
};

export default TableBody;
