import React from 'react';

interface PageHeaderProps {
  title: string;
  contentTitle: string;
  buttonTitle: string;
}

export default function PageHeader({ title, contentTitle, buttonTitle }: PageHeaderProps) {
  return (
    <>
      <div className="border-bottom-2 py-32pt position-relative z-1">
        <div className="container page__container d-flex flex-column flex-md-row align-items-center text-center text-sm-left">
          <div className="flex d-flex flex-column flex-sm-row position-relative align-items-center mb-24pt mb-md-0">
            <div className="mb-24pt mb-sm-0 mr-sm-24pt">
              <h2 className="mb-0">{title}</h2>

              <ol className="breadcrumb p-0 m-0">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>

                <li className="breadcrumb-item active">{title}</li>
                <li className="breadcrumb-item active">{contentTitle}</li>
              </ol>
            </div>
            {/* button with create notification */}
            {/* <button className="position-absolute right-0 btn btn-success">{buttonTitle}</button> */}
          </div>
        </div>
      </div>
    </>
  );
}