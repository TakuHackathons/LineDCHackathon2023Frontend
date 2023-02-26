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
  if(router.query.event_id){
    const eventsResponse = axios.get(`${url}/events/${router.query.event_id}`).then(res => {
      console.log(res.data);
      setEvent(res.data);
    });
  }

  return <p>Post: {JSON.stringify(router.query)}</p>;
};

export default Event;
