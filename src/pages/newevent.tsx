import { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/router';

export default function NewEvent() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };
  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const handleSubmit = async () => {
    // loginに成功するとresが返ってくる、パスワードが違ったりした場合はerrorになるのでcacheする必要がある
    router.push('/');
  };

  return (
    <form className='mb-4 rounded bg-white px-8 pt-6 pb-8 shadow-md'>
      <div className='mb-4'>
        <label className='mb-2 block text-sm font-bold text-gray-700'>Username</label>
        <input
          className='focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none'
          id='username'
          type='text'
          onChange={handleChangeEmail}
        />
      </div>
      <div className='mb-6'>
        <label className='mb-2 block text-sm font-bold text-gray-700'>Password</label>
        <input
          className='focus:shadow-outline mb-3 w-full appearance-none rounded border border-red-500 py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none'
          id='password'
          type='text'
          onChange={handleChangePassword}
        />
        <p className='text-xs italic text-red-500'>Please choose a password.</p>
      </div>
      <div className='flex items-center justify-between'>
        <button
          className='focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none'
          type='button'
          onClick={handleSubmit}
        >
          Sign In
        </button>
      </div>
    </form>
  );
}
