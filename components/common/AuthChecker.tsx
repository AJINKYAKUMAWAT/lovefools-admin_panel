import { useAppSelector } from '@/redux/selector';
import React from 'react';

interface AuthCheckerProps {
  allowedRoles: string[];
  children: (isAuthorized: boolean) => React.ReactNode;
}

const AuthChecker: React.FC<AuthCheckerProps> = ({
  allowedRoles,
  children,
}) => {
  const { user } = useAppSelector((state) => state.userInfo);

  if (!user?.roles) return children(false);

  const { roles } = user;
  const rolesNames = roles.map((role) => role.roleName);

  const isAuthorised = allowedRoles.some((role) => rolesNames.includes(role));
  return children(isAuthorised);
};

export default AuthChecker;
