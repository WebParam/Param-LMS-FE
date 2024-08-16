"use client";
import './layout.scss'
import { post } from '@/app/lib/utils';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Modal } from 'react-bootstrap';

import Cookies from 'universal-cookie';

function Layout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  const cookies = new Cookies();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const router = useRouter();

  const tabs = [
    { name: "profiles", title: "Profile", url: `/protected/admin/course-applicants/${id}/profiles` },
    { name: "demographics", title: "Demographics", url: `/protected/admin/course-applicants/${id}/demographics` },
    { name: "contacts", title: "Contacts", url: `/protected/admin/course-applicants/${id}/contacts` },
    { name: "regional", title: "Regional", url: `/protected/admin/course-applicants/${id}/regional` },
    { name: "employment", title: "Employment", url: `/protected/admin/course-applicants/${id}/employment` },
    { name: "documents", title: "Documents", url: `/protected/admin/course-applicants/${id}/documents` },
  ];

  async function enrollStudent() {
    setLoading(true);
    const payload = {
      userId: id,
      course: '6669f0ff8759b480859c10a7',
    };

    const res = await post(`https://khumla-dev-newcourse-write.azurewebsites.net/api/v1/Enrollments/AddEnrollment`, payload)

    if (res) {
      router.push('/protected/admin/course-applicants')
      setLoading(false)
    }
    setLoading(false);

  }

  let allDocsAccepted = cookies.get("documentsCompled")??"";

  console.log("are docs complete?", allDocsAccepted)
  
  return (
    <>
      <Modal show={loading} keyboard={false} centered>
        <Modal.Body>
            <div className='text-dark d-flex flex-column justify-content-center align-items-center gap-2'>
            <div className="spinner-border text-dark spinner-border-md" role="status" />
            <p>Enrolling student...</p>
            </div>
        </Modal.Body>
      </Modal>
      <div className="card p-relative o-hidden mb-0">
        <div
          className="card-header card-header-tabs-basic nav px-0"
          role="tablist"
        >
          {tabs.map((tab) => (
            <a 
              key={tab.name}
              onClick={()=> router.replace(`${tab.url}?id=${id}&name=${name}`)}
              className={pathname.includes(tab.name) ? "active" : ""}
              data-toggle="tab"
              role="tab"
              aria-selected="true"
              style={{cursor:'pointer'}}
            >
              <span className="flex d-flex flex-column">
                <strong className="card-title">{tab.title}</strong>
              </span>
            </a>
          ))}          
        </div>
      </div>

      <div className="card mt-3">
        {children}
      </div>
      <div className="card-footer p-8pt">
        <button 
        className="btn btn-primary enrolBtn notComplete" 
        onClick={enrollStudent}
        >
            {loading ? <div className="spinner-border text-light spinner-border-sm" role="status" />:'Enroll Student'}
        </button>
      </div>
    </>
  );
};

export default Layout;



// const downloadZip = () => {
//   setLoading(true);
//   const filename = "student_information";
//   const fileExtension = "zip";
//   const url = `${rUserUrl}/Documents/DownloadDocuments/${studentId}`;
//   downloadFile(url, filename, fileExtension, setLoading);
// };