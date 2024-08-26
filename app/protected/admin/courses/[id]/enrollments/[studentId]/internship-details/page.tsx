"use client";
import Table from "@/components/course/[id]/enrollments/regional/Table";
import { useEffect, useState } from "react";
import list from "@/components/course/[id]/enrollments/regional/data";
import { useParams } from "next/navigation";
import {
  getStudentData,
  updateInternshipDetails,
} from "@/app/lib/actions/courseStudents";
import { useFormState } from "react-dom";
import { SubmitBtn } from "@/components/course/[id]/enrollments/internship-details/Buttons";

const Body = ({ params }: { params: { studentId: string } }) => {
  const studentId = params.studentId;
  const [studentData, setStudentData] = useState<any>({});
  const initialState = { message: "", errors: {} };
  const updateInternshipDetailsWithStudentId = updateInternshipDetails.bind(
    null,
    studentId
  );
  const [state, dispatch] = useFormState(
    updateInternshipDetailsWithStudentId,
    initialState
  );

  useEffect(() => {
    const fetchStudentData = async () => {
      const data = await getStudentData(studentId);
      data.deploymentDate = formatDate(data.deploymentDate);
      setStudentData(data);
    };

    fetchStudentData();
  }, []);

  const formatDate = (str: string) => {
    const date = new Date(str);

    // Get the year, month, and day
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <>
      <form action={dispatch} className="p-4">
        <div className="mb-1 page-separator">
          <div className="page-separator__text">Internship Details</div>
        </div>
        <div className="mb-4 row">
          <div className="col-6">
            <label htmlFor="">Deployment Date</label>
            <input
              id="deploymentDate"
              maxLength={10}
              className="form-control mb-2"
              name="deploymentDate"
              type="date"
              defaultValue={studentData.deploymentDate}
            />
            <div
              id="deploymentDate-error"
              aria-live="polite"
              aria-atomic="true"
            >
              {state &&
                state.errors?.deploymentDate &&
                state.errors.deploymentDate.map((error: string) => (
                  <p className="mt-2 text-sm text-danger" key={error}>
                    {error}
                  </p>
                ))}
            </div>{" "}
          </div>
        </div>

        <div className="mb-1 page-separator">
          <div className="page-separator__text">Host Employer</div>
        </div>
        <div className="mb-4 row">
          <div className="col-6">
            <label htmlFor="">Company Name</label>
            <input
              className="form-control mb-2"
              placeholder="Enter your Host Company Name"
              name="hostEmployer"
              id="hostEmployer"
              defaultValue={studentData.hostEmployer}
            />{" "}
            <div id="hostEmployer-error" aria-live="polite" aria-atomic="true">
              {state &&
                state.errors?.hostEmployer &&
                state.errors.hostEmployer.map((error: string) => (
                  <p className="mt-2 text-sm text-danger" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
          <div className="col-6">
            <label htmlFor="">Physical Address</label>
            <input
              id="hostPhysicalAddress"
              className="form-control mb-2"
              placeholder="Enter Host Company Address"
              name="hostPhysicalAddress"
              defaultValue={studentData.hostPhysicalAddress}
            />
            <div
              id="hostPhysicalAddress-error"
              aria-live="polite"
              aria-atomic="true"
            >
              {state &&
                state.errors?.hostPhysicalAddress &&
                state.errors.hostPhysicalAddress.map((error: string) => (
                  <p className="mt-2 text-sm text-danger" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>{" "}
        </div>

        <div className="mb-1 page-separator">
          <div className="page-separator__text">Host Supervisor</div>
        </div>
        <div className="mb-2 row">
          <div className="col-6">
            <label htmlFor="">Name</label>
            <input
              id="supervisorName"
              className="form-control mb-2"
              placeholder="Enter Host Supervisor's Name"
              name="supervisorName"
              defaultValue={studentData.supervisorName}
            />
            <div
              id="supervisorName-error"
              aria-live="polite"
              aria-atomic="true"
            >
              {state &&
                state.errors?.supervisorName &&
                state.errors.supervisorName.map((error: string) => (
                  <p className="mt-2 text-sm text-danger" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
          <div className="col-6">
            <label htmlFor="">Surname</label>
            <input
              id="supervisorSurname"
              className="form-control mb-2"
              placeholder="Enter Host Supervisor's Surname"
              name="supervisorSurname"
              defaultValue={studentData.supervisorSurname}
            />
            <div
              id="supervisorSurname-error"
              aria-live="polite"
              aria-atomic="true"
            >
              {state &&
                state.errors?.supervisorSurname &&
                state.errors.supervisorSurname.map((error: string) => (
                  <p className="mt-2 text-sm text-danger" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
          <div className="col-6">
            <label htmlFor="">Cell Phone</label>
            <input
              id="supervisorCellphone"
              className="form-control mb-2"
              placeholder="Enter Host Supervisor's Cellphone"
              name="supervisorCellphone"
              defaultValue={studentData.supervisorCellphone}
            />
            <div
              id="supervisorCellphone-error"
              aria-live="polite"
              aria-atomic="true"
            >
              {state &&
                state.errors?.supervisorCellphone &&
                state.errors.supervisorCellphone.map((error: string) => (
                  <p className="mt-2 text-sm text-danger" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
          <div className="col-6">
            <label htmlFor="">Email Address</label>
            <input
              id="supervisorEmail"
              className="form-control mb-2"
              placeholder="Enter Host Supervisor's Email Address"
              name="supervisorEmail"
              defaultValue={studentData.supervisorEmail}
            />
            <div
              id="supervisorEmail-error"
              aria-live="polite"
              aria-atomic="true"
            >
              {state &&
                state.errors?.supervisorEmail &&
                state.errors.supervisorEmail.map((error: string) => (
                  <p className="mt-2 text-sm text-danger" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        <div className="">
          <SubmitBtn />
        </div>
      </form>
    </>
  );
};

export default Body;
