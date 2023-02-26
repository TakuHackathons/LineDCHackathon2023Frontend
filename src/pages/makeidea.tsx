import { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Datetime from 'react-datetime';
import { Moment } from 'moment';

export default function MakeIdea() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startAt, setStartAt] = useState('');
  const [participantFee, setParticipantFee] = useState('');
  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };
  const handleChangeDescription = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.currentTarget.value);
  };
  const handleChangeStartAt = (value: Moment | string) => {
    if (typeof value === 'string') {
      setStartAt(value);
    } else {
      setStartAt(value.toISOString());
    }
  };
  const handleChangeParticipantFee = (e: ChangeEvent<HTMLInputElement>) => {
    setParticipantFee(e.currentTarget.value);
  };

  const handleSubmit = async () => {
    const url = 'https://script.google.com/macros/s/AKfycbyWB8IZfvC_51JX33j1coGzmhUSUl5kDI2_pqzrTPsPeCo4ueTEdLyScVdNtj4DJw1Wog/exec';
    const headers = {
      authorization: ['Bearer 1234'],
    };
    const requestFormData = new FormData();
    requestFormData.append('eventidea', title);
    requestFormData.append('eventdate', new Date(Date.parse(startAt)).toISOString());
    requestFormData.append('eventfee', participantFee);
    requestFormData.append('eventexpl', description);

    axios.post(url, requestFormData, { headers: headers }).then((response) => {
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
        <label className='mb-2 block text-sm font-bold text-gray-700'>イベントの日時</label>
        <Datetime
          onChange={handleChangeStartAt}
          value={startAt}
          inputProps={{
            className:
              'focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none',
          }}
        />
      </div>
      <div className='mb-6'>
        <label className='mb-2 block text-sm font-bold text-gray-700'>イベントの詳細</label>
        <input
          className='focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none'
          id='description'
          type='text'
          onChange={handleChangeDescription}
        />
      </div>

      <div className='mb-6'>
        <label className='mb-2 block text-sm font-bold text-gray-700'>費用</label>
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
          イベントを作成して投稿する
        </button>
      </div>
    </form>
  );
}
