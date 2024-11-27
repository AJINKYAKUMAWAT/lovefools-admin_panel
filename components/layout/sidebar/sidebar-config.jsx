import {
  UserGroupIcon,
  DocumentTextIcon,
  ListBulletIcon,
  EnvelopeIcon,
  UserCircleIcon,
  CalendarDaysIcon,
  PhotoIcon,
  ClipboardDocumentIcon,
} from '@heroicons/react/24/outline';

const SidebarConfig = [
  {
    name: 'Booking',
    icon: <DocumentTextIcon className='h-6 w-6' />,
    href: '/',
  },
  {
    name: 'Menu List',
    icon: <DocumentTextIcon className='h-6 w-6' />,
    href: '/menu-list',
  },
  {
    name: 'Table List ',
    icon: <ListBulletIcon className='h-6 w-6' />,
    href: '/room-list',
  },
  // {
  //   name: 'Table Order',
  //   icon: <UserGroupIcon className='h-6 w-6' />,
  //   href: '/employees',
  // },

  {
    name: 'Contact Form',
    icon: <EnvelopeIcon className='h-6 w-6' />,
    href: '/contact-form',
  },

  {
    name: 'User Info',
    icon: <UserCircleIcon className='h-6 w-6' />,
    href: '/user-list',
  },

  {
    name: 'Event List',
    icon: <CalendarDaysIcon className='h-6 w-6' />,
    href: '/event-list',
  },
  {
    name: 'Upcoming Event List',
    icon: <CalendarDaysIcon className='h-6 w-6' />,
    href: '/upcoming-event',
  },
  {
    name: 'Gallery List',
    icon: <PhotoIcon className='h-6 w-6' />,
    href: '/gallery-list',
  },
  {
    name: 'Testimonial List',
    icon: <UserGroupIcon className='h-6 w-6' />,
    href: '/testimonial-list',
  },
  {
    name: 'CMS List',
    icon: <ClipboardDocumentIcon className='h-6 w-6' />,
    href: '/cms-list',
  },
];

export default SidebarConfig;
