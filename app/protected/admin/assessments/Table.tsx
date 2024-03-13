import { useEffect, useState } from "react";
import { getAdminAssessments } from "@/app/lib/restapi/admin";
import Cookies from "universal-cookie"	
import TableHead from "./TableHead";
import TableRow from "./TableRow";

const Table = () => {
    const cookies = new Cookies();	
    const [assessments, setAssessments] = useState<any>([]);
    
    useEffect(() => {
        getAssessments()
        }, []);
    
        const getAssessments = async() => {
            
            const loggedInUser = cookies.get("param-lms-user");
            const assessments = await getAdminAssessments(loggedInUser.id)
            console.log("assessments : ", assessments);
            setAssessments(assessments.map((assessment:any) => assessment.data));
        }
    
        return (
            <table className="table mb-0 thead-border-top-0 table-nowrap">
                <TableHead />
                <tbody className="list" id="staff">
                    {assessments && assessments.map((assessment: any) => <TableRow assessment={assessment} />)}
                </tbody>
            </table>
        )
}

export default Table