'use client';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const getQuestion = async (id) => {
  const res = await fetch(`/api/questions/${id}`);
  const data = await res.json();
  return data.data;
};
const getAnswers = async (id) => {
  const res = await fetch(`/api/questions/${id}/answers`);
  const data = await res.json();
  return data.data;
};

export default function QuestionById({ params }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [question, setQuestion] = useState({});
  const [answers, setAnswers] = useState([]);
  const [state, setState] = useState('ok');
  useEffect(
    () => async () => {
      const data1 = await getQuestion(params.id);
      const data2 = await getAnswers(params.id);
      setQuestion(data1);
      setAnswers(data2);
    },
    [params.id, state]
  );
  // refresh the page
  const refreshPage = () => {
    setState('refresh');
    router.refresh();
  };

  async function postAnswer(e) {
    const answer = e.target.answer.value;
    const res = await fetch(`/api/questions/${params.id}`, {
      method: 'post',
      body: JSON.stringify({ userId: session?.user.id, answer }),
      headers: { 'content-type': 'application/json' },
    });
    if (res.ok) {
      refreshPage();
      alert('answer posted successfully!');
      e.target.answer.value = '';
    } else alert('some error occurred.. try again');
  }

  return (
    <section className='container mx-auto'>
      <div className='border-2 border-cyan-400 p-6'>
        <h1 className='heading-2'>{question.title}</h1>
        <p>{question.description}</p>
      </div>
      <div>
        <h1 className='heading-2 '>Answers</h1>
        {answers.map((ans) => (
          <div key={ans.id} className='border-2 border-green-300 my-6'>
            <h1 className='heading-3'>{ans.answer}</h1>
            <h1>{ans.user}</h1>
          </div>
        ))}
      </div>
      <div className='border-2 border-red-400'>
        <h1 className='heading-2'>Your answer</h1>
        <form
          action='#'
          onSubmit={(e) => {
            e.preventDefault();
            postAnswer(e);
          }}
        >
          <textarea
            name='answer'
            rows='7'
            placeholder='Write your answer here...'
            className='focus:shadow-soft-primary-outline min-h-unset text-sm leading-5.6 ease-soft block h-auto w-1/2 appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-gray-700 focus:outline-none'
          ></textarea>
          <input
            type='submit'
            value='Post Answer'
            className=' inline-block text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:outline-none focus:ring-blue-30 shadow-lg shadow-blue-500/50 dark:shadow-lg font-medium rounded-lg text-md px-4 py-1 text-center mr-2 mt-4 '
          />
        </form>
      </div>
    </section>
  );
}