"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

interface HeaderTitlesProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function HeaderTitles({ setShowModal }: HeaderTitlesProps) {
  const searchParams = useSearchParams();
  const name = searchParams.get("title");

  const pathname = usePathname();
  const router = useRouter();
  
  const baseUrl = `/protected/admin/courses/${77}`;
  
  return (
    <>
      {/* button with create notification */}
      {/* <div className="d-flex justify-content-center mb-3">
        <button onClick={() => setShowModal(prev => !prev)} className="btn btn-success" style={{ width: '190px' }}>Create Notification</button>
      </div> */}
      <div>
        <div className="card-body">
          <div className="page-separator">
            <div className="page-separator__text">Recent Notifications</div>
          </div>
          {/* <p className="card-text">This is a placeholder for header titles content.</p> */}
        </div>
      </div>
    </>
  );
}

export default HeaderTitles;