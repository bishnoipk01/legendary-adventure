'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function NewQuestion() {
  const router = useRouter();
  const { data: session } = useSession();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  async function PostQuestion() {
    const res = await fetch('/api/questions/post-question', {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        title,
        description,
        Uid: session.user.id,
      }),
    });
    const result = await res.json();
    if (res.ok) {
      alert('Your question posted successfully!');
      router.push('/questions');
    } else alert('some error occured.. try again');
  }

  return (
    <section className='container mx-auto'>
      <h1 className='heading-2'>Ask a public question</h1>
      <div>
        <p>
          Summarize your problem in a one line title. Then describe it in more
          detail
        </p>
        <form
          className='w-1/2'
          onSubmit={(e) => {
            e.preventDefault();
            PostQuestion();
          }}
        >
          <div className='mb-6'>
            <label
              htmlFor='title'
              className='block m-2 text-md font-medium text-gray-900 dark:text-white'
            >
              Title
            </label>
            <input
              type='text'
              id='title'
              name='title'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='title of question'
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <label
            htmlFor='message'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            describe the problem
          </label>
          <textarea
            id='message'
            rows='4'
            className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='...'
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <input
            type='submit'
            value='Post'
            className='text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:outline-none focus:ring-blue-30 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-md px-4 py-1 text-center mr-2 mt-4 '
          />
        </form>
      </div>
    </section>
  );
}
