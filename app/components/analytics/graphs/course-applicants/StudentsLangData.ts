// Filters mapping for dynamic selection
export const studentsLanguageDatafiltersMapping = {
    yellow: 'studentsSocioStatus',
    red: 'malesStudentData',
    blue: 'femalesStudentData',
  
  };
  
  export const studentsLanguagesDataFilterOptions = [
    { description: 'All Statuses', color: 'yellow' },
    { description: 'Females', color: 'red' },
    { description: 'Males', color: 'blue' },
  
  
  ];
  
  const commonOptions = {
    chart: {
      height: 350,
      type: 'bar', 
      dropShadow: {
        enabled: true,
        color: '#000',
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2,
      },
      zoom: { enabled: false },
    },
    yaxis: {
      title: {
        text: 'Number of Students by First Language',
      },
    },
    colors: ['#007bff'],
    dataLabels: { enabled: false },
    stroke: {
      show: false,
      width: 2,
      colors: ['#007bff', '#ff0000'],
    },
    title: { align: 'left' },
    grid: {
      borderColor: '#e7e7e7',
      row: { colors: ['#f3f3f3', 'transparent'] },
    },
    markers: { size: 1 },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded',
        borderRadius: 10, 
      },
    },
  };

  // Mock data for demonstration
  const mockStudentLanguagesData = [10, 20, 15, 25, 30, 5, 12, 8, 22, 18, 9];
  const mockMalesStudentData = [5, 10, 7, 12, 15, 2, 6, 4, 11, 9, 4];
  const mockFemalesStudentData = [5, 10, 8, 13, 15, 3, 6, 4, 11, 9, 5];

  export const studentsLanguages = () => ({
    studentsSocioStatus: {
      series: [{ name: 'Number of Students Lang', data: mockStudentLanguagesData}],
      options: {
        ...commonOptions,
        xaxis: {
          categories: [
           "Zulu",
            "Xhosa",
            "Afrikaans",
            "English",
            "Northern Sotho",
            "Tswana",
            "Sotho",
            "Tsonga",
            "Swati",
            "Venda",
            "Ndebele",
          ],
        },
      },
    },
    malesStudentData: {
      series: [{ name: 'Number of Students', data: mockMalesStudentData }],
      options: {
        ...commonOptions,
        xaxis: {
          categories: [
            "Zulu",
            "Xhosa",
            "Afrikaans",
            "English",
            "Northern Sotho",
            "Tswana",
            "Sotho",
            "Tsonga",
            "Swati",
            "Venda",
            "Ndebele",
          ],
        },
      },
    },
    femalesStudentData: {
      series: [{ name: 'Number of Students', data: mockFemalesStudentData }],
      options: {
        ...commonOptions,
        xaxis: {
          categories: [
            "Zulu",
            "Xhosa",
            "Afrikaans",
            "English",
            "Northern Sotho",
            "Tswana",
            "Sotho",
            "Tsonga",
            "Swati",
            "Venda",
            "Ndebele",
          ],
        
        },
      },
    },
  });