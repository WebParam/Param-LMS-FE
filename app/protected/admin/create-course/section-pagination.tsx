// import { ISection } from '@/app/interfaces/courses';
// import React, { useState } from 'react';

// interface PaginationProps {
//     sections : ISection[];
//     itemsPerPage : number;

// }

// const Pagination = ({ sections, itemsPerPage }:PaginationProps) => {
//   const [currentPage, setCurrentPage] = useState(1);

//   // Calculate the total number of pages
//   const totalPages = Math.ceil(sections.length / itemsPerPage);

//   // Calculate the index of the first and last section to display on the current page
//   const indexOfLastSection = currentPage * itemsPerPage;
//   const indexOfFirstSection = indexOfLastSection - itemsPerPage;

//   // Get the current page of sections
//   const currentSections = sections.slice(indexOfFirstSection, indexOfLastSection);

//   // Function to handle page navigation
//   const handlePageChange = (pageNumber:number) => {
//     setCurrentPage(pageNumber);
//   };

//   return (
//     <div>
//       {/* Render the current page of sections */}
//       {currentSections.map((section:any, index:number) => (
//         <div key={index}>

//             <div>
//             {section}
//                 </div>
//         </div>
//       ))}

//       {/* Render pagination controls */}
//       <div>
//         <button
//           onClick={() => handlePageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//         >
//           Previous
//         </button>
//         {Array.from({ length: totalPages }, (_, i) => (
//           <button
//             key={i}
//             onClick={() => handlePageChange(i + 1)}
//             disabled={currentPage === i + 1}
//           >
//             {i + 1}
//           </button>
//         ))}
//         <button
//           onClick={() => handlePageChange(currentPage + 1)}
//           disabled={currentPage === totalPages}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// // // Usage example:
// // const MyComponent = () => {
// //   // Sample data
// //   const sections = Array.from({ length: 20 }, (_, i) => `Section ${i + 1}`);

// //   return <Pagination sections={sections} itemsPerPage={5} />;
// // };

// export default MyComponent;
