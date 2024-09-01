'use client';
import { Roles } from '@/utils/constant';
import withAllowedRole from '@/hoc/withAllowedRole';
import { Suspense, lazy } from 'react';
import Loader from '@/components/common/Loader';
const AmcAddUpdate = lazy(() => import('@/components/amc/AmcAddUpdate'));

const UpdateAmc = () => {
  return (
    <Suspense fallback={<Loader />}>
      <AmcAddUpdate />
    </Suspense>
  );
};

export default withAllowedRole(UpdateAmc, [
  Roles.ADMIN,
  Roles.HR_ADMIN,
  Roles.ACCOUNT_ADMIN,
]);
