'use client';
import React, { useEffect, useState } from 'react';
import {
  AMC,
  API_ENDPOINT,
  CONFIRMATION_MESSAGES,
  ERROR_MESSAGES,
  MonthsOptions,
  Roles,
} from '@/utils/constant';
import { List } from '@/components/common/list/List';
import {
  ArrowPathIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { TableCell, TableRow, Tooltip } from '@nextui-org/react';
import Button from '@/components/common/Button';
import ConfirmationModal from '@/components/common/ConfirmationModal';
import { showNotification } from '@/redux/notification/notification-slice';
import { useAppDispatch, useAppSelector } from '@/redux/selector';
import axiosInstance from '@/utils/axios';
import { useRouter } from 'next/navigation';
import SearchBar from '@/components/common/SearchBar';
import { formatInput } from '@/utils/utils';
import Select from '@/components/common/Select';
import { formatDate } from '@/utils/formatTime';
import {
  getAmcDetails,
  getAmcList,
  removeAmc,
  updateAmcValues,
  updateTab,
} from '@/redux/amc/amcSlice';

const data = [
  {
    id: 1,
    tableNo: '25',
    description: 'LoveFools',
    seats: '100',
    photo: 'no',
  },
  {
    id: 2,
    tableNo: '25',
    description: 'LoveFools',
    seats: '100',
    photo: 'no',
  },
  {
    id: 3,
    tableNo: '25',
    description: 'LoveFools',
    seats: '100',
    photo: 'no',
  },
];

const Dashboard = () => {
  const [showDeleteModal, setDeleteModal] = useState(false);
  const [id, setId] = useState();
  const [queryParams, setQueryParams] = useState();
  const { user } = useAppSelector((state) => state.userInfo);
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const [queryParameters, setQueryParameter] = useState({
    page: 1,
    limit: 10,
    sortBy: 'id',
    sortOrder: -1,
    search: '',
  });

  useEffect(() => {
    dispatch(getAmcList({ ...queryParameters, search: '', month: null }));
  }, []);

  const handleMetaChange = (meta) => {
    const month =
      typeof meta.month === 'string' ? meta.month : meta.month?.value;

    dispatch(
      getAmcList({
        ...meta,
        month: month,
        search: meta.search,
      }),
    );
  };

  const refreshBtn = () => {
    setQueryParams(null);
    dispatch(
      getAmcList({
        search: '',
        sortOrder: -1,
        page: 1,
        sortBy: 'id',
        month: null,
      }),
    );
  };

  const handleEditButtonClick = async (row) => {
    await dispatch(getAmcDetails(Number(row.id)));
    const amount = String(row.amount);
    dispatch(
      updateAmcValues({
        id: row.id,
        serviceName: row.serviceName,
        serviceCompanyName: row.serviceCompanyName,
        startDate: row.startDate ? new Date(row.startDate) : null,
        endDate: row.endDate ? new Date(row.endDate) : null,
        amount: formatInput(amount),
      }),
    );
    dispatch(updateTab('amcDetails'));
    router.push(`/amc/edit/${row.id}`);
  };

  const handleAddAmc = () => {
    dispatch(removeAmc());
    dispatch(
      updateAmcValues({
        id: null,
        serviceName: '',
        serviceCompanyName: '',
        startDate: null,
        endDate: null,
        amount: null,
      }),
    );
    dispatch(updateTab('amcDetails'));
    router.push('/amc/add');
  };

  const handleDeleteButtonClick = async () => {
    try {
      await axiosInstance.delete(API_ENDPOINT.AMC_UPDATE(Number(id)));
      dispatch(getAmcList(queryParameters));
      dispatch(
        showNotification({
          message: AMC.AMC_DELETED,
          variant: 'success',
        }),
      );
      setDeleteModal((prev) => !prev);
    } catch (error) {
      if (error instanceof Error) {
        dispatch(
          showNotification({
            message: error.message,
            variant: 'error',
          }),
        );
      } else {
        dispatch(
          showNotification({
            message: ERROR_MESSAGES.SOMETHING_WENT_WRONG,
            variant: 'error',
          }),
        );
      }
    }
  };

  const toggleDeleteModal = (id) => {
    setId(id);
    setDeleteModal((prev) => !prev);
  };

  const handleSearch = (searchQuery) => {
    handleMetaChange({
      ...queryParameters,
      search: searchQuery,
      page: 1,
    });
  };

  const selectMonth = (monthType) => {
    handleMetaChange({
      ...queryParameters,
      month: monthType,
      page: 1,
    });
    setQueryParams(monthType);
  };

  return (
    <>
      <div className='container mx-auto'>
        <div className='flex flex-col justify-between'>
          <h2 className='text-2xl font-semibold'>Amc </h2>
          <div className='flex flex-wrap'>
            <div className='sm: flex w-full gap-4 sm:flex-col md:w-fit lg:w-3/4'>
              <div className='flex w-full flex-col sm:flex-row md:gap-4'>
                <SearchBar
                  type='text'
                  placeholder='Search'
                  className='my-3 max-w-md md:w-50'
                  value={queryParameters.search || ''}
                  onChange={handleSearch}
                />
                {/* <Select
                  className='my-3 md:w-44'
                  placeholder='Month'
                  value={queryParams}
                  onChange={(value) => {
                    selectMonth(value);
                  }}
                  options={MonthsOptions}
                /> */}
              </div>
            </div>
            <div className='my-2 flex w-full justify-end sm:w-1/4'>
              <Button
                isIconOnly
                type='button'
                variant='light'
                color='default'
                onClick={refreshBtn}>
                <Tooltip content='Refresh'>
                  <ArrowPathIcon className='h-5 w-5' />
                </Tooltip>
              </Button>
              <Button
                onClick={() => {
                  handleAddAmc();
                }}>
                Add
              </Button>
            </div>
          </div>
        </div>
        <List
          columns={[
            { id: 'tableNo', label: 'Table no.' },
            {
              id: 'description',
              label: 'Description',
            },
            { id: 'seats', label: 'Seats' },
            { id: 'photo', label: 'Photo' },
            { id: 'actions', label: 'Actions', fixed: true },
          ]}
          data={{
            data: data.length > 0 ? data : [],
            pageData: { total: 0 },
          }}
          meta={queryParameters}
          onMetaChange={handleMetaChange}
          removeWrapper
          isStriped
          hideSearch={true}
          loading={loading}
          renderRow={(row) => {
            return (
              <TableRow key={row.id}>
                <TableCell>{row.tableNo}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.seats}</TableCell>
                <TableCell>{row.photo}</TableCell>

                <TableCell>
                  <div className='flex items-center gap-4'>
                    <Button
                      isIconOnly
                      type='button'
                      size='sm'
                      variant='light'
                      color='default'
                      onClick={() => handleEditButtonClick(row)}>
                      <Tooltip content='Edit'>
                        <PencilSquareIcon className='h-5 w-5' />
                      </Tooltip>
                    </Button>

                    <Button
                      isIconOnly
                      size='sm'
                      variant='light'
                      color='danger'
                      aria-label='Delete'
                      onClick={() => {
                        toggleDeleteModal(Number(row.id));
                      }}>
                      <Tooltip content='Delete'>
                        <TrashIcon className='h-4 w-4' />
                      </Tooltip>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          }}
        />
      </div>
      <ConfirmationModal
        isOpen={showDeleteModal}
        message={CONFIRMATION_MESSAGES.AMC_DELETE}
        onClose={toggleDeleteModal}
        onConfirm={() => {
          handleDeleteButtonClick();
        }}
      />
    </>
  );
};

export default Dashboard;
