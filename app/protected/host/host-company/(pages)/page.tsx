import list from "@/components/logbook/data";
import LogbookTable from "@/components/logbook/LogbookTable";

const Page = () => {
  const data = list;

  return (
    <div data-aos="flip-up">
      <LogbookTable data={data} />
    </div>
  );
};

export default Page;
