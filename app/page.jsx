'use client';
import React, { useEffect, useRef, useState } from 'react';
import {
  API_ENDPOINT,
  CONFIRMATION_MESSAGES,
  menuType,
  subMenuType,
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
import { useAppDispatch, useAppSelector } from '@/redux/selector';
import axiosInstance from '@/utils/axios';
import { useRouter } from 'next/navigation';
import SearchBar from '@/components/common/SearchBar';
import ReceiptForm from '@/components/receipt/receiptForm';
import PopupModal from '@/components/common/PopupModal';
import {
  addReceipt,
  deleteReceipt,
  getReceiptList,
  updateReceipt,
} from '@/redux/receipt/receiptSlice';
import {
  findSingleSelectedValueLabelOption,
  generateOptions,
} from '@/utils/utils';

const ReceiptList = () => {
  const [showDeleteModal, setDeleteModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState(null);
  const dispatch = useAppDispatch();
  const defaultValues = useRef({
    id: null,
    name: '',
    description: '',
    price: '',
    menuType: null,
    subMenuType: null,
    photo: null,
  });

  const { listParameters, data, total, loading } = useAppSelector(
    (state) => state.receipt,
  );

  useEffect(() => {
    dispatch(getReceiptList({}));
  }, []);

  const handleMetaChange = (meta) => {
    dispatch(
      getReceiptList({
        ...meta,
        search: meta.search,
      }),
    );
  };

  const refreshBtn = () => {
    dispatch(getReceiptList({}));
  };

  const handleEditButtonClick = async (row) => {
    defaultValues.current = {
      id: row._id,
      name: row.receipt_Name,
      description: row.description,
      price: row.price,
      menuType: findSingleSelectedValueLabelOption(
        generateOptions(menuType, 'id', 'type'),
        row.type,
      ),
      subMenuType: findSingleSelectedValueLabelOption(
        generateOptions(subMenuType, 'id', 'type'),
        row.sub_type,
      ),
      photo: row.photo.slice(89),
    };

    setShowModal((prev) => !prev);
  };

  const toggleDeleteModal = (id) => {
    setId(id);
    setDeleteModal((prev) => !prev);
  };

  const handleSearch = (searchQuery) => {
    handleMetaChange({
      ...listParameters,
      search: searchQuery,
      page: 1,
    });
  };

  const toggleReciptFormModal = () => {
    defaultValues.current = {
      id: null,
      name: '',
      description: '',
      price: '',
      menuType: null,
      subMenuType: null,
      photo: null,
    };
    setShowModal((prev) => !prev);
  };

  const handleDelete = async () => {
    try {
      dispatch(deleteReceipt({ id }));
      dispatch(getReceiptList({ ...listParameters, search: '', page: 1 }));
    } catch (error) {
      console.log(error);
    }
    setId(null);
    toggleDeleteModal();
  };

  const onSubmit = async (receiptData) => {
    console.log(receiptData);

    const payload = [
      {
        receipt_Name: receiptData.name,
        description: receiptData.description,
        price: receiptData.price,
        type: receiptData.menuType.value,
        sub_type: receiptData.subMenuType.value,
      },
      {
        photo: receiptData.photo,
      },
    ];

    try {
      if (!defaultValues.current.id) {
        const data = await dispatch(addReceipt(payload));
        if (data) {
          dispatch(getReceiptList({ ...listParameters, search: '', page: 1 }));
        }
      } else {
        const data = await dispatch(
          updateReceipt({ id: defaultValues.current.id, payload: payload }),
        );
        if (data) {
          dispatch(getReceiptList({ ...listParameters, search: '', page: 1 }));
        }
      }
    } catch (error) {
      console.log(error);
    }

    toggleReciptFormModal();
  };

  return (
    <>
      <div className='container mx-auto'>
        <div className='flex flex-col justify-between'>
          <h2 className='text-2xl font-semibold'>Receipt List </h2>
          <div className='flex flex-wrap'>
            <div className='sm: flex w-full gap-4 sm:flex-col md:w-fit lg:w-3/4'>
              <div className='flex w-full flex-col sm:flex-row md:gap-4'>
                <SearchBar
                  type='text'
                  placeholder='Search'
                  className='my-3 max-w-md md:w-50'
                  value={listParameters.search || ''}
                  onChange={handleSearch}
                />
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
                  toggleReciptFormModal();
                }}>
                Add
              </Button>
            </div>
          </div>
        </div>
        <List
          columns={[
            { id: 'receipt_Name', label: 'Receipt Name' },
            {
              id: 'description',
              label: 'Description',
            },
            { id: 'price', label: 'Price' },
            { id: 'type', label: 'Menu Type' },
            { id: 'sub_type', label: 'Sub Menu Type' },
            { id: 'actions', label: 'Actions', fixed: true },
          ]}
          data={{
            data: data.length > 0 ? data : [],
            pageData: { total: total || 0 },
          }}
          meta={listParameters}
          onMetaChange={handleMetaChange}
          removeWrapper
          isStriped
          hideSearch={true}
          loading={loading}
          renderRow={(row) => {
            return (
              <TableRow key={row.id}>
                <TableCell>{row.receipt_Name}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell>{row.type ? row.type : '-'}</TableCell>
                <TableCell>{row.sub_type ? row.sub_type : '-'}</TableCell>
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
                        toggleDeleteModal(row._id);
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
      <PopupModal
        isOpen={showModal}
        header={defaultValues.current.id ? 'Update Recipt' : 'Add Receipt'}
        onOpenChange={toggleReciptFormModal}>
        <ReceiptForm
          handleClose={toggleReciptFormModal}
          handleReceiptSubmit={onSubmit}
          defaultValues={defaultValues.current}
        />
      </PopupModal>
      <ConfirmationModal
        isOpen={showDeleteModal}
        message={CONFIRMATION_MESSAGES.RECEIPT_DELETE}
        onClose={toggleDeleteModal}
        onConfirm={() => {
          handleDelete();
        }}
      />
    </>
  );
};

export default ReceiptList;
