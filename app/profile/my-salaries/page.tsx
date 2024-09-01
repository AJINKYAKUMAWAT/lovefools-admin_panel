'use client';
import { List } from '@/components/common/list/List';
import { API_ENDPOINT, AllRoles, ERROR_MESSAGES } from '@/utils/constant';
import withAllowedRole from '@/hoc/withAllowedRole';
import { TableCell, TableRow, Tooltip } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { ListParameters } from '@/types/baseTypes';
import Button from '@/components/common/Button';
import {
  ArrowDownTrayIcon,
  ArrowPathIcon,
  EyeIcon,
} from '@heroicons/react/24/outline';
import axiosInstance from '@/utils/axios';
import { useAppDispatch } from '@/redux/selector';
import { showNotification } from '@/redux/notification/notification-slice';
import {
  downloadFile,
  getFileDetailsFromUrl,
  toTitleCase,
} from '@/utils/utils';
import { Salary, SalaryListParameters, SalarySlip } from '@/types/salary';
import { usePopupManager } from '@/providers/PopupManager';

const UserSalaries = () => {
  const [salaryListData, setSalaryListData] = useState<Salary[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [queryParameters, setQueryParameters] = useState<SalaryListParameters>({
    sortBy: '',
    sortOrder: -1,
  });

  const dispatch = useAppDispatch();
  const { showDocumentPreview, hidePopup } = usePopupManager();

  useEffect(() => {
    getAllSalaries({
      ...queryParameters,
    });
    return () => {
      hidePopup();
    };
  }, []);

  const handleMetaChange = (meta: ListParameters) => {
    setQueryParameters({
      ...queryParameters,
      page: meta.page,
      limit: 10,
      sortBy: meta.sortBy,
      sortOrder: meta.sortOrder,
    });
    getAllSalaries(meta);
  };

  const getAllSalaries = async (
    queryParameters?: Partial<SalaryListParameters>,
  ) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(API_ENDPOINT.GET_USER_SALARIES, {
        params: queryParameters,
      });
      setSalaryListData(response.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const downloadSalarySlip = async (slipUrl: string) => {
    try {
      const response = await axiosInstance.get(API_ENDPOINT.GET_PRESIGNED_URL, {
        params: { key: slipUrl },
      });
      const { fileName, fileExtension } = getFileDetailsFromUrl(slipUrl);
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

  const refreshBtn = () => {
    setQueryParameters({
      ...queryParameters,
      page: 1,
      limit: 10,
      sortBy: 'id',
    });
    getAllSalaries({ ...queryParameters, sortBy: 'id', page: 1 });
  };

  const viewSalarySlip = (fileUrl: string) => {
    showDocumentPreview({
      documentUrl: fileUrl,
    });
  };

  return (
    <div className='container mx-auto'>
      <div className='my-2 flex justify-between'>
        <h2 className='text-2xl font-semibold'>Salary Slip</h2>
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
      </div>
      <List
        columns={[
          { id: 'month', label: 'Month', fixed: true },
          { id: 'year', label: 'Year', fixed: true },
          { id: 'actions', label: 'Actions', fixed: true },
        ]}
        data={{
          data: salaryListData[0]?.SalarySlip || [],
          pageData: { total: 0 },
        }}
        meta={queryParameters}
        onMetaChange={handleMetaChange}
        removeWrapper
        hideSearch
        isStriped
        loading={loading}
        pagination={false}
        renderRow={(row: SalarySlip) => {
          return (
            <TableRow key={row.month}>
              <TableCell>{toTitleCase(row?.month)}</TableCell>
              <TableCell>{row?.year}</TableCell>
              <TableCell>
                <div className='flex items-center gap-4'>
                  {row?.salarySlip !== '' && (
                    <Button
                      isIconOnly
                      color='default'
                      size='sm'
                      aria-label='Preview Salaryslip'
                      type='button'
                      variant='light'>
                      <Tooltip content='Preview Salary Slip'>
                        <EyeIcon
                          onClick={() => {
                            if (row.salarySlip && row.salarySlip !== '') {
                              viewSalarySlip(row.salarySlip);
                            }
                          }}
                          className='h-5 w-5'
                        />
                      </Tooltip>
                    </Button>
                  )}
                  {row?.salarySlip !== '' ? (
                    <Button
                      isIconOnly
                      color='default'
                      size='sm'
                      aria-label='Download Salaryslip'
                      type='button'
                      variant='light'>
                      <Tooltip content='Download Salary Slip'>
                        <ArrowDownTrayIcon
                          onClick={() => {
                            if (row.salarySlip && row.salarySlip !== '') {
                              downloadSalarySlip(row.salarySlip);
                            }
                          }}
                          className='h-5 w-5'
                        />
                      </Tooltip>
                    </Button>
                  ) : (
                    '-'
                  )}
                </div>
              </TableCell>
            </TableRow>
          );
        }}
      />
    </div>
  );
};

export default withAllowedRole(UserSalaries, AllRoles);
