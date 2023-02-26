import { useRouter } from 'next/router';

const Idea = (props: any) => {
  const router = useRouter();
  return <p>Post: {JSON.stringify(router.query)}</p>;
};

export default Idea;
