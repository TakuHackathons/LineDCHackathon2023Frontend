import { useRouter } from 'next/router';

const Event = (props: any) => {
  const router = useRouter();
  return <p>Post: {JSON.stringify(router.query)}</p>;
};

export default Event;
