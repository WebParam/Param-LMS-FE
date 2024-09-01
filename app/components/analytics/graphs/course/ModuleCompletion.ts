export const ModuleCompletionRatesFiltersMapping = {
  yellow: 'ModuleCompletionRates',
  red: 'JanModuleCompletionRates',
  blue: 'FebModuleCompletionRates',
  green: 'MarModuleCompletionRates',
  orange: 'AprModuleCompletionRates',
  purple: 'MayModuleCompletionRates',
  pink: 'JunModuleCompletionRates',
  brown: 'JulModuleCompletionRates',
  cyan: 'AugModuleCompletionRates',
  magenta: 'SepModuleCompletionRates',
  teal: 'OctModuleCompletionRates',
  lavender: 'NovModuleCompletionRates',
  gray: 'DecModuleCompletionRates',
};

export const ModuleCompletionRatesFilterOptions = [
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

export const ModuleCompletionRates = {
  ModuleCompletionRates: {
    series: [
      {
        name: 'Module A',
        data: [21, 32, 43, 54, 65, 76, 87, 98, 100, 100, 100, 100],
      },
      {
        name: 'Module B',
        data: [11, 22, 33, 44, 55, 66, 77, 88, 99, 99, 99, 99],
      },
      {
        name: 'Module C',
        data: [6, 16, 26, 36, 46, 56, 66, 76, 96, 96, 96, 96],
      },
    ],
    options: {
      chart: {
        type: 'area',
        height: 350,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        area: {
          fill: 'monotone',
          connectNulls: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['#007bff', '#00cc00', '#ff0000'], // Colors for each module
      },
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
      },
      yaxis: {
        title: {
          text: 'Cumulative Completion Rate (%)',
        },
        min: 0,
        max: 100,
      },
      fill: {
        opacity: 0.5,
        colors: ['#007bff', '#00cc00', '#ff0000'], // Colors for each module
      },
      tooltip: {
        y: {
          formatter: function (val:any) {
            return `${val}%`;
          },
        },
      },
    },
  },
  JanModuleCompletionRates: {
    series: [
      {
        name: 'Module A',
        data: Array.from({ length: 12 }, (_, i) => Math.min(100, 6 + i * 10 + Math.floor(Math.random() * 10))),
      },
      {
        name: 'Module B',
        data: Array.from({ length: 12 }, (_, i) => Math.min(100, 6 + i * 10 + Math.floor(Math.random() * 10))),
      },
      {
        name: 'Module C',
        data: Array.from({ length: 12 }, (_, i) => Math.min(100, 6 + i * 10 + Math.floor(Math.random() * 10))),
      },
    ],
    options: {
      chart: {
        type: 'area',
        height: 350,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        area: {
          fill: 'monotone',
          connectNulls: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['#007bff', '#00cc00', '#ff0000'], // Colors for each module
      },
      xaxis: {
        categories: ['Jan'],
      },
      yaxis: {
        title: {
          text: 'Cumulative Completion Rate (%)',
        },
        min: 0,
        max: 100,
      },
      fill: {
        opacity: 0.5,
        colors: ['#007bff', '#00cc00', '#ff0000'], // Colors for each module
      },
      tooltip: {
        y: {
          formatter: function (val:any) {
            return `${val}%`;
          },
        },
      },
    },
  },
  FebModuleCompletionRates: {
    series: [
      {
        name: 'Module A',
        data: Array.from({ length: 12 }, (_, i) => Math.min(100, 6 + i * 10 + Math.floor(Math.random() * 10))),
      },
      {
        name: 'Module B',
        data: Array.from({ length: 12 }, (_, i) => Math.min(100, 6 + i * 10 + Math.floor(Math.random() * 10))),
      },
      {
        name: 'Module C',
        data: Array.from({ length: 12 }, (_, i) => Math.min(100, 6 + i * 10 + Math.floor(Math.random() * 10))),
      },
    ],
    options: {
      chart: {
        type: 'area',
        height: 350,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        area: {
          fill: 'monotone',
          connectNulls: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['#007bff', '#00cc00', '#ff0000'], // Colors for each module
      },
      xaxis: {
        categories: ['Feb'],
      },
      yaxis: {
        title: {
          text: 'Cumulative Completion Rate (%)',
        },
        min: 0,
        max: 100,
      },
      fill: {
        opacity: 0.5,
        colors: ['#007bff', '#00cc00', '#ff0000'], // Colors for each module
      },
      tooltip: {
        y: {
          formatter: function (val:any) {
            return `${val}%`;
          },
        },
      },
    },
  },
  // Add remaining months from Mar to Dec
  MarModuleCompletionRates: {
    series: [
      {
        name: 'Module A',
        data: Array.from({ length: 12 }, (_, i) => Math.min(100, 6 + i * 10 + Math.floor(Math.random() * 10))),
      },
      {
        name: 'Module B',
        data: Array.from({ length: 12 }, (_, i) => Math.min(100, 6 + i * 10 + Math.floor(Math.random() * 10))),
      },
      {
        name: 'Module C',
        data: Array.from({ length: 12 }, (_, i) => Math.min(100, 6 + i * 10 + Math.floor(Math.random() * 10))),
      },
    ],
    options: {
      chart: {
        type: 'area',
        height: 350,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        area: {
          fill: 'monotone',
          connectNulls: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['#007bff', '#00cc00', '#ff0000'], // Colors for each module
      },
      xaxis: {
        categories: ['Mar'],
      },
      yaxis: {
        title: {
          text: 'Cumulative Completion Rate (%)',
        },
        min: 0,
        max: 100,
      },
      fill: {
        opacity: 0.5,
        colors: ['#007bff', '#00cc00', '#ff0000'], // Colors for each module
      },
      tooltip: {
        y: {
          formatter: function (val:any) {
            return `${val}%`;
          },
        },
      },
    },
  },
  AprModuleCompletionRates: {
    series: [
      {
        name: 'Module A',
        data: Array.from({ length: 12 }, (_, i) => Math.min(100, 6 + i * 10 + Math.floor(Math.random() * 10))),
      },
      {
        name: 'Module B',
        data: Array.from({ length: 12 }, (_, i) => Math.min(100, 6 + i * 10 + Math.floor(Math.random() * 10))),
      },
      {
        name: 'Module C',
        data: Array.from({ length: 12 }, (_, i) => Math.min(100, 6 + i * 10 + Math.floor(Math.random() * 10))),
      },
    ],
    options: {
      chart: {
        type: 'area',
        height: 350,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        area: {
          fill: 'monotone',
          connectNulls: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['#007bff', '#00cc00', '#ff0000'], // Colors for each module
      },
      xaxis: {
        categories: ['Apr'],
      },
      yaxis: {
        title: {
          text: 'Cumulative Completion Rate (%)',
        },
        min: 0,
        max: 100,
      },
      fill: {
        opacity: 0.5,
        colors: ['#007bff', '#00cc00', '#ff0000'], // Colors for each module
      },
      tooltip: {
        y: {
          formatter: function (val:any) {
            return `${val}%`;
          },
        },
      },
    },
  },
  MayModuleCompletionRates: {
    series: [
      {
        name: 'Module A',
        data: Array.from({ length: 12 }, (_, i) => Math.min(100, 6 + i * 10 + Math.floor(Math.random() * 10))),
      },
      {
        data: Array.from({ length: 12 }, (_, i) => Math.min(100, 6 + i * 10 + Math.floor(Math.random() * 10))),

      },
      {
        name: 'Module C',
        data: Array.from({ length: 12 }, (_, i) => Math.min(100, 6 + i * 10 + Math.floor(Math.random() * 10))),
      },
    ],
    options: {
      chart: {
        type: 'area',
        height: 350,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        area: {
          fill: 'monotone',
          connectNulls: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['#007bff', '#00cc00', '#ff0000'], // Colors for each module
      },
      xaxis: {
        categories: ['May'],
      },
      yaxis: {
        title: {
          text: 'Cumulative Completion Rate (%)',
        },
        min: 0,
        max: 100,
      },
      fill: {
        opacity: 0.5,
        colors: ['#007bff', '#00cc00', '#ff0000'], // Colors for each module
      },
      tooltip: {
        y: {
          formatter: function (val:any) {
            return `${val}%`;
          },
        },
      },
    },
  },
  JunModuleCompletionRates: {
    series: [
      {
        name: 'Module A',
        data: Array.from({ length: 12 }, (_, i) => Math.min(100, 6 + i * 10 + Math.floor(Math.random() * 10))),
      },
      {
        name: 'Module B',
        data: Array.from({ length: 12 }, (_, i) => Math.min(100, 6 + i * 10 + Math.floor(Math.random() * 10))),
      },
      {
        name: 'Module C',
        data: Array.from({ length: 12 }, (_, i) => Math.min(100, 6 + i * 10 + Math.floor(Math.random() * 10))),
      },
    ],
    options: {
      chart: {
        type: 'area',
        height: 350,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        area: {
          fill: 'monotone',
          connectNulls: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['#007bff', '#00cc00', '#ff0000'], // Colors for each module
      },
      xaxis: {
        categories: ['Jun'],
      },
      yaxis: {
        title: {
          text: 'Cumulative Completion Rate (%)',
        },
        min: 0,
        max: 100,
      },
      fill: {
        opacity: 0.5,
        colors: ['#007bff', '#00cc00', '#ff0000'], // Colors for each module
      },
      tooltip: {
        y: {
          formatter: function (val:any) {
            return `${val}%`;
          },
        },
      },
    },
  },
  JulModuleCompletionRates: {
    series: [
      {
        name: 'Module A',
        data: Array.from({ length: 12 }, (_, i) => Math.min(100, 6 + i * 10 + Math.floor(Math.random() * 10))),
      },
      {
        name: 'Module B',
        data: Array.from({ length: 12 }, (_, i) => Math.min(100, 6 + i * 10 + Math.floor(Math.random() * 10))),
      },
      {
        name: 'Module C',
        data: Array.from({ length: 12 }, (_, i) => Math.min(100, 6 + i * 10 + Math.floor(Math.random() * 10))),
      },
    ],
    options: {
      chart: {
        type: 'area',
        height: 350,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        area: {
          fill: 'monotone',
          connectNulls: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['#007bff', '#00cc00', '#ff0000'], // Colors for each module
      },
      xaxis: {
        categories: ['Jul'],
      },
      yaxis: {
        title: {
          text: 'Cumulative Completion Rate (%)',
        },
        min: 0,
        max: 100,
      },
      fill: {
        opacity: 0.5,
        colors: ['#007bff', '#00cc00', '#ff0000'], // Colors for each module
      },
      tooltip: {
        y: {
          formatter: function (val:any) {
            return `${val}%`;
          },
        },
      },
    },
  },
  AugModuleCompletionRates: {
    series: [
      {
        name: 'Module A',
        data: Array.from({ length: 12 }, (_, i) => Math.min(100, 6 + i * 10 + Math.floor(Math.random() * 10))),
      },
      {
        name: 'Module B',
        data: Array.from({ length: 12 }, (_, i) => Math.min(100, 6 + i * 10 + Math.floor(Math.random() * 10))),
      },
      {
        name: 'Module C',
        data: Array.from({ length: 12 }, (_, i) => Math.min(100, 6 + i * 10 + Math.floor(Math.random() * 10))),
      },
    ],
    options: {
      chart: {
        type: 'area',
        height: 350,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        area: {
          fill: 'monotone',
          connectNulls: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['#007bff', '#00cc00', '#ff0000'], // Colors for each module
      },
      xaxis: {
        categories: ['Aug'],
      },
      yaxis: {
        title: {
          text: 'Cumulative Completion Rate (%)',
        },
        min: 0,
        max: 100,
      },
      fill: {
        opacity: 0.5,
        colors: ['#007bff', '#00cc00', '#ff0000'], // Colors for each module
      },
      tooltip: {
        y: {
          formatter: function (val:any) {
            return `${val}%`;
          },
        },
      },
    },
  },
  SepModuleCompletionRates: {
    series: [
      {
        name: 'Module A',
        data: Array.from({ length: 12 }, (_, i) => Math.min(100, 6 + i * 10 + Math.floor(Math.random() * 10))),
      },
      {
        name: 'Module B',
        data: Array.from({ length: 12 }, (_, i) => Math.min(100, 6 + i * 10 + Math.floor(Math.random() * 10))),
      },
      {
        name: 'Module C',
        data: Array.from({ length: 12 }, (_, i) => Math.min(100, 6 + i * 10 + Math.floor(Math.random() * 10))),
      },
    ],
    options: {
      chart: {
        type: 'area',
        height: 350,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        area: {
          fill: 'monotone',
          connectNulls: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['#007bff', '#00cc00', '#ff0000'], // Colors for each module
      },
      xaxis: {
        categories: ['Sep'],
      },
      yaxis: {
        title: {
          text: 'Cumulative Completion Rate (%)',
        },
        min: 0,
        max: 100,
      },
      fill: {
        opacity: 0.5,
        colors: ['#007bff', '#00cc00', '#ff0000'], // Colors for each module
      },
      tooltip: {
        y: {
          formatter: function (val:any) {
            return `${val}%`;
          },
        },
      },
    },
  },
  OctModuleCompletionRates: {
    series: [
      {
        name: 'Module A',
        data: Array.from({ length: 12 }, (_, i) => Math.min(100, 6 + i * 10 + Math.floor(Math.random() * 10))),
      },
      {
        name: 'Module B',
        data: Array.from({ length: 12 }, (_, i) => Math.min(100, 6 + i * 10 + Math.floor(Math.random() * 10))),
      },
      {
        name: 'Module C',
        data: Array.from({ length: 12 }, (_, i) => Math.min(100, 6 + i * 10 + Math.floor(Math.random() * 10))),
      },
    ],
    options: {
      chart: {
        type: 'area',
        height: 350,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        area: {
          fill: 'monotone',
          connectNulls: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['#007bff', '#00cc00', '#ff0000'], // Colors for each module
      },
      xaxis: {
        categories: ['Oct'],
      },
      yaxis: {
        title: {
          text: 'Cumulative Completion Rate (%)',
        },
        min: 0,
        max: 100,
      },
      fill: {
        opacity: 0.5,
        colors: ['#007bff', '#00cc00', '#ff0000'], // Colors for each module
      },
      tooltip: {
        y: {
          formatter: function (val:any) {
            return `${val}%`;
          },
        },
      },
    },
  },
  NovModuleCompletionRates: {
    series: [
      {
        name: 'Module A',
        data: Array.from({ length: 12 }, (_, i) => Math.min(100, 6 + i * 10 + Math.floor(Math.random() * 10))),
      },
      {
        name: 'Module B',
        data: Array.from({ length: 12 }, (_, i) => Math.min(100, 6 + i * 10 + Math.floor(Math.random() * 10))),
      },
      {
        name: 'Module C',
        data: Array.from({ length: 12 }, (_, i) => Math.min(100, 6 + i * 10 + Math.floor(Math.random() * 10))),
      },
    ],
    options: {
      chart: {
        type: 'area',
        height: 350,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        area: {
          fill: 'monotone',
          connectNulls: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['#007bff', '#00cc00', '#ff0000'], // Colors for each module
      },
      xaxis: {
        categories: ['Nov'],
      },
      yaxis: {
        title: {
          text: 'Cumulative Completion Rate (%)',
        },
        min: 0,
        max: 100,
      },
      fill: {
        opacity: 0.5,
        colors: ['#007bff', '#00cc00', '#ff0000'], // Colors for each module
      },
      tooltip: {
        y: {
          formatter: function (val:any) {
            return `${val}%`;
          },
        },
      },
    },
  },
  DecModuleCompletionRates: {
    series: [
      {
        name: 'Module A',
        data: Array.from({ length: 12 }, (_, i) => Math.min(100, 6 + i * 10 + Math.floor(Math.random() * 10))),
      },
      {
        name: 'Module B',
        data: Array.from({ length: 12 }, (_, i) => Math.min(100, 6 + i * 10 + Math.floor(Math.random() * 10))),
      },
      {
        name: 'Module C',
        data: Array.from({ length: 12 }, (_, i) => Math.min(100, 6 + i * 10 + Math.floor(Math.random() * 10))),
      },
    ],
    options: {
      chart: {
        type: 'area',
        height: 350,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        area: {
          fill: 'monotone',
          connectNulls: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['#007bff', '#00cc00', '#ff0000'], // Colors for each module
      },
      xaxis: {
        categories: ['Nov'],
      },
      yaxis: {
        title: {
          text: 'Cumulative Completion Rate (%)',
        },
        min: 0,
        max: 100,
      },
      fill: {
        opacity: 0.5,
        colors: ['#007bff', '#00cc00', '#ff0000'], // Colors for each module
      },
      tooltip: {
        y: {
          formatter: function (val:any) {
            return `${val}%`;
          },
        },
      },
    },
}
}