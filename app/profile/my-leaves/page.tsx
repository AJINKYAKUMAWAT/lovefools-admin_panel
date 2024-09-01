'use client';
import { List } from '@/components/common/list/List';
import {
  API_ENDPOINT,
  AllRoles,
  CONFIRMATION_MESSAGES,
  DayTypeOptions,
  ERROR_MESSAGES,
  LEAVE_MESSAGES,
  LeaveType,
  LeaveTypeOptions,
  Status,
  StatusType,
} from '@/utils/constant';
import withAllowedRole from '@/hoc/withAllowedRole';
import { useAppDispatch } from '@/redux/selector';
import { TableCell, TableRow, Tooltip } from '@nextui-org/react';
import { useEffect, useRef, useState } from 'react';
import Button from '@/components/common/Button';
import { convertToDateFormat, formatDate } from '@/utils/formatTime';
import PopupModal from '@/components/common/PopupModal';
import LeaveForm from '@/components/leave/LeaveForm';
import { Leave, LeaveInput, LeaveListParameters } from '@/types/leave';
import ConfirmationModal from '@/components/common/ConfirmationModal';
import axiosInstance from '@/utils/axios';
import { showNotification } from '@/redux/notification/notification-slice';
import { findSingleSelectedValueLabelOption, toTitleCase } from '@/utils/utils';
import { CustomError } from '@/types/errorMessage';
import { AxiosError } from 'axios';
import Select from '@/components/common/Select';
import { ValueLabelOption } from '@/types/component/common/select';
import {
  TrashIcon,
  ArrowPathIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/outline';
import { parseAbsoluteToLocal } from '@internationalized/date';

const Leaves = () => {
  const dispatch = useAppDispatch();
  const [showLeaveFormModal, setShowLeaveFormModal] = useState(false);
  const [showDeleteModal, setDeleteModal] = useState(false);
  const [leaveList, setLeaveList] = useState([]);
  const [total, setTotal] = useState<number>();
  const [loading, setLoading] = useState(false);
  const [leaveId, setLeaveId] = useState<number | null>(null);
  const [queryParameters, setQueryParameters] = useState<LeaveListParameters>({
    search: '',
    page: 1,
    limit: 10,
    sortBy: '',
    sortOrder: -1,
  });

  const defaultValues = useRef<LeaveInput>({
    id: null,
    leaveType: null,
    dayLeaveType: null,
    fromDate: null,
    toDate: null,
    description: '',
  });

  const getMyLeavesData = (queryParameters?: Partial<LeaveListParameters>) => {
    setLoading(true);
    axiosInstance
      .get(API_ENDPOINT.MY_LEAVES, {
        params: queryParameters,
      })
      .then((res) => {
        setLoading(false);
        setLeaveList(res.data.data);
        setTotal(res.data.pageData.total);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getMyLeavesData();
  }, []);

  const handleMetaChange = (meta: LeaveListParameters) => {
    const statusTypeValue =
      typeof queryParameters.status === 'string'
        ? queryParameters.status
        : queryParameters.status?.value;

    const leaveTypeValue =
      typeof queryParameters.leaveType === 'string'
        ? queryParameters.leaveType
        : queryParameters.leaveType?.value;

    const DayLeaveTypeValue =
      typeof queryParameters.dayLeaveType === 'string'
        ? queryParameters.dayLeaveType
        : queryParameters.dayLeaveType?.value;

    setQueryParameters({
      ...queryParameters,
      search: meta.search,
      page: meta.page,
      limit: 10,
      sortBy: meta.sortBy,
      sortOrder: meta.sortOrder,
    });
    getMyLeavesData({
      ...queryParameters,
      search: meta.search,
      page: meta.page,
      limit: 10,
      sortBy: meta.sortBy,
      sortOrder: meta.sortOrder,
      status: statusTypeValue,
      leaveType: leaveTypeValue,
      dayLeaveType: DayLeaveTypeValue,
    });
  };

  const toggleLeaveFormModal = () => {
    setShowLeaveFormModal((prevState) => !prevState);
    defaultValues.current = {
      leaveType: null,
      dayLeaveType: null,
      fromDate: null,
      toDate: null,
      description: '',
    };
  };

  const handleEditButtonClick = (leaveData: Leave) => {
    setLeaveId(leaveData.id);
    toggleLeaveFormModal();
    defaultValues.current = {
      id: leaveData.id,
      leaveType: findSingleSelectedValueLabelOption(
        LeaveTypeOptions,
        leaveData?.leaveType,
      ),
      dayLeaveType: findSingleSelectedValueLabelOption(
        DayTypeOptions,
        leaveData?.dayLeaveType,
      ),
      fromDate: parseAbsoluteToLocal(leaveData?.fromDate),
      toDate: parseAbsoluteToLocal(leaveData.toDate),
      description: leaveData.description,
    };
  };
  const toggleDeleteModal = (id?: number) => {
    setLeaveId(id || null);
    setDeleteModal((prevState) => !prevState);
  };
  const onSubmit = async (leaveData: LeaveInput) => {
    const fromDateFormatChange = leaveData.fromDate
      ? convertToDateFormat(leaveData.fromDate)
      : '';
    const toDateFormatChange = leaveData.toDate
      ? convertToDateFormat(leaveData.toDate)
      : '';
    const leaveDataUpdate = {
      leaveType: leaveData.leaveType ? leaveData.leaveType.value : '',
      dayLeaveType: leaveData.dayLeaveType ? leaveData.dayLeaveType.value : '',
      fromDate: fromDateFormatChange,
      toDate: toDateFormatChange,
      description: leaveData.description,
    };
    try {
      if (leaveId) {
        await axiosInstance.patch(
          `${API_ENDPOINT.UPDATE_LEAVE(leaveId)}`,
          leaveDataUpdate,
        );
      } else {
        await axiosInstance.post(
          `${API_ENDPOINT.APPLY_LEAVE}`,
          leaveDataUpdate,
        );
      }

      dispatch(
        showNotification({
          message: !leaveId
            ? LEAVE_MESSAGES.APPLY_LEAVE_SUCCESS
            : LEAVE_MESSAGES.UPDATE_LEAVE_SUCCESS,
          variant: 'success',
        }),
      );

      setQueryParameters({
        ...queryParameters,
        page: 1,
        limit: 10,
        sortOrder: -1,
      });

      await getMyLeavesData({ page: 1, sortOrder: -1 });
    } catch (error) {
      setLoading(false);
      let errorMessage: CustomError | undefined;
      if (error instanceof AxiosError) {
        dispatch(
          showNotification({
            message: error?.message,
            variant: 'error',
          }),
        );
      } else {
        setLoading(false);
        errorMessage = error as CustomError; // Type assertion
        dispatch(
          showNotification({
            message: errorMessage
              ? errorMessage.message
              : ERROR_MESSAGES.SOMETHING_WENT_WRONG,
            variant: 'error',
          }),
        );
      }
    }

    toggleLeaveFormModal();
  };

  const deleteLeave = async () => {
    try {
      if (!leaveId) return;
      const { data } = await axiosInstance.delete(
        `${API_ENDPOINT.deleteLeave(leaveId)}`,
      );

      dispatch(
        showNotification({
          message: data?.message,
          variant: 'success',
        }),
      );
      toggleDeleteModal();
      setQueryParameters({
        ...queryParameters,
        page: 1,
        limit: 10,
        sortOrder: -1,
      });

      await getMyLeavesData({ page: 1, sortOrder: -1 });
    } catch (error) {
      setLoading(false);
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

  const selectLeaveType = (leaveType: ValueLabelOption) => {
    const statusTypeValue =
      typeof queryParameters.status === 'string'
        ? queryParameters.status
        : queryParameters.status?.value;

    const DayLeaveTypeValue =
      typeof queryParameters.dayLeaveType === 'string'
        ? queryParameters.dayLeaveType
        : queryParameters.dayLeaveType?.value;

    setQueryParameters({
      ...queryParameters,
      leaveType: leaveType,
      page: 1,
    });
    getMyLeavesData({
      ...queryParameters,
      status: statusTypeValue,
      leaveType: leaveType.value,
      dayLeaveType: DayLeaveTypeValue,
      page: 1,
    });
  };

  const selectStatusType = (statusType: ValueLabelOption) => {
    const leaveTypeValue =
      typeof queryParameters.leaveType === 'string'
        ? queryParameters.leaveType
        : queryParameters.leaveType?.value;

    const DayLeaveTypeValue =
      typeof queryParameters.dayLeaveType === 'string'
        ? queryParameters.dayLeaveType
        : queryParameters.dayLeaveType?.value;

    setQueryParameters({
      ...queryParameters,
      status: statusType,
      page: 1,
    });
    getMyLeavesData({
      ...queryParameters,
      status: statusType.value,
      leaveType: leaveTypeValue,
      dayLeaveType: DayLeaveTypeValue,
      page: 1,
    });
  };

  const selectDayLeaveType = (dayLeaveType: ValueLabelOption) => {
    const leaveTypeValue =
      typeof queryParameters.leaveType === 'string'
        ? queryParameters.leaveType
        : queryParameters.leaveType?.value;

    const statusTypeValue =
      typeof queryParameters.status === 'string'
        ? queryParameters.status
        : queryParameters.status?.value;

    setQueryParameters({
      ...queryParameters,
      dayLeaveType: dayLeaveType,
      page: 1,
    });
    getMyLeavesData({
      ...queryParameters,
      status: statusTypeValue,
      leaveType: leaveTypeValue,
      dayLeaveType: dayLeaveType.value,
      page: 1,
    });
  };

  const refreshBtn = () => {
    setQueryParameters({
      ...queryParameters,
      status: null,
      leaveType: null,
      dayLeaveType: null,
      search: '',
      page: 1,
      sortOrder: -1,
    });
    getMyLeavesData({
      ...queryParameters,
      search: '',
      page: 1,
      sortOrder: -1,
      status: null,
      dayLeaveType: null,
      leaveType: null,
    });
  };

  return (
    <div className='container mx-auto'>
      <div className='flex flex-col justify-between'>
        <h2 className='text-2xl font-semibold'>Leaves</h2>
        <div className='flex flex-wrap'>
          <div className='sm: flex w-full gap-4 sm:flex-col md:w-fit lg:w-3/4'>
            <div className='flex w-full flex-col sm:flex-row md:gap-4'>
              <Select
                className='my-3 md:w-44'
                placeholder='Leave Type'
                value={queryParameters.leaveType}
                onChange={(value: ValueLabelOption | unknown) => {
                  selectLeaveType(value as ValueLabelOption);
                }}
                options={LeaveType}
              />
              <Select
                className='my-3 md:w-44'
                placeholder='Day Leave Type'
                value={queryParameters.dayLeaveType}
                onChange={(value: ValueLabelOption | unknown) => {
                  selectDayLeaveType(value as ValueLabelOption);
                }}
                options={DayTypeOptions}
              />
              <Select
                className='my-3'
                placeholder='Status'
                value={queryParameters.status}
                onChange={(value: ValueLabelOption | unknown) => {
                  selectStatusType(value as ValueLabelOption);
                }}
                options={StatusType}
              />
            </div>
          </div>
          <div className='my-2 flex w-full justify-end sm:w-1/2 md:w-fit md:w-full lg:w-1/4'>
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
            <Button onClick={() => toggleLeaveFormModal()}>Apply Leave</Button>
          </div>
        </div>
      </div>
      <List
        columns={[
          { id: 'fromDate', label: 'From' },
          { id: 'toDate', label: 'To' },
          { id: 'status', label: 'Status' },
          { id: 'leaveType', label: 'Leave Type' },
          { id: 'dayLeaveType', label: 'Day Leave Type' },
          { id: 'description', label: 'Description', fixed: true },
          { id: 'actions', label: 'Actions', fixed: true },
        ]}
        data={{
          data: leaveList,
          pageData: { total: total || 0 },
        }}
        meta={queryParameters}
        onMetaChange={handleMetaChange}
        removeWrapper
        hideSearch
        isStriped
        loading={loading}
        renderRow={(row: Leave) => {
          return (
            <TableRow key={row.id}>
              <TableCell>
                {row.fromDate ? formatDate(row.fromDate) : '-'}
              </TableCell>
              <TableCell>{row.toDate ? formatDate(row.toDate) : '-'}</TableCell>
              <TableCell>
                {row.status === Status.PENDING && (
                  <span className='text-orange-500'>
                    {toTitleCase(row.status)}
                  </span>
                )}
                {row.status === Status.APPROVED && (
                  <span className='text-green-500'>
                    {toTitleCase(row.status)}
                  </span>
                )}
                {row.status === Status.REJECTED && (
                  <span className='text-red-500'>
                    {toTitleCase(row.status)}
                  </span>
                )}
              </TableCell>
              <TableCell>{toTitleCase(row.leaveType)}</TableCell>
              <TableCell>
                {row.dayLeaveType
                  ? toTitleCase(
                      row.dayLeaveType
                        ?.toLowerCase()
                        .replace(/_/g, ' ')
                        .replace(/\b\w/g, (match: string) =>
                          match.toUpperCase(),
                        ),
                    )
                  : '-'}
              </TableCell>
              <TableCell className='max-w-16 break-words'>
                {row.description ? row.description : '-'}
              </TableCell>
              <TableCell>
                {row.status === Status.PENDING ? (
                  <div className='flex items-center gap-4'>
                    <Button
                      isIconOnly
                      color='default'
                      size='sm'
                      aria-label='Edit'
                      type='button'
                      variant='light'
                      onClick={() => {
                        handleEditButtonClick(row);
                      }}>
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
                        toggleDeleteModal(row.id);
                      }}>
                      <Tooltip content='Delete'>
                        <TrashIcon className='h-4 w-4' />
                      </Tooltip>
                    </Button>
                  </div>
                ) : (
                  '-'
                )}
              </TableCell>
            </TableRow>
          );
        }}
      />
      <PopupModal
        isOpen={showLeaveFormModal}
        header='Apply Leave'
        onOpenChange={toggleLeaveFormModal}>
        <LeaveForm
          handleClose={toggleLeaveFormModal}
          handleLeaveSubmit={onSubmit}
          defaultValues={defaultValues.current}
        />
      </PopupModal>
      <ConfirmationModal
        isOpen={showDeleteModal}
        message={CONFIRMATION_MESSAGES.LEAVE_DELETE}
        onClose={toggleDeleteModal}
        onConfirm={() => {
          deleteLeave();
        }}
      />
    </div>
  );
};

export default withAllowedRole(Leaves, AllRoles);
