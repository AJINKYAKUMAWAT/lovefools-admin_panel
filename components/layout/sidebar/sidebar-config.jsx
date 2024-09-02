import {
  HomeIcon,
  ClockIcon,
  TicketIcon,
  UserGroupIcon,
  InboxStackIcon,
  CreditCardIcon,
} from '@heroicons/react/24/outline';

const SidebarConfig = [
  {
    name: 'Reciept List',
    icon: <HomeIcon className='h-6 w-6' />,
    href: '/',
  },
  {
    name: 'Table List ',
    icon: <ClockIcon className='h-6 w-6' />,
    href: '/punch-in-out',
  },
  {
    name: 'Table Order',
    icon: <UserGroupIcon className='h-6 w-6' />,
    href: '/employees',
  },

  {
    name: 'Contact Form',
    icon: <CreditCardIcon className='h-6 w-6' />,
    href: '/clients',
  },

  {
    name: 'User Info',
    icon: <InboxStackIcon className='h-6 w-6' />,
    href: '/area-of-interest',
  },

  {
    name: 'Event List',
    icon: <TicketIcon className='h-6 w-6' />,
    href: '/request-module',
  },
  {
    name: 'Gallery List',
    icon: <TicketIcon className='h-6 w-6' />,
    href: '/request-module',
  },
  {
    name: 'Testimonial List',
    icon: <TicketIcon className='h-6 w-6' />,
    href: '/request-module',
  },
  {
    name: 'CMS List',
    icon: <TicketIcon className='h-6 w-6' />,
    href: '/request-module',
  },
];

export default SidebarConfig;
