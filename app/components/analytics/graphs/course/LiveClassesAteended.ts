import { useState, useEffect } from 'react';

// Define the type for the data structure
type LiveClassesData = {
  liveClassesAttendedData: {
    series: { data: number[] }[];
    options: any; // You can further define this type if needed
  };
  JanLiveClassesAttendedData: {
    series: { data: number[] }[];
    options: any;
  };
  FebLiveClassesAttendedData: {
    series: { data: number[] }[];
    options: any;
  };
  MarLiveClassesAttendedData: {
    series: { data: number[] }[];
    options: any;
  };
  AprLiveClassesAttendedData: {
    series: { data: number[] }[];
    options: any;
  };
  MayLiveClassesAttendedData: {
    series: { data: number[] }[];
    options: any;
  };
  JunLiveClassesAttendedData: {
    series: { data: number[] }[];
    options: any;
  };
  JulLiveClassesAttendedData: {
    series: { data: number[] }[];
    options: any;
  };
  AugLiveClassesAttendedData: {
    series: { data: number[] }[];
    options: any;
  };
  SepLiveClassesAttendedData: {
    series: { data: number[] }[];
    options: any;
  };
  OctLiveClassesAttendedData: {
    series: { data: number[] }[];
    options: any;
  };
  NovLiveClassesAttendedData: {
    series: { data: number[] }[];
    options: any;
  };
  DecLiveClassesAttendedData: {
    series: { data: number[] }[];
    options: any;
  };
} | null;

// Hardcoded identifiers
const COURSE_ID = '6669f0ff8759b480859c10a7';
const STUDENT_ID = '124215326541254789652145';

// Filters mapping for dynamic selection
export const liveClassesAttendedDatafiltersMapping = {
  yellow: 'liveClassesAttendedData',
  red: 'JanLiveClassesAttendedData',
  blue: 'FebLiveClassesAttendedData',
  green: 'MarLiveClassesAttendedData',
  orange: 'AprLiveClassesAttendedData',
  purple: 'MayLiveClassesAttendedData',
  pink: 'JunLiveClassesAttendedData',
  brown: 'JulLiveClassesAttendedData',
  cyan: 'AugLiveClassesAttendedData',
  magenta: 'SepLiveClassesAttendedData',
  teal: 'OctLiveClassesAttendedData',
  lavender: 'NovLiveClassesAttendedData',
  gray: 'DecLiveClassesAttendedData',
};

export const liveClassesAttendedDatafilterOptions = [
  { description: 'Year', color: 'yellow' },
  { description: 'Jan', color: 'red' },
  { description: 'Feb', color: 'blue' },
  { description: 'Mar', color: 'green' },
  { description: 'Apr', color: 'orange' },
  { description: 'May', color: 'purple' },
  { description: 'Jun', color: 'pink' },
  { description: 'Jul', color: 'brown' },
  { description: 'Aug', color: 'cyan' },
  { description: 'Sep', color: 'magenta' },
  { description: 'Oct', color: 'teal' },
  { description: 'Nov', color: 'lavender' },
  { description: 'Dec', color: 'gray' },
];

const commonOptions = {
  chart: {
    height: 350,
    type: 'line',
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
  colors: ['#007bff'],
  dataLabels: { enabled: false },
  stroke: { curve: 'smooth' },
  title: { align: 'left' },
  grid: {
    borderColor: '#e7e7e7',
    row: { colors: ['#f3f3f3', 'transparent'] },
  },
  markers: { size: 1 },
};

// Function to fetch data
const fetchLiveClassesData = async () => {
  try {
    const response = await fetch(`https://thooto-dev-be-activity-read.azurewebsites.net/api/v1/GraphData/StudentCourseAnalytic?courseId=${COURSE_ID}&studentId=${STUDENT_ID}`, {
      headers: {
        'Client-Key': 'ec51852d24b1450faff0a868e84d05e5',
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const { data } = await response.json();
      return data.averageLiveClassAttended;
    } else {
      console.error('Failed to fetch live classes data:', response.statusText);
    }
  } catch (error) {
    console.error('Error fetching live classes data:', error);
  }
};

export const liveClassesAttendedData = () => {
  const [liveClassesData, setLiveClassesData] = useState<LiveClassesData>(null);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchLiveClassesData();
      if (data) {
        const processedData = processLiveClassesData(data);
        setLiveClassesData(processedData);
      }
    };

    getData();
  }, []);

  return liveClassesData;
};

const processLiveClassesData = (data: any) => {
  // Extract yearly and monthly data
  const yearlyData = data.year || [];
  const monthlyData = [
    data.january || [],
    data.february || [],
    data.march || [],
    data.april || [],
    data.may || [],
    data.june || [],
    data.july || [],
    data.august || [],
    data.september || [],
    data.october || [],
    data.november || [],
    data.december || [],
  ];

  return {
    liveClassesAttendedData: {
      series: [{ data: yearlyData }],
      options: {
        ...commonOptions,
        xaxis: {
          categories: [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
          ],
        },
      },
    },
    JanLiveClassesAttendedData: {
      series: [{ data: monthlyData[0] }],
      options: {
        ...commonOptions,
        xaxis: { categories: Array.from({ length: 31 }, (_, i) => (i + 1).toString()) },
      },
    },
    FebLiveClassesAttendedData: {
      series: [{ data: monthlyData[1] }],
      options: {
        ...commonOptions,
        xaxis: { categories: Array.from({ length: 28 }, (_, i) => (i + 1).toString()) },
      },
    },
    MarLiveClassesAttendedData: {
      series: [{ data: monthlyData[2] }],
      options: {
        ...commonOptions,
        xaxis: { categories: Array.from({ length: 31 }, (_, i) => (i + 1).toString()) },
      },
    },
    AprLiveClassesAttendedData: {
      series: [{ data: monthlyData[3] }],
      options: {
        ...commonOptions,
        xaxis: { categories: Array.from({ length: 30 }, (_, i) => (i + 1).toString()) },
      },
    },
    MayLiveClassesAttendedData: {
      series: [{ data: monthlyData[4] }],
      options: {
        ...commonOptions,
        xaxis: { categories: Array.from({ length: 31 }, (_, i) => (i + 1).toString()) },
      },
    },
    JunLiveClassesAttendedData: {
      series: [{ data: monthlyData[5] }],
      options: {
        ...commonOptions,
        xaxis: { categories: Array.from({ length: 30 }, (_, i) => (i + 1).toString()) },
      },
    },
    JulLiveClassesAttendedData: {
      series: [{ data: monthlyData[6] }],
      options: {
        ...commonOptions,
        xaxis: { categories: Array.from({ length: 31 }, (_, i) => (i + 1).toString()) },
      },
    },
    AugLiveClassesAttendedData: {
      series: [{ data: monthlyData[7] }],
      options: {
        ...commonOptions,
        xaxis: { categories: Array.from({ length: 31 }, (_, i) => (i + 1).toString()) },
      },
    },
    SepLiveClassesAttendedData: {
      series: [{ data: monthlyData[8] }],
      options: {
        ...commonOptions,
        xaxis: { categories: Array.from({ length: 30 }, (_, i) => (i + 1).toString()) },
      },
    },
    OctLiveClassesAttendedData: {
      series: [{ data: monthlyData[9] }],
      options: {
        ...commonOptions,
        xaxis: { categories: Array.from({ length: 31 }, (_, i) => (i + 1).toString()) },
      },
    },
    NovLiveClassesAttendedData: {
      series: [{ data: monthlyData[10] }],
      options: {
        ...commonOptions,
        xaxis: { categories: Array.from({ length: 30 }, (_, i) => (i + 1).toString()) },
      },
    },
    DecLiveClassesAttendedData: {
      series: [{ data: monthlyData[11] }],
      options: {
        ...commonOptions,
        xaxis: { categories: Array.from({ length: 31 }, (_, i) => (i + 1).toString()) },
      },
    },
  };
};