
export const provinces = [
    "Gauteng",
    "Western Cape",
    "Eastern Cape",
    "Northern Cape",
    "Limpopo",
    "Mpumalanga",
    "KZN",
    "Free State",
    "North West",
  ];
  
  export const genders = ["Male", "Female"];
  
  export const races = [
    "black",
    "Black African",
    "indian",
    "white",
    "asian",
    "other",
    "notSpecified",
  ];
  
  export const employmentStatuses = [
    "Employed",
    "Unemployed",
    "Home Maker",
    "Scholar",
    "Unemployed(Disabled)",
    "Employed(Disabled)",
    "Other",
    "Unspecified",
  ];
  
  export const disabilities = [
    "deaf",
    "blind",
    "dumb",
    "physicallyDisabled",
    "intellectuallyDisabled",
    "multipleDisabilities",
  ];
  
  export const provinceData = (fetchedData: any) => [
    fetchedData?.numberOfStudentsByProvince.gauteng!,
    fetchedData?.numberOfStudentsByProvince.westernCape!,
    fetchedData?.numberOfStudentsByProvince.easternCape!,
    fetchedData?.numberOfStudentsByProvince.northernCape!,
    fetchedData?.numberOfStudentsByProvince.limpopo!,
    fetchedData?.numberOfStudentsByProvince.mpumalanga!,
    fetchedData?.numberOfStudentsByProvince.kwaZuluNatal!,
    fetchedData?.numberOfStudentsByProvince.freeState!,
    fetchedData?.numberOfStudentsByProvince.northWest!,
  ];
  
  export const racesData = (fetchedData: any) => [
    fetchedData?.numberOfStudentsByEquityGroup.black!,
    fetchedData?.numberOfStudentsByEquityGroup.coloured!,
    fetchedData?.numberOfStudentsByEquityGroup.indian!,
    fetchedData?.numberOfStudentsByEquityGroup.white!,
    fetchedData?.numberOfStudentsByEquityGroup.asian!,
    fetchedData?.numberOfStudentsByEquityGroup.other!,
    fetchedData?.numberOfStudentsByEquityGroup.notSpecified!,
  ];
  
  export const genderData = (fetchedData: any) => [
    fetchedData?.numberOfStudentsByGender.male!,
    fetchedData?.numberOfStudentsByGender.female!,
  ];
  
  export const socioEconomicData = (fetchedData: any) => [
    fetchedData?.numberOfStudentsByProvince.gauteng!,
    fetchedData?.numberOfStudentsByProvince.westernCape!,
    fetchedData?.numberOfStudentsByProvince.easternCape!,
    fetchedData?.numberOfStudentsByProvince.northernCape!,
    fetchedData?.numberOfStudentsByProvince.limpopo!,
    fetchedData?.numberOfStudentsByProvince.mpumalanga!,
    fetchedData?.numberOfStudentsByProvince.kwaZuluNatal!,
    fetchedData?.numberOfStudentsByProvince.freeState!,
    fetchedData?.numberOfStudentsByProvince.northWest!,
  ];
  
  export const disabilitiesData = (fetchedData: any) => [
    fetchedData?.numberOfStudentsByDisability.deaf!,
    fetchedData?.numberOfStudentsByDisability.blind!,
    fetchedData?.numberOfStudentsByDisability.dumb!,
    fetchedData?.numberOfStudentsByDisability.physicallyDisabled!,
    fetchedData?.numberOfStudentsByDisability.intellectuallyDisabled!,
    fetchedData?.numberOfStudentsByDisability.multipleDisabilities!,
  ];
  
  export const citizenshipData = (fetchedData: any) => [
    fetchedData?.numberOfStudentsByNationality.southAfrican!,
    fetchedData?.numberOfStudentsByNationality.southAfrican!,
    fetchedData?.numberOfStudentsByNationality.others!,
    fetchedData?.numberOfStudentsByNationality.pernamentResident!,
    fetchedData?.numberOfStudentsByNationality.unknown!,
  ];
  
  export const languagesData = (fetchedData: any) => [
    fetchedData?.numberOfStudentsByLanguage.english!,
    fetchedData?.numberOfStudentsByLanguage.afrikaans!,
    fetchedData?.numberOfStudentsByLanguage.zulu!,
    fetchedData?.numberOfStudentsByLanguage.xhosa!,
    fetchedData?.numberOfStudentsByLanguage.tswana!,
    fetchedData?.numberOfStudentsByLanguage.sotho!,
    fetchedData?.numberOfStudentsByLanguage.venda!,
    fetchedData?.numberOfStudentsByLanguage.tsonga!,
    fetchedData?.numberOfStudentsByLanguage.swati!,
    fetchedData?.numberOfStudentsByLanguage.ndebele!,
    fetchedData?.numberOfStudentsByLanguage.signLanguage!,
    fetchedData?.numberOfStudentsByLanguage.pedi!,
  ];
  
  export const tilesData = (fetchedData: any) => [
    {
      name: "Students",
      icon: "person_outline",
      data: fetchedData?.numberOfStudents! || 0,
    },
    {
      name: "Employed",
      icon: "list",
      data: fetchedData?.numbetOfStudentsEmployed! || 0,
    },
    {
      name: "Unemployed",
      icon: "help",
      data: fetchedData?.numberOfStudentsUnemployed! || 0,
    },
    {
      name: "Disability",
      icon: "help",
      data: fetchedData?.numberOfStudentsWithDisabilities! || 0,
    },
  ];
  