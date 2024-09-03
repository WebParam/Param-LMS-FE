import list from "@/components/logbook/data";
import LogbookTable from "@/components/logbook/LogbookTable";

const Page = () => {
    const data = list;
  
    return (
      <div>
        <LogbookTable data={data} />
      </div>
    );
  };
  
  export default Page;
  