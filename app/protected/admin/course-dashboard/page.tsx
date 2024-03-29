import PageHeader from "./PageHeader";
import Body from "./Body";

const page = () => {
  return (
    <>
      <div className="mdk-header-layout__content page-content ">
        <PageHeader />
        <Body />
      </div>
    </>
  );
};

export default page;
