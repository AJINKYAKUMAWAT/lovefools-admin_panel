import React, { useEffect, useRef, useState } from 'react';
import {
  Avatar,
  Badge,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarContent,
  NavbarItem,
  Tooltip,
} from '@nextui-org/react';
import { useAppDispatch, useAppSelector } from '@/redux/selector';
import { handleLogout } from '@/redux/auth/auth-slice';
import { useRouter } from 'next/navigation';
import {
  ArrowRightStartOnRectangleIcon,
  Bars3BottomRightIcon,
  BellIcon,
} from '@heroicons/react/24/outline';
import { getUserInfo } from '@/redux/user-info/userInfoSelector';
import Image from 'next/image';
import img from '../../public/images/logo.png';
import img2 from '../../public/images/logo.png';
import { deleteCookie } from 'cookies-next';
import { Switch } from '@nextui-org/react';

import {
  API_ENDPOINT,
  CONFIRMATION_MESSAGES,
  ERROR_MESSAGES,
  NotificationType,
} from '@/utils/constant';
import axiosInstance from '@/utils/axios';
import { CustomError } from '@/types/errorMessage';
import Button from '../common/Button';
import ConfirmationModal from '../common/ConfirmationModal';
import useMediaQuery from '@/hooks/useMediaQuery';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showConfirmationModal, setConfirmationModal] =
    useState<boolean>(false);

  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [unReadCount, setUnReadCount] = useState<number>();

  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(getUserInfo);

  const notificationRef = useRef(null);

  const handleClickOutside = (event: Event) => {
    const target = event.target as HTMLElement;

    if (
      notificationRef.current &&
      !(notificationRef.current as HTMLElement).contains(target)
    ) {
      setShowNotifications(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const logout = async () => {
    await dispatch(handleLogout());
    deleteCookie('lastPathBeforeLogin');
    router.push('/login');
  };

  const getInitials = (name: string): string => {
    const words = name.split(' ');
    return words.map((word) => word.charAt(0).toUpperCase()).join('');
  };

  const fallbackName = user?.fullName ? getInitials(user?.fullName) : '';

  const navigate = (route: string) => {
    try {
      router.push(route);
    } catch (error) {
      console.error(`Error navigating to ${route}:`, error);
    }
  };

  const isMdScreen = useMediaQuery('(min-width: 768px)');
  const isSmScreen = useMediaQuery('(max-width: 767px)');

  return (
    <>
      <div className='z-999 dark:bg-boxdark sticky top-0 flex w-full overflow-x-hidden bg-white shadow dark:drop-shadow-none'>
        <Navbar
          isBordered
          className='w-full shadow-md'
          classNames={{
            wrapper: 'w-full max-w-full p-0 pr-6',
          }}>
          <NavbarContent className='md:hidden'>
            <div
              onClick={() => toggleSidebar()}
              className='cursor-pointer px-5'>
              <Bars3BottomRightIcon className='h-8 w-8 cursor-pointer' />
            </div>
          </NavbarContent>
          {isMdScreen && (
            <NavbarContent>
              <div
                className='mt-2 cursor-pointer pl-6'
                onClick={() => router.push('/')}>
                <Image
                  width={150}
                  height={150}
                  src={img}
                  alt='logo'
                />
              </div>
            </NavbarContent>
          )}

          {isSmScreen && (
            <NavbarContent>
              <div
                className='mt-2 mt-[-2px] cursor-pointer pl-6'
                onClick={() => router.push('/')}>
                <Image
                  width={120}
                  height={120}
                  src={img2}
                  alt='logo'
                />
              </div>
            </NavbarContent>
          )}

          <NavbarContent justify='end'>
            <h3 className='w-max font-semibold'>
              {user && user.fullName ? user.fullName : ''}
            </h3>
            <Button onClick={logout}>
              Logout{' '}
              <ArrowRightStartOnRectangleIcon className='text-black-500 h-5 w-5' />
            </Button>
          </NavbarContent>
        </Navbar>
      </div>
    </>
  );
};

export default Header;
