'use client';
import ErrorCard from '@/components/errorCard';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const getQuestions = async () => {
  try {
    const res = await fetch('/api/questions/get-all', { cache: `no-cache` });
    const questions = await res.json();
    if (res.status !== 200) return null;
    return questions.data;
  } catch (err) {
    console.log(err);
  }
};

export default function Questions() {
  const [ques, setQues] = useState([]);
  useEffect(
    () => async () => {
      const data = await getQuestions();
      setQues(data);
    },
    []
  );
  return (
    <section className='container mx-auto mt-4 bg-slate-400'>
      <div className='flex justify-between'>
        <h1 className='heading-3'>All Questions</h1>
        <Link href={'/questions/new-question'} className='btn-1'>
          Ask a Question
        </Link>
      </div>
      {ques ? '' : <ErrorCard message={`\tUnable to load data try again..`} />}
      {ques.length ? (
        ''
      ) : (
        <ErrorCard message={`\tNo data found .. Try asking a question`} />
      )}

      {ques.map((question) => {
        return (
          <Link
            href={`/questions/${question.id}`}
            key={question.id}
            className='block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 my-6'
          >
            <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
              {question.title}
            </h5>
            <p className='font-normal text-gray-700 dark:text-gray-400'>
              {question.description?.substring(0, 100)}
            </p>
          </Link>
        );
      })}
    </section>
  );
}
