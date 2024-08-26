const list: applicantDemographics[] = [
  {
    "Equity_Code": "1",
    "Nationality_Code": "1",
    "Home_Language_Code": "1",
    "Citizen_Status_Code": "1",
    "Socioeconomic_Code": "1",
    "Disability_Code": "1",
    "Disability_Rating": "1",
    "Immigrant_Status": "1",
    "POPI_Act_Agreement": "1",
    "POPI_Act_Date": "1",
  },
]


 export type applicantDemographics = {
  Equity_Code: string;
  Nationality_Code: string;
  Home_Language_Code: string;
  Citizen_Status_Code: string;
  Socioeconomic_Code: string;
  Disability_Code: string;
  Disability_Rating: string;
  Immigrant_Status: string;
  POPI_Act_Agreement: string;
  POPI_Act_Date: string;
}

  
export default list;