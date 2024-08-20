'use client';
import ChartWrapper from "./ChartWrapper";

import {
  options as SocioEcoStatusOptions,
  data as SocioEcoStatusDataFn,
  barDescriptions as SocioEcoStatusDescription,
} from "./Data";

export default function Graphs() {
  const StudentSocioEcoStatusBarData = SocioEcoStatusDataFn;

  return (
    <>
      <div className="row card-group-row">
        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartWrapper
            title="Socio Economic Status"
            barDescriptions={SocioEcoStatusDescription}
            options={SocioEcoStatusOptions}
            data={StudentSocioEcoStatusBarData}
            type="bar"
          />
        </div>
      </div>
    </>
  );
}
