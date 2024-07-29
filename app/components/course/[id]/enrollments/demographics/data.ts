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

export const codes = [
  {
    type: "Alternative Id Type Allowed",
    codes: [
      { code: "527", description: "Passport Number or Foreign ID Number" },
      { code: "533", description: "None" },
      { code: "565", description: "Refugee Number" },
      { code: "538", description: "Work Permit Number" },
      { code: "540", description: "Birth Certificate number" },
      { code: "570", description: "Change from Alternate" }
    ]
  },
  {
    type: "Equity Code",
    codes: [
      { code: "BA", description: "Black African" },
      { code: "BC", description: "Coloured" },
      { code: "BI", description: "Indian/Asian" },
      { code: "Oth", description: "Other" },
      { code: "U", description: "Unknown" },
      { code: "Wh", description: "White" }
    ]
  },
  {
    type: "Nationality Code Allowed",
    codes: [
      { code: "U", description: "Unspecified" },
      { code: "SA", description: "South Africa" },
      { code: "SDC", description: "SADC except SA (i.e. NAM to ZAI)" },
      { code: "NAM", description: "Namibia" },
      { code: "BOT", description: "Botswana" },
      { code: "ZIM", description: "Zimbabwe" },
      { code: "ANG", description: "Angola" },
      { code: "MOZ", description: "Mozambique" },
      { code: "LES", description: "Lesotho" },
      { code: "SWA", description: "Swaziland" },
      { code: "MAL", description: "Malawi" },
      { code: "ZAM", description: "Zambia" },
      { code: "MAU", description: "Mauritius" },
      { code: "TAN", description: "Tanzania" },
      { code: "SEY", description: "Seychelles" },
      { code: "ZAI", description: "Zaire" },
      { code: "ROA", description: "Rest of Africa" },
      { code: "EUR", description: "European countries" },
      { code: "AIS", description: "Asian countries" },
      { code: "NOR", description: "North American countries" },
      { code: "SOU", description: "Central and South American countries" },
      { code: "AUS", description: "Australia Oceania countries" },
      { code: "OOC", description: "Other and rest of Oceania" },
      { code: "NOT", description: "N/A: Institution" }
    ]
  },
  {
    type: "Home Language Code",
    codes: [
      { code: "Eng", description: "English" },
      { code: "Afr", description: "Afrikaans" },
      { code: "Oth", description: "Other" },
      { code: "SASL", description: "South African Sign Language" },
      { code: "Sep", description: "sePedi (Northern Sotho / Sesotho sa Lebowa)" },
      { code: "Ses", description: "seSotho" },
      { code: "Set", description: "seTswana" },
      { code: "Swa", description: "siSwati" },
      { code: "Tsh", description: "tshiVenda" },
      { code: "Xho", description: "isiXhosa" },
      { code: "Xit", description: "xiTsonga" },
      { code: "Zul", description: "isiZulu" },
      { code: "Nde", description: "isiNdebele" }
    ]
  },
  {
    type: "Gender Code",
    codes: [
      { code: "M", description: "Male" },
      { code: "F", description: "Female" }
    ]
  },
  {
    type: "Citizen Resident Status Code",
    codes: [
      { code: "SA", description: "South Africa" },
      { code: "O", description: "Other" },
      { code: "D", description: "Dual (SA plus other)" },
      { code: "PR", description: "Permanent Resident" },
      { code: "U", description: "Unknown" }
    ]
  },
  {
    type: "Socioeconomic Status Code",
    codes: [
      { code: "01", description: "Employed" },
      { code: "02", description: "Unemployed, looking for work" },
      { code: "03", description: "Not working – not looking for work" },
      { code: "04", description: "Home-maker (not working)" },
      { code: "06", description: "Scholar/student (not working)" },
      { code: "07", description: "Pensioner /retired (not working)" },
      { code: "08", description: "Not working –disabled person" },
      { code: "09", description: "Not working – not wishing to work" },
      { code: "10", description: "Not working – Not elsewhere classified" },
      { code: "97", description: "N/A: Aged <15" },
      { code: "98", description: "N/A: Institution" },
      { code: "U", description: "Unspecified" }
    ]
  },
  {
    type: "Disability Status Code",
    codes: [
      { code: "N", description: "None" },
      { code: "01", description: "Sight (even with glasses)" },
      { code: "02", description: "Hearing (even with a hearing aid)" },
      { code: "03", description: "Communication (talking, listening)" },
      { code: "04", description: "Physical (moving, standing, grasping)" },
      { code: "05", description: "Intellectual (difficulties in learning); retardation" },
      { code: "06", description: "Emotional(behavioural or psychological)" },
      { code: "07", description: "Multiple" },
      { code: "09", description: "Disabled but Unspecified" }
    ]
  },
  {
    type: "Disability Rating",
    codes: [
      { code: "01", description: "No difficulty" },
      { code: "02", description: "Some difficulty" },
      { code: "03", description: "A lot of difficulty" },
      { code: "04", description: "Cannot do at all" },
      { code: "06", description: "Cannot yet be determined" },
      { code: "60", description: "May be part of multiple difficulties (TBC)" },
      { code: "70", description: "May have difficulty (TBC)" },
      { code: "80", description: "Former difficulty - none now" }
    ]
  },
  {
    type: "Immigrant Status",
    codes: [
      { code: "01", description: "Immigrant" },
      { code: "02", description: "Refugee" },
      { code: "03", description: "SA Citizen" }
    ]
  },
  {
    type: "Learner Title Allowed Codes",
    codes: [
      { code: "Mr", description: "Mr" },
      { code: "Mrs", description: "Mrs" },
      { code: "Ms", description: "Ms" },
      { code: "Miss", description: "Miss" },
      { code: "Dr", description: "Dr" },
      { code: "Prof", description: "Prof" }
    ]
  },
  {
    type: "Province Code",
    codes: [
      { code: "1", description: "Western Cape" },
      { code: "2", description: "Eastern Cape" },
      { code: "3", description: "Northern Cape" },
      { code: "4", description: "Free State" },
      { code: "5", description: "Kwazulu Natal" },
      { code: "6", description: "North West" },
      { code: "7", description: "Gauteng" },
      { code: "8", description: "Mpumalanga" },
      { code: "9", description: "Limpopo" },
      { code: "N", description: "SA National (i.e. in SA but province unspecified)" },
      { code: "X", description: "Outside SA" }
    ]
  },
  {
    type: "POPI Act Agree",
    codes: [
      { code: "Yes", description: "Yes" },
      { code: "No", description: "No" }
    ]
  },
  {
    type: "Statement of Results Status",
    codes: [
      { code: "01", description: "Statement of Results issued" },
      { code: "02", description: "Statement of Results not yet issued" }
    ]
  },
  {
    type: "Learner Readiness for EISA",
    codes: [
      { code: "1", description: "Enrolled" },
      { code: "2", description: "RPL for Access to EISA determined by SDP" },
      { code: "3", description: "Mixed Mode to EISA" },
      { code: "4", description: "SDP Training and assessment for readiness to EISA" },
      { code: "5", description: "SDP e-learning training and assessment for readiness to EISA" },
      { code: "6", description: "RPL for Access to EISA determined by Assessment Partner/Quality Partner" }
    ]
  },
  {
    type: "FLC",
    codes: [
      { code: "01", description: "FLC certificate (competent)" },
      { code: "02", description: "RPL" },
      { code: "03", description: "Grade 12/NCV –Level 4 Mathematics(ML)/English with Mathematics/Mathematical Literacy, English HL/FAL or First or Second Language pass" },
      { code: "04", description: "Not yet competent" },
      { code: "05", description: "FLC not completed yet" },
      { code: "06", description: "Not applicable (qualification on NQF 5 and above)" },
      { code: "07", description: "Enrolled for FLC" },
      { code: "08", description: "N3 Mathematics and Business Language" }
    ]
  },
  {
    type: "FLC Number",
    codes: [
      { code: "1", description: "NSC/SC or NCV Certificate number or N3 Certificate Number" },
      { code: "2", description: "FLC Statement of Results Number" },
      { code: "3", description: "RPL – provide code RPLYYYYMMDD (Where RPL is done to indicate recognition for the FLC requirements, then the number supplied should be RPL followed by the date of RPL assessment)" }
    ]
  },
  {
    type: "Date Stamp",
    codes: [
      { code: "YYYYMMDD", description: "Date stamp refers to the last date this record was last updated" }
    ]
  }
];

  
export default list;