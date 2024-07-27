const list: applicantprofile[] = [
  {
    "id": 1,
    "Full_name": "Khanyi Ngubani",
    "ID_Number": "1234567890",
    "Email_Address": "john.doe@gmail.com",
    "Gender": "Male",
    "Country": "South Africa",
    "City": "Johannesburg",
    "Province": "Gauteng",
    "Date_Of_Birth": "1998-18-20",
    "Mobile_Number": "0829682965",
    "Bio": "1234567890",
    },
]


 export type applicantprofile = {
  id: number;
  Full_name: string;
  ID_Number: string;
  Email_Address: string;
  Gender: string;
  Country: string;
  City: string;
  Province: string;
  Date_Of_Birth: string;
  Mobile_Number: string;
  Bio: string;
}

  
export default list;