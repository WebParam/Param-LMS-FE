import { NoMeals } from "@mui/icons-material";
import {useSearchParams} from "next/navigation"
import { useEffect, useState } from "react";
interface PageHeaderProps{
  courseTitle: string;
  companyTitle : string;
}
export default function PageHeader({ companyTitle , courseTitle } : PageHeaderProps) {

const [name, setName] = useState<string>("")
  const search = useSearchParams();

  useEffect(() => {
    const name = search.get('name');
    setName(name!);
  }, [search]); 

   return (
    <>
      <div className="border-bottom-2 py-32pt position-relative z-1">
        <div className="container page__container d-flex flex-column flex-md-row align-items-center text-center text-sm-left">
          <div className="flex d-flex flex-column flex-sm-row align-items-center mb-24pt mb-md-0">
            <div className="mb-24pt mb-sm-0 mr-sm-24pt">
              <h2 className="mb-0">{companyTitle}</h2>

              <ol className="breadcrumb p-0 m-0">
            
                <li className="breadcrumb-item active">{courseTitle}</li>
{
 name && 
 <li className="breadcrumb-item">
   <a>{name}</a>
 </li>

}
              </ol>
            </div>
            
          </div>
          <button className="btn btn-success border-0 shadow-bottom text-black font-weight-bold">
            View Group Progress
          </button>
        </div>
      </div>
    </>
  );
};



