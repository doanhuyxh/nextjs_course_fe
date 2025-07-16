'use client';

import UserActions from './Actions/UserActions';
import { Customer } from '@/libs/types';

const Auth = ({ user }: { user: Customer }) => {
  return <UserActions user={user} />;
};

export default Auth;
