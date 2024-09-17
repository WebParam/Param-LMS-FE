"use client";
import { useFlags } from "flagsmith/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from 'react';

export default function PageHeader() {
  const [title, setTitle] = useState("Courses");
  const flags = useFlags(["freemium"]);
  const searchParams = useSearchParams();
  const refreshId = searchParams.get("refreshId")!;
  //const isFreemium = flags.freemium.enabled && flags.freemium.value == true;
  const [isFreemium, setIsFreemium] = useState();

  useEffect(() => {
    if (isFreemium) {
      setTitle("Projects");
    } else {
      setTitle("Courses");
    }
  }, [isFreemium]);

  useEffect(() => {
    const localValue = localStorage.getItem("isFreemium")!;
    const value = JSON.parse(localValue) ?? false;
    setIsFreemium(value);
  }, [refreshId]);


  return (
    <>
      <div className="border-bottom-2 py-32pt position-relative z-1">
        <div className="container page__container d-flex flex-column flex-md-row align-items-center text-center text-sm-left">
          <div className="flex d-flex justify-content-between flex-column flex-sm-row align-items-center mb-24pt mb-md-0">
            <div
              style={{ width: "850px" }}
              className="mb-24pt mb-sm-0 mr-sm-24pt"
            >
              <h2 className="mb-0">Enrolled Students</h2>

              <ol className="breadcrumb p-0 m-0">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>

                <li className="breadcrumb-item active">Enrolled Students</li>
              </ol>
            </div>
            <div>
              <Link
                className="btn btn-success"
                href={`/protected/home/${title.toLowerCase()}`}
              >
                All {title}
              </Link>
            </div>
          </div>
        </div>
      </div>{" "}
    </>
  );
}