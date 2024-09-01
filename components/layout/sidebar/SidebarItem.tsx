import React, { useEffect, useRef, useState } from 'react';
import {
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronUpIcon,
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { SidebarItemType } from '@/types/component/common/sideBarItem';
import { useAppSelector } from '@/redux/selector';
interface Props {
  title: string;
  icon: React.ReactNode;
  isActive?: boolean;
  href: string;
  isOpen: boolean;
  onClick: () => void;
  key: number;
  disabled: boolean;
  subItems?: SidebarItemType[];
  isMenuItemActive?: (
    href: string,
    subItems?: SidebarItemType[] | undefined,
  ) => boolean;
}

export const SidebarItem: React.FC<Props> = React.memo(
  ({
    title,
    key,
    icon,
    href,
    isActive,
    isOpen,
    onClick,
    subItems,
    isMenuItemActive,
    disabled,
  }) => {
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
    const [activeSubmenuIndex, setActiveSubmenuIndex] = useState<number | null>(
      null,
    );
    const [activeNestedSubMenuIndex, setActiveNestedSubmenuIndex] =
      useState<string>();
    const [isNestedSubMenuOpen, setIsNestedSubMenuOpen] = useState(false);

    const menuRef = useRef<HTMLLIElement>(null);
    const nestedMenuRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const { user } = useAppSelector((state) => state.userInfo);

    useEffect(() => {
      if (!isOpen) {
        setIsSubMenuOpen(false);
      }
    }, [isOpen]);

    const handleMouseEnter = () => {
      setIsSubMenuOpen(true);
    };

    const handleMouseLeave = (e: React.MouseEvent) => {
      if (
        nestedMenuRef.current &&
        !nestedMenuRef.current?.contains(e.relatedTarget as Node)
      ) {
        setIsSubMenuOpen(false);
      }
    };

    const toggleSubmenu = (submenuIndex: number) => {
      if (activeSubmenuIndex === submenuIndex) {
        setActiveSubmenuIndex(null);
        setIsSubMenuOpen(false);
      } else {
        setActiveSubmenuIndex(submenuIndex);
      }
    };

    const toggleNestedSubmenu = (name: string) => {
      if (activeNestedSubMenuIndex === name) {
        setActiveNestedSubmenuIndex(name);
        setIsNestedSubMenuOpen(false);
      } else {
        setActiveNestedSubmenuIndex(name);
        setIsNestedSubMenuOpen(true);
      }
    };

    const handleMainItemClick = () => {
      if (subItems && subItems.length > 0) {
        setIsSubMenuOpen(!isSubMenuOpen);
      } else {
        onClick();
        router.push(href);
      }
    };

    const calculateSubMenuPosition = () => {
      if (menuRef.current) {
        const { top, height, left } = menuRef.current.getBoundingClientRect();
        return {
          top: top + height,
          left: left,
        };
      }
      return { top: 0, left: 0 };
    };

    return (
      <div
        key={key}
        className='relative mt-4 flex flex-col gap-4 '>
        <ul>
          <li
            key={key}
            onMouseEnter={() => {
              !isOpen ? handleMouseEnter() : null;
            }}
            onMouseLeave={handleMouseLeave}
            ref={menuRef}>
            <a
              className={`
              ${!subItems && disabled ? 'pointer-events-none text-gray-500' : ''}
              ${
                isActive ? 'bg-green-800' : ''
              } group flex flex cursor-pointer items-center justify-center gap-3.5 rounded-md rounded-md p-2 text-sm font-medium hover:bg-green-800 `}
              onClick={() => {
                handleMainItemClick();
                if (isOpen) {
                  toggleSubmenu(key);
                }
              }}>
              <div>{icon}</div>
              {isOpen && (
                <h2
                  className={`w-full whitespace-pre duration-500 ${
                    !isOpen && 'pl-3'
                  }`}>
                  {title}
                </h2>
              )}
              {(!subItems || subItems?.length === 0) && (
                <h2
                  className={`
                  ${
                    isOpen && 'hidden'
                  } absolute left-48 w-0 overflow-hidden whitespace-pre rounded-md bg-white px-0 py-0 font-semibold text-gray-900 drop-shadow-lg group-hover:left-14 group-hover:w-fit group-hover:px-2 group-hover:py-1 group-hover:duration-300  `}
                  style={{
                    position: 'fixed',
                    zIndex: 9999,
                    top: calculateSubMenuPosition().top - 30,
                  }}>
                  {subItems && subItems?.length > 0 ? '' : title}
                </h2>
              )}
              {isOpen && subItems && subItems?.length > 0 && (
                <div>
                  {activeSubmenuIndex === key ? (
                    <ChevronUpIcon className='ph-bold h-5 w-5' />
                  ) : (
                    <ChevronDownIcon className='ph-bold h-5 w-5' />
                  )}
                </div>
              )}
            </a>
          </li>
        </ul>
      </div>
    );
  },
);

SidebarItem.displayName = 'SidebarItem';
