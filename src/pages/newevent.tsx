import { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function NewEvent() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startAt, setStartAt] = useState('');
  const [endsAt, setEndAt] = useState('');
  const [participantFee, setParticipantFee] = useState('');
  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };
  const handleChangeDescription = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.currentTarget.value);
  };
  const handleChangeStartAt = (e: ChangeEvent<HTMLInputElement>) => {
    setStartAt(e.currentTarget.value);
  };
  const handleChangeEndsAt = (e: ChangeEvent<HTMLInputElement>) => {
    setEndAt(e.currentTarget.value);
  };
  const handleChangeParticipantFee = (e: ChangeEvent<HTMLInputElement>) => {
    setParticipantFee(e.currentTarget.value);
  };

  const handleSubmit = async () => {
    const requestBodyObject = {
      title: title,
      description: description,
      startAt: new Date(Date.parse(startAt)).toISOString(),
      endsAt: new Date(Date.parse(endsAt)).toISOString(),
      participantFee: parseInt(participantFee),
    };
    console.log(requestBodyObject);
    const url = process.env.NEXT_PUBLIC_API_ROOT_URL || '';
    const headers = {
      authorization: ['Bearer 1234'],
    };
    axios.post(`${url}/events`, requestBodyObject, { headers: headers }).then((response) => {
      console.log(response.data);
      router.push('/');
    });
  };

  return (
    <form className='mb-4 rounded bg-white px-8 pt-6 pb-8 shadow-md'>
      <div className='mb-4'>
        <label className='mb-2 block text-sm font-bold text-gray-700'>イベント名</label>
        <input
          className='focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none'
          id='title'
          type='text'
          onChange={handleChangeTitle}
        />
      </div>
      <div className='mb-6'>
        <label className='mb-2 block text-sm font-bold text-gray-700'>説明</label>
        <input
          className='focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none'
          id='description'
          type='text'
          onChange={handleChangeDescription}
        />
      </div>
      <div className='mb-6'>
        <label className='mb-2 block text-sm font-bold text-gray-700'>開始日時</label>
        <input
          className='focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none'
          id='startAt'
          type='text'
          onChange={handleChangeStartAt}
        />
      </div>
      <div className='mb-6'>
        <label className='mb-2 block text-sm font-bold text-gray-700'>終了日時</label>
        <input
          className='focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none'
          id='endsAt'
          type='text'
          onChange={handleChangeEndsAt}
        />
      </div>
      <div className='mb-6'>
        <label className='mb-2 block text-sm font-bold text-gray-700'>参加費</label>
        <input
          className='focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none'
          id='participantFee'
          type='number'
          onChange={handleChangeParticipantFee}
        />
      </div>
      <div className='flex items-center justify-between'>
        <button
          className='focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none'
          type='button'
          onClick={handleSubmit}
        >
          イベントを作成
        </button>
      </div>
    </form>
  );
}
