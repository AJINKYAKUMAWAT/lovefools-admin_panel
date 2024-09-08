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
    href: '/table-list',
  },
  {
    name: 'Table Order',
    icon: <UserGroupIcon className='h-6 w-6' />,
    href: '/employees',
  },

  {
    name: 'Contact Form',
    icon: <CreditCardIcon className='h-6 w-6' />,
    href: '/contact-form',
  },

  {
    name: 'User Info',
    icon: <InboxStackIcon className='h-6 w-6' />,
    href: '/user-list',
  },

  {
    name: 'Event List',
    icon: <TicketIcon className='h-6 w-6' />,
    href: '/event-list',
  },
  {
    name: 'Gallery List',
    icon: <TicketIcon className='h-6 w-6' />,
    href: '/gallery-list',
  },
  {
    name: 'Testimonial List',
    icon: <TicketIcon className='h-6 w-6' />,
    href: '/testimonial-list',
  },
  {
    name: 'CMS List',
    icon: <TicketIcon className='h-6 w-6' />,
    href: '/cms-list',
  },
];

export default SidebarConfig;
