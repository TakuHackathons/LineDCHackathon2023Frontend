import { ReactNode } from 'react';
import Header from './header';

type Props = { children: ReactNode };

const Layout = ({ children }: Props) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
