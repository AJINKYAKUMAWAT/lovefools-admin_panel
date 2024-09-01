'use client';
import { List } from '@/components/common/list/List';
import {
  API_ENDPOINT,
  ATTENDANCE,
  AllRoles,
  CheckInStatus,
  ERROR_MESSAGES,
  MonthsOptions,
  OfficeLocationType,
  OfficeLocations,
} from '@/utils/constant';
import withAllowedRole from '@/hoc/withAllowedRole';
import { useEffect, useRef, useState } from 'react';
import Button from '@/components/common/Button';
import {
  convertToDD_MM_YYYY_HHMMSS,
  formatDateTime,
  formatDateTimeConvert,
} from '@/utils/formatTime';
import { TableCell, TableRow, Tooltip } from '@nextui-org/react';
import { ArrowPathIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import axiosInstance from '@/utils/axios';
import { AxiosError } from 'axios';
import Select from '@/components/common/Select';
import {
  AttendanceListParameters,
  AttendanceList,
  AttendanceCheckoutRequestInput,
} from '@/types/attendance';
import { ValueLabelOption } from '@/types/component/common/select';
import { useAppDispatch } from '@/redux/selector';
import { showNotification } from '@/redux/notification/notification-slice';
import PopupModal from '@/components/common/PopupModal';
import AttendanceForm from '@/components/my-attendance/AttendanceForm';
import { CustomError } from '@/types/errorMessage';
import {
  findSingleSelectedValueLabelOption,
  getDaysInMonth,
  toTitleCase,
} from '@/utils/utils';
const MyAttendance = () => {
  const dispatch = useAppDispatch();
  const [allPendingCheckouts, setAllPendingCheckouts] = useState<
    AttendanceList[]
  >([]);
  const [days, setDays] = useState<ValueLabelOption[]>();
  const [total, setTotal] = useState<number>(0);
  const [showCheckoutRequestModal, setshowCheckoutRequestModal] =
    useState<boolean>(false);
  const currMonth = new Date().getMonth();

  const [queryParameters, setQueryParameters] =
    useState<AttendanceListParameters>({
      search: '',
      page: 1,
      limit: 10,
      sortBy: 'id',
      sortOrder: -1,
    });
  const [loading, setLoading] = useState<boolean>(false);

  const defaultValues = useRef<AttendanceCheckoutRequestInput>({
    id: null,
    checkIn: null,
    checkInOfficeType: '',
    checkOut: null,
    checkOutOfficeType: '',
    checkInLocationSelect: null,
    checkInLocationText: '',
    checkOutLocationSelect: null,
    checkOutLocationText: '',
  });

  const getAllAttendance = async (
    queryParameters?: Partial<AttendanceListParameters>,
  ) => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get(
        API_ENDPOINT.GET_ALL_MY_ATTENDANCE,
        {
          params: { ...queryParameters },
        },
      );
      setAllPendingCheckouts(data.data || []);
      setTotal(data.pageData?.total ?? 0);
      setLoading(false);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setLoading(false);
        setAllPendingCheckouts([]);
        setTotal(0);
      } else {
        setLoading(false);
        setTotal(0);
        setAllPendingCheckouts([]);
      }
    }
  };

  useEffect(() => {
    const response = getDaysInMonth(String(MonthsOptions[currMonth].value));
    setDays(response);
    getAllAttendance({
      ...queryParameters,
      month: MonthsOptions[currMonth].value,
    });
    setQueryParameters({ ...queryParameters, month: MonthsOptions[currMonth] });
  }, []);

  const handleMetaChange = (meta: AttendanceListParameters) => {
    const monthType =
      typeof meta.month === 'string' ? meta.month : meta.month?.value;

    const dateType =
      typeof meta.date === 'string' ? meta.date : meta.date?.value;

    const response = getDaysInMonth(String(monthType));
    setDays(response);

    setQueryParameters({
      ...queryParameters,
      search: meta.search,
      page: meta.page,
      sortBy: meta.sortBy,
      sortOrder: meta.sortOrder,
      month: meta.month,
      date: meta.date,
    });

    getAllAttendance({
      ...queryParameters,
      page: meta.page,
      limit: 10,
      search: meta.search,
      sortBy: meta.sortBy,
      sortOrder: meta.sortOrder,
      month: monthType,
      date: dateType,
    });
  };

  const selectMonthType = (monthType: ValueLabelOption) => {
    handleMetaChange({
      ...queryParameters,
      month: monthType,
      page: 1,
    });
  };

  const refreshBtn = () => {
    const response = getDaysInMonth(String(MonthsOptions[currMonth].value));
    setDays(response);
    setQueryParameters({
      ...queryParameters,
      page: 1,
      sortBy: 'id',
      search: '',
      month: MonthsOptions[currMonth],
      date: null,
    });
    getAllAttendance({
      ...queryParameters,
      page: 1,
      sortBy: 'id',
      search: '',
      month: MonthsOptions[currMonth].value,
      date: null,
    });
  };

  const toggleCheckoutRequestModal = () => {
    setshowCheckoutRequestModal((prevState) => !prevState);
    defaultValues.current = {
      id: null,
      checkIn: null,
      checkInOfficeType: '',
      checkOut: null,
      checkOutOfficeType: '',
      checkInLocationSelect: null,
      checkInLocationText: '',
      checkOutLocationSelect: null,
      checkOutLocationText: '',
    };
  };

  const handleEditButtonClick = (attendanceData: AttendanceList) => {
    const checkInLocationText =
      attendanceData.checkInOfficeType === OfficeLocationType.ON_SITE
        ? attendanceData.checkInLocation
        : '';

    const checkOutLocationText =
      attendanceData.checkOutOfficeType === OfficeLocationType.ON_SITE
        ? attendanceData.checkOutLocation
        : '';

    const checkInLocationSelect =
      attendanceData.checkInOfficeType === OfficeLocationType.OFFICE
        ? findSingleSelectedValueLabelOption(
            OfficeLocations,
            attendanceData.checkInLocation,
          )
        : null;

    const checkOutLocationSelect =
      attendanceData.checkOutOfficeType === OfficeLocationType.OFFICE
        ? findSingleSelectedValueLabelOption(
            OfficeLocations,
            attendanceData.checkOutLocation,
          )
        : null;

    toggleCheckoutRequestModal();

    defaultValues.current = {
      id: attendanceData.id,
      checkIn: attendanceData.checkIn
        ? formatDateTimeConvert(attendanceData.checkIn.toString())
        : null,
      checkInOfficeType:
        attendanceData.checkInOfficeType ?? attendanceData.checkInOfficeType,
      checkOut: attendanceData.checkOut
        ? formatDateTimeConvert(attendanceData.checkOut.toString())
        : null,
      checkOutOfficeType:
        attendanceData.checkOutOfficeType ?? attendanceData.checkOutOfficeType,
      checkInLocationSelect: checkInLocationSelect,
      checkInLocationText: checkInLocationText,
      checkOutLocationSelect: checkOutLocationSelect,
      checkOutLocationText: checkOutLocationText,
    };
  };

  const onSubmit = async (attendanceData: AttendanceCheckoutRequestInput) => {
    const checkInLocationSelect =
      typeof attendanceData.checkInLocationSelect === 'string'
        ? attendanceData.checkInLocationSelect
        : attendanceData.checkInLocationSelect?.label;

    const checkOutLocationSelect =
      typeof attendanceData.checkOutLocationSelect === 'string'
        ? attendanceData.checkOutLocationSelect
        : attendanceData.checkOutLocationSelect?.label;

    const checkInLocationText =
      typeof attendanceData.checkInLocationText === 'string'
        ? attendanceData.checkInLocationText
        : attendanceData.checkInLocationText?.label;

    const checkOutLocationText =
      typeof attendanceData.checkOutLocationText === 'string'
        ? attendanceData.checkOutLocationText
        : attendanceData.checkOutLocationText?.label;

    const RequestData = {
      checkIn: attendanceData.checkIn
        ? convertToDD_MM_YYYY_HHMMSS(attendanceData.checkIn.toString())
        : null,
      checkOut: attendanceData.checkOut
        ? convertToDD_MM_YYYY_HHMMSS(attendanceData.checkOut.toString())
        : null,
      checkInOfficeType: attendanceData.checkInOfficeType ?? null,
      checkInLocation: checkInLocationSelect
        ? checkInLocationSelect
        : checkInLocationText,
      checkOutOfficeType: attendanceData.checkOutOfficeType ?? null,
      checkOutLocation: checkOutLocationSelect
        ? checkOutLocationSelect
        : checkOutLocationText,
    };

    try {
      if (attendanceData.id) {
        await axiosInstance.patch(
          `${API_ENDPOINT.RequestMissedCheckoutUpdate(attendanceData.id)}`,
          RequestData,
        );
      } else {
        await axiosInstance.post(
          `${API_ENDPOINT.RequestMissedCheckout}`,
          RequestData,
        );
      }
      dispatch(
        showNotification({
          message: !attendanceData.id
            ? ATTENDANCE.CHECKOUT_REQUEST_APPLY_SUCCESS
            : ATTENDANCE.CHECKOUT_REQUEST_UPDATED_SUCCESS,
          variant: 'success',
        }),
      );

      setQueryParameters({
        ...queryParameters,
        page: 1,
        limit: 10,
        sortOrder: -1,
      });

      await getAllAttendance({ page: 1, sortOrder: -1 });
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
        errorMessage = error as CustomError;
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

    toggleCheckoutRequestModal();
  };

  const selectDays = (day: ValueLabelOption) => {
    handleMetaChange({
      ...queryParameters,
      date: day,
      page: 1,
    });
  };

  return (
    <div className='container mx-auto'>
      <div className='flex flex-col justify-between'>
        <h2 className='text-2xl font-semibold'>Attendance</h2>
        <div className='flex flex-wrap'>
          <div className='sm: flex w-full gap-4 sm:flex-col md:w-fit lg:w-3/4'>
            <div className='flex w-full flex-col sm:flex-row md:gap-4'>
              <Select
                className='my-3 md:w-44'
                name='month'
                placeholder='Month'
                value={queryParameters.month}
                onChange={(value: ValueLabelOption | unknown) => {
                  selectMonthType(value as ValueLabelOption);
                }}
                options={MonthsOptions}
              />
              <Select
                className='my-3 md:w-44'
                name='days'
                placeholder='Days'
                value={queryParameters.date}
                onChange={(value: ValueLabelOption | unknown) => {
                  selectDays(value as ValueLabelOption);
                }}
                options={days}
              />
            </div>
          </div>
          <div className='my-2 flex w-full justify-end space-x-2 sm:w-1/2 md:w-fit md:w-full lg:w-1/4'>
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
              className='relative '
              onClick={() => toggleCheckoutRequestModal()}>
              Apply
            </Button>
          </div>
        </div>
      </div>
      <List
        columns={[
          { id: 'Users', label: 'Name', fixed: true },
          { id: 'checkIn', label: 'Check In' },
          { id: 'checkOut', label: 'Check Out' },
          { id: 'checkInLocation', label: 'Check In Location' },
          { id: 'checkOutLocation', label: 'Check Out Location' },
          { id: 'checkInOfficeType', label: 'Check In Office Type' },
          { id: 'checkOutOfficeType', label: 'Check Out Office Type' },
          { id: 'hours', label: 'Hours' },
          { id: 'date', label: 'Date', fixed: true },
          { id: 'Actions', label: 'Actions', fixed: true },
        ]}
        data={{
          data: allPendingCheckouts,
          pageData: { total: total || 0 },
        }}
        meta={queryParameters}
        onMetaChange={handleMetaChange}
        removeWrapper
        hideSearch
        isStriped
        loading={loading}
        renderRow={(row: AttendanceList) => {
          return (
            <TableRow key={row.id}>
              <TableCell>{row.Users ? row.Users.fullName : ''}</TableCell>
              <TableCell>
                {row.checkIn ? formatDateTime(row.checkIn) : '-'}
              </TableCell>
              <TableCell className='max-w-16 break-words'>
                {row.checkOut ? formatDateTime(row.checkOut) : '-'}
              </TableCell>
              <TableCell className='max-w-16 break-words'>
                {row.checkInLocation ?? '-'}
              </TableCell>
              <TableCell className='max-w-16 break-words'>
                {row.checkOutLocation ?? '-'}
              </TableCell>
              <TableCell className='max-w-16 break-words'>
                {toTitleCase(
                  row.checkInOfficeType
                    ?.toLowerCase()
                    .replace(/_/g, ' ')
                    .replace(/\b\w/g, (match: string) => match.toUpperCase()),
                ) ?? '-'}
              </TableCell>
              <TableCell>
                {toTitleCase(
                  row.checkOutOfficeType
                    ?.toLowerCase()
                    .replace(/_/g, ' ')
                    .replace(/\b\w/g, (match: string) => match.toUpperCase()),
                ) ?? '-'}
              </TableCell>
              <TableCell>{row.hours ?? '-'}</TableCell>
              <TableCell>
                {row.date + '-' + toTitleCase(row.month) + '-' + row.year ??
                  '-'}
              </TableCell>
              <TableCell>
                {row.status === CheckInStatus.PENDING ? (
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
                ) : (
                  '-'
                )}
              </TableCell>
            </TableRow>
          );
        }}
      />

      <PopupModal
        isOpen={showCheckoutRequestModal}
        header={
          defaultValues.current.id
            ? 'Update chekout request'
            : 'Apply checkout request'
        }
        onOpenChange={toggleCheckoutRequestModal}>
        <AttendanceForm
          handleClose={toggleCheckoutRequestModal}
          handleAttendanceSubmit={onSubmit}
          defaultValues={defaultValues.current}
        />
      </PopupModal>
    </div>
  );
};

export default withAllowedRole(MyAttendance, AllRoles);
