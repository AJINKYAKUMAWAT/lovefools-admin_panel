'use client';

import { FunctionComponent, PropsWithChildren } from 'react';
import GuestGuard from '@/guards/GuestGuard';

const AuthLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <GuestGuard>
      <div className={`ml-0 flex flex-1 flex-1 flex-col overflow-hidden`}>
        <main className=' flex-1 overflow-y-auto p-4'>{children}</main>
      </div>
    </GuestGuard>
  );
};

export default AuthLayout;
