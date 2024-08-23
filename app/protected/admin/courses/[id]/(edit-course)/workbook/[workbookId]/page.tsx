'use client';
import WorkAddBookQuestions from '@/components/workbook/WorkBookAddQuestions';
import React from 'react'
import { data } from '../data';
import Table from "@/components/course/[id]/modules/optionRubric/Table";
import { IQuestion } from '@/app/interfaces/questions';

function Page() {
  return (
   <>
   <div className="page-separator mb-4">
        <div className="page-separator__text">Questions</div>
      </div>
    <WorkAddBookQuestions question={data[0].questions[0]}/>
    {data[0].questions &&
        data[0].questions.map((q: IQuestion) => (
          <WorkAddBookQuestions key={q.id} question={q} />
        ))}
   </>
   
  )
}

export default Page;
