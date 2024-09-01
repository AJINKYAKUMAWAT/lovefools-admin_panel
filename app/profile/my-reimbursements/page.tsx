'use client';
import { List } from '@/components/common/list/List';
import {
  API_ENDPOINT,
  AllRoles,
  CONFIRMATION_MESSAGES,
  ERROR_MESSAGES,
  MonthsOptions,
  REIMBURSEMENT_MESSAGES,
  Status,
  StatusType,
} from '@/utils/constant';
import withAllowedRole from '@/hoc/withAllowedRole';
import { TableCell, TableRow, Tooltip } from '@nextui-org/react';
import { useEffect, useRef, useState } from 'react';
import Button from '@/components/common/Button';
import PopupModal from '@/components/common/PopupModal';
import ConfirmationModal from '@/components/common/ConfirmationModal';
import {
  ReimbursementData,
  ReimbursementInputData,
  ReimbursementListParameters,
} from '@/types/reimbursement';
import {
  ArrowDownTrayIcon,
  ArrowPathIcon,
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import axiosInstance from '@/utils/axios';
import { useAppDispatch } from '@/redux/selector';
import { showNotification } from '@/redux/notification/notification-slice';
import { AxiosError } from 'axios';
import {
  downloadFile,
  formatCurrency,
  formatInput,
  getFileDetailsFromUrl,
  toTitleCase,
} from '@/utils/utils';
import ReimbursementForm from '@/components/reimbursement/ReimbursementForm';
import { formatDate } from '@/utils/formatTime';
import SearchBar from '@/components/common/SearchBar';
import Select from '@/components/common/Select';
import { ValueLabelOption } from '@/types/component/common/select';
import { usePopupManager } from '@/providers/PopupManager';

const UserReimbursements = () => {
  const [reimbursementListData, setReimbursementListData] = useState([]);
  const [showReimbursementFormModal, setShowReimbursementFormModal] =
    useState(false);
  const [id, setId] = useState('');
  const [showDeleteModal, setDeleteModal] = useState(false);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [totalAmount, setTotalamount] = useState<number>();
  const [queryParameters, setQueryParameters] =
    useState<ReimbursementListParameters>({
      page: 1,
      limit: 10,
      sortBy: 'id',
      sortOrder: -1,
    });

  const dispatch = useAppDispatch();
  const { showDocumentPreview, hidePopup } = usePopupManager();

  useEffect(() => {
    getAllReimbursements(queryParameters);
    return () => {
      hidePopup();
    };
  }, []);

  const defaultValues = useRef<ReimbursementInputData>({
    id: null,
    paymentType: '',
    amount: '',
    description: '',
    bill: null,
  });

  const handleMetaChange = (meta: ReimbursementListParameters) => {
    const statusValue =
      typeof meta.status === 'string' ? meta.status : meta.status?.value;

    const monthValue =
      typeof meta.month === 'string' ? meta.month : meta.month?.value;

    setQueryParameters({
      ...queryParameters,
      page: meta.page,
      limit: 10,
      sortBy: meta.sortBy,
      sortOrder: meta.sortOrder,
      search: meta.search,
      status: meta?.status ? meta?.status : null,
    });

    getAllReimbursements({
      page: meta.page,
      limit: 10,
      sortBy: meta.sortBy,
      sortOrder: meta.sortOrder,
      search: meta.search,
      status: statusValue,
      month: monthValue,
    });
  };

  const getAllReimbursements = async (
    queryParameters?: Partial<ReimbursementListParameters>,
  ) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        API_ENDPOINT.GET_USER_REIMBURSEMENT,
        {
          params: queryParameters,
        },
      );
      setReimbursementListData(response?.data?.data?.data);
      setTotalamount(response?.data?.data?.totalAmount);
      setTotal(response?.data?.pageData?.total), setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const toggleReimbursementFormModal = () => {
    defaultValues.current = {
      id: null,
      paymentType: '',
      amount: '',
      description: '',
      bill: null,
    };

    setShowReimbursementFormModal((prevState) => !prevState);
  };

  const handleEditButtonClick = async (
    reimbursementData: ReimbursementData,
  ) => {
    setShowReimbursementFormModal((prevState) => !prevState);
    const amount = reimbursementData.amount
      ? String(reimbursementData.amount)
      : '';

    if (reimbursementData?.id) {
      defaultValues.current = {
        id: String(reimbursementData.id),
        paymentType: reimbursementData.paymentType,
        description: reimbursementData.description,
        amount: formatInput(amount),
        bill: reimbursementData.bill ? reimbursementData.bill : null,
      };
    }
  };
  const toggleDeleteModal = (id?: string) => {
    if (id) {
      setId(id);
    }
    setDeleteModal((prev) => !prev);
  };

  const onSubmit = async (transactionData: ReimbursementInputData) => {
    const amount = transactionData.amount.replaceAll(',', '');

    const payload = {
      paymentType: transactionData.paymentType,
      amount: Number(amount),
      bill: transactionData.bill ? transactionData.bill : null,
      description: transactionData.description,
    };
    setIsFormSubmitted(true);
    try {
      if (defaultValues.current.id) {
        await axiosInstance.patch(
          API_ENDPOINT.updateReimbursement(defaultValues.current.id),
          { ...payload },
        );
      } else {
        await axiosInstance.post(API_ENDPOINT.CREATE_REIMBURSEMENT, {
          ...payload,
        });
      }
      setIsFormSubmitted(false);
      dispatch(
        showNotification({
          message: !defaultValues.current.id
            ? REIMBURSEMENT_MESSAGES.REIMBURSEMENT_CREATE_SUCCESS
            : REIMBURSEMENT_MESSAGES.REIMBURSEMENT_UPDATE_SUCCESS,
          variant: 'success',
        }),
      );
      getAllReimbursements({ ...queryParameters, page: 1 });
    } catch (error) {
      if (error instanceof AxiosError) {
        dispatch(
          showNotification({
            message: error?.message,
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
      setIsFormSubmitted(false);
    }
    toggleReimbursementFormModal();
  };

  const deleteReimbursement = async () => {
    try {
      await axiosInstance.delete(API_ENDPOINT.deleteReimbursement(id));

      dispatch(
        showNotification({
          message: REIMBURSEMENT_MESSAGES.REIMBURSEMENT_DELETE_SUCCESS,
          variant: 'success',
        }),
      );
      toggleDeleteModal();
      getAllReimbursements({ ...queryParameters, page: 1 });
    } catch (error) {
      if (error instanceof AxiosError) {
        dispatch(
          showNotification({
            message: error?.message,
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

  const downloadReceipt = async (billUrl: string) => {
    try {
      const response = await axiosInstance.get(API_ENDPOINT.GET_PRESIGNED_URL, {
        params: { key: billUrl },
      });
      const { fileName, fileExtension } = getFileDetailsFromUrl(billUrl);
      if (response.data && response.data.data) {
        await downloadFile(
          `${response.data.data}`,
          `${fileName}.${fileExtension}`,
        );
      } else {
        dispatch(
          showNotification({
            message: ERROR_MESSAGES.SOMETHING_WENT_WRONG,
            variant: 'error',
          }),
        );
      }
    } catch (error) {
      dispatch(
        showNotification({
          message: ERROR_MESSAGES.SOMETHING_WENT_WRONG,
          variant: 'error',
        }),
      );
    }
  };

  const handleSearch = (searchQuery: string) => {
    handleMetaChange({
      ...queryParameters,
      search: searchQuery,
      page: 1,
    });
  };

  const selectReimbursements = (staus: ValueLabelOption) => {
    handleMetaChange({
      ...queryParameters,
      status: staus,
      page: 1,
    });
  };

  const selectMonth = (month: ValueLabelOption) => {
    handleMetaChange({
      ...queryParameters,
      month: month,
      page: 1,
    });
  };
  const refreshBtn = () => {
    setQueryParameters({
      ...queryParameters,
      page: 1,
      limit: 10,
      sortBy: 'id',
      search: '',
      month: null,
      status: null,
    });
    getAllReimbursements({ ...queryParameters, sortBy: 'id', page: 1 });
  };

  const viewBill = (bill: string) => {
    showDocumentPreview({
      documentUrl: bill,
    });
  };

  return (
    <div className='container mx-auto'>
      <div className='flex flex-col justify-between'>
        <h2 className='text-2xl font-semibold'>Reimbursements</h2>
        <div className='flex flex-wrap'>
          <div className='flex w-full gap-4 sm:w-1/2 sm:flex-col'>
            <div className='flex w-full flex-col sm:flex-row md:gap-4'>
              <SearchBar
                type='text'
                placeholder='Search'
                className='my-3 max-w-md md:w-50'
                value={queryParameters.search || ''}
                onChange={handleSearch}
              />
              <Select
                className='my-3'
                placeholder='Status'
                value={queryParameters.status}
                onChange={(value: ValueLabelOption | unknown) => {
                  selectReimbursements(value as ValueLabelOption);
                }}
                options={StatusType}
              />
              <Select
                className='my-3 md:w-36'
                placeholder='Month'
                value={queryParameters.month}
                onChange={(value: ValueLabelOption | unknown) => {
                  selectMonth(value as ValueLabelOption);
                }}
                options={MonthsOptions}
              />
            </div>
          </div>

          <div className='my-2 flex w-full items-center justify-end sm:w-1/2'>
            <h2 className='font-semibold'>
              Total Amount :{' '}
              {totalAmount ? formatCurrency(String(totalAmount)) : 0}
            </h2>

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
            <Button onClick={() => toggleReimbursementFormModal()}>Add</Button>
          </div>
        </div>
      </div>
      <List
        columns={[
          { id: 'description', label: 'Description' },
          { id: 'amount', label: 'Amount' },
          { id: 'paymentType', label: 'Payment Type' },
          { id: 'status', label: 'Status' },
          { id: 'createdAt', label: 'Created At' },
          { id: 'actions', label: 'Actions', fixed: true },
        ]}
        data={{
          data: reimbursementListData,
          pageData: { total: total || 0 },
        }}
        meta={queryParameters}
        onMetaChange={handleMetaChange}
        removeWrapper
        hideSearch
        isStriped
        loading={loading}
        renderRow={(row: ReimbursementData) => {
          return (
            <TableRow key={row.id}>
              <TableCell className='max-w-16 break-words'>
                {row.description}
              </TableCell>
              <TableCell>
                {row.amount ? formatCurrency(row.amount) : ''}
              </TableCell>
              <TableCell>
                {row.paymentType ? toTitleCase(row.paymentType) : '-'}
              </TableCell>
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
              <TableCell>
                {row.createdAt ? formatDate(row.createdAt) : '-'}
              </TableCell>
              <TableCell>
                <div className='flex items-center gap-4'>
                  {row.status === Status.PENDING && (
                    <>
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
                          toggleDeleteModal(String(row.id));
                        }}>
                        <Tooltip content='Delete'>
                          <TrashIcon className='h-4 w-4' />
                        </Tooltip>
                      </Button>
                    </>
                  )}
                  {row?.bill !== '' && row?.bill !== null ? (
                    <>
                      <Button
                        isIconOnly
                        type='button'
                        variant='light'
                        color='default'>
                        <Tooltip content='View Bill'>
                          <EyeIcon
                            className='h-5 w-5'
                            onClick={() => {
                              viewBill(row?.bill);
                            }}
                          />
                        </Tooltip>
                      </Button>
                      <Button
                        isIconOnly
                        color='default'
                        size='sm'
                        aria-label='Edit'
                        type='button'
                        variant='light'>
                        <Tooltip content='Download Bill'>
                          <ArrowDownTrayIcon
                            onClick={() => {
                              downloadReceipt(row?.bill);
                            }}
                            className='h-5 w-5'
                          />
                        </Tooltip>
                      </Button>
                    </>
                  ) : (
                    '-'
                  )}
                </div>
              </TableCell>
            </TableRow>
          );
        }}
      />
      <PopupModal
        isOpen={showReimbursementFormModal}
        header={
          defaultValues.current.id
            ? 'Update Reimbursements'
            : 'Add Reimbursements'
        }
        onOpenChange={toggleReimbursementFormModal}>
        <ReimbursementForm
          handleClose={toggleReimbursementFormModal}
          handleTransactionSubmit={onSubmit}
          defaultValues={defaultValues.current}
          isLoading={isFormSubmitted}
        />
      </PopupModal>
      <ConfirmationModal
        isOpen={showDeleteModal}
        message={CONFIRMATION_MESSAGES.REIMBURSEMENT_DELETE}
        onClose={toggleDeleteModal}
        onConfirm={() => {
          deleteReimbursement();
        }}
      />
    </div>
  );
};

export default withAllowedRole(UserReimbursements, AllRoles);
