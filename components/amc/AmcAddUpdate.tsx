'use client';
import { Roles, AmcTabList } from '@/utils/constant';
import withAllowedRole from '@/hoc/withAllowedRole';
import { Tabs, Tab } from '@nextui-org/react';
import { FC, lazy, Suspense } from 'react';
import { TabTitles } from '@/types/component/common/tabTitles';
import BackButton from '@/components/common/BackButton';
import { useParams, useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/selector';
import Loader from '@/components/common/Loader';
import { updateTab } from '@/redux/amc/amcSlice';

const amcDetailTap = lazy(() => import('@/components/amc/amcForm'));

const DocumentsTab = lazy(() => import('@/components/amc/Document'));

const AmcAddUpdate = () => {
  const tabComponents: Record<TabTitles, FC> = {
    amcDetails: amcDetailTap,
    Documents: DocumentsTab,
  };

  const { tab, selectAmc } = useAppSelector((state) => state.amc);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const { id } = useParams();

  const handleDisableTab = (title: string) => {
    if (!selectAmc && title == 'Documents') {
      return true;
    } else {
      return false;
    }
  };

  const handleTabClick = async (title: TabTitles) => {
    await dispatch(updateTab(title));
  };

  const goBack = () => {
    router.push('/amc');
  };

  const ActiveTabComponent = tabComponents[tab];

  return (
    <div className='container mx-auto'>
      <div className='ml-3 flex'>
        <BackButton onClick={goBack} />
        <h2 className='mb-3 ml-3 text-xl font-semibold'>
          {id ? 'Update' : 'Add'} Amc
        </h2>
      </div>
      <Tabs
        className='mb-2 mt-2'
        variant='underlined'
        color='primary'
        aria-label='Tabs variants'
        selectedKey={tab}
        onSelectionChange={(key) => handleTabClick(key as TabTitles)}>
        {AmcTabList.map((item) => (
          <Tab
            isDisabled={handleDisableTab(item.title)}
            key={item.key}
            title={item.title}></Tab>
        ))}
      </Tabs>
      <Suspense fallback={<Loader />}>
        {ActiveTabComponent && (
          <div className='ml-6'>
            <ActiveTabComponent />
          </div>
        )}
      </Suspense>
    </div>
  );
};

export default withAllowedRole(AmcAddUpdate, [
  Roles.ADMIN,
  Roles.HR_ADMIN,
  Roles.ACCOUNT_ADMIN,
]);
