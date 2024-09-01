'use client';
import { FC, useEffect, useState } from 'react';
import { Tabs, Tab } from '@nextui-org/react';
import { usePathname, useRouter } from 'next/navigation';
import { AllRoles, ProfileMenuList } from '@/utils/constant';
import withAllowedRole from '@/hoc/withAllowedRole';

interface ProfileLayoutProps {
  children: React.ReactNode;
}

const ProfileLayout: FC<ProfileLayoutProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<string>('');

  const handleTabClick = (key: string) => {
    if (activeTab !== '') {
      setActiveTab(key);
      router.push(`/profile/${key}`);
    }
  };

  useEffect(() => {
    const matchingTab = ProfileMenuList.find((tab) =>
      pathname.includes(tab.key),
    );

    if (matchingTab) {
      setActiveTab(matchingTab.key);
    }
  }, [pathname]);

  return (
    <>
      <div className='container mx-auto'>
        <div className='flex items-center justify-between'>
          <h2 className='text-2xl font-semibold'>My Profile</h2>
        </div>
        <Tabs
          className='mb-4 ml-[-10px] mt-4 w-full'
          variant='underlined'
          color='primary'
          aria-label='Tabs variants'
          selectedKey={activeTab}
          onSelectionChange={(key) => handleTabClick(key as string)}>
          {ProfileMenuList.map((item) => (
            <Tab
              key={item.key}
              title={item.title}></Tab>
          ))}
        </Tabs>
        {children}
      </div>
    </>
  );
};

export default withAllowedRole(ProfileLayout, AllRoles);
