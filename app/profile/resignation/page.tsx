'use client';
import { API_ENDPOINT, AllRoles } from '@/utils/constant';
import withAllowedRole from '@/hoc/withAllowedRole';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/utils/axios';
import Loader from '@/components/common/Loader';

const Resignation = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const getResignationsDetails = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_ENDPOINT.GET_RESIGNATION_ME);
      setLoading(false);
      if (!response.data) {
        router.push('resignation/add');
      } else {
        router.push('resignation/details');
      }
    } catch (error) {
      setLoading(false);
    }
  };
  if (loading) {
    <Loader />;
  }
  useEffect(() => {
    getResignationsDetails();
  }, []);

  return <></>;
};

export default withAllowedRole(Resignation, AllRoles);
