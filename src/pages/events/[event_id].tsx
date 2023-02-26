import { useRouter } from 'next/router';
import axios from 'axios';
import { useState, ChangeEvent } from 'react';

interface EventObj {
  id: string;
  title: string;
  description: string;
  comments: any[];
  likes: number;
  ownerId: string;
  participantFee: number;
  participants: any[];
  endsAt: string;
  photoUrl?: string;
  createdAt: string;
  updatedAt: string;
}

const Event = (props: any) => {
  const router = useRouter();
  const [event, setEvent] = useState({});

  const url = process.env.NEXT_PUBLIC_API_ROOT_URL || '';
  if (router.query.event_id) {
    const eventsResponse = axios.get(`${url}/events/${router.query.event_id}`).then((res) => {
      console.log(res.data);
      setEvent(res.data);
    });
  }

  const handleLikeSubmit = async () => {
    const url = process.env.NEXT_PUBLIC_API_ROOT_URL || '';
    const headers = {
      authorization: ['Bearer 1234'],
    };

    axios.post(`${url}/events/like/${event.id}`, {}, { headers: headers }).then((response) => {
      console.log(response.data);
      router.push('/');
    });
  };

  const handleJoinSubmit = async () => {
    const url = process.env.NEXT_PUBLIC_API_ROOT_URL || '';
    const headers = {
      authorization: ['Bearer 1234'],
    };

    axios.post(`${url}/events/join/${event.id}`, {}, { headers: headers }).then((response) => {
      console.log(response.data);
      router.push('/');
    });
  };

  return (
    <>
      <span>
        {event.startAt} ~ {event.endsAt}
      </span>
      <h2>{event.title}</h2>
      <br />
      <h3>イベントの説明</h3>
      <div>{event.description}</div>
      <br />
      <div>参加費</div>
      <div>{event.participantFee}¥</div>
      <div>いいね</div>
      <div>{event.likes}</div>
      <button
        className='focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none'
        type='button'
        onClick={handleLikeSubmit}
      >
        いいねする
      </button>
      <button
        className='focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none'
        type='button'
        onClick={handleJoinSubmit}
      >
        参加する
      </button>
    </>
  );
};

export default Event;
