"use client"
import PageBanner from "@/app/components/Main/PageBanner";
import Table from "./Table";

const page = () => {


  return (
      <>
        <PageBanner name="Assessments" />
          <div className="container-fluid page__container">

                <div className="page-section">

                    <div className="page-separator">
                        <div className="page-separator__text">Recently added</div>
                    </div>
                    
                    <div className="card mb-lg-8pt">
                        <div className="table-responsive"
                                data-toggle="lists"
                                data-lists-sort-by="js-lists-values-employee-name"
                                data-lists-values='["js-lists-values-employee-name", "js-lists-values-employer-name", "js-lists-values-projects", "js-lists-values-activity", "js-lists-values-earnings"]'>

                            <Table />
                        </div>
                    </div>                                      
            </div>
        </div>
      </>
  )
}

export default page