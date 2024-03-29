import Pagination from "./Pagination";
import Table from "./Table";

const Body = () => {
  
  return (
    <>
      <div className="container page__container page__container page-section">
        <div className="card mb-0">
          <div
            className="table-responsive"
            data-toggle="lists"
            data-lists-sort-by="js-lists-values-employee-name"
            data-lists-values='["js-lists-values-employee-name", "js-lists-values-employer-name", "js-lists-values-projects", "js-lists-values-activity", "js-lists-values-earnings"]'
          >
            <Table />
          </div>

          <Pagination />
        </div>
      </div>
    </>
  );
};

export default Body;
