import React from 'react'
import { useRouter,usePathname } from 'next/navigation'

const assessments = [
  'Formative Assessment 1',
  'Formative Assessment 2',
  'Formative Assessment 3',
  'Summative Assessment'
]

const AssessmentsNames = () => {
const pathname = usePathname();
const router = useRouter();


  const handleClick = (name:string) => {
router.push(`${pathname}?assessment_name=${encodeURIComponent(name)}`)
  }

  return (
    <div className="d-flex flex-row">
      {assessments.map((name, index) => (
        <button
          className="btn btn-success m-2"
          key={index}
          onClick={() => handleClick(name)}
        >
          {name}
        </button>
      ))}
    </div>
  )
}

export default AssessmentsNames