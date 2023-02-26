import Link from 'next/link';

const Header = () => {
  return (
    <header className='border-b flex items-center h-14 px-4'>
      <Link href='/makeidea' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded'>
        アイディアを投稿する
      </Link>
      <Link href='/newevent' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded'>
        イベントを作る
      </Link>
    </header>
  );
};

export default Header;
