"use client";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import { getUserProfile } from "@/app/lib/actions/profile";
import ProfileModal from "../profile/ProfileModal";
import { Details } from "@/app/interfaces/profile";

export default function PageHeader() {
  const cookies = new Cookies();
  const loggedInUser = cookies.get("param-lms-user");
  const [remoteProfile, setRemoteProfile] = useState({});
  const [showModal, setShowModal] = useState(false);
  const existingDetails: Details = {
    id: loggedInUser.id,
    firstName: loggedInUser.firstName,
    lastName: loggedInUser.lastName,
    email: loggedInUser.email,
  };

  const fetchProfile = async () => {
    try {
      const response = await getUserProfile(existingDetails.id);
      if (response.error) {
        throw new Error(response.message || "Failed to fetch user profile");
      }
      if (response.data === null || !response.data.signature) {
        setShowModal(true);
      } else {
        setRemoteProfile(response.data);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      setShowModal(true);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [loggedInUser.id]);

  return (
    <>
      <div className="border-bottom-2 py-32pt position-relative z-1">
        <div className="container page__container d-flex flex-column flex-md-row align-items-center text-center text-sm-left">
          <div className="flex d-flex justify-content-between flex-column flex-sm-row align-items-center mb-24pt mb-md-0">
            <div className="mb-24pt mb-sm-0 mr-sm-24pt">
              <h2 className="mb-0">{loggedInUser.role} Dashboard</h2>

              <ol className="breadcrumb p-0 m-0">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>

                <li className="breadcrumb-item active">
                  {loggedInUser.role} Dashboard
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <ProfileModal
        show={showModal}
        existingDetails={existingDetails}
        onHide={() => setShowModal(false)}
      />
    </>
  );
}
