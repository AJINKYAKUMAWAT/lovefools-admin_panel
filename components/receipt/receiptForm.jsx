'use client';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ControllerTextField from '@/components/common/ControllerTextField';
import Button from '@/components/common/Button';
import FormProvider from '@/components/common/FormProvider';
import { reciptSchema } from '@/schema/receipt/receipt';
import ControllerTextArea from '../common/ControllerTextArea';
import { convertTimeObjectToString, generateOptions } from '@/utils/utils';
import { menuType, NEXT_PUBLIC_API_URL, subMenuType } from '@/utils/constant';
import {
  ArrowUpTrayIcon,
  EyeIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import ControllerSelect from '../common/ControllerSelect';
import { Tooltip } from '@nextui-org/react';
import ControllerDateTimePicker from '../common/ControllerDateTimePicker';
import ControllerDatePicker from '../common/ControllerDatePicker';
import { getMenuList } from '@/redux/menu-list/menuListSlice';
import { useAppDispatch, useAppSelector } from '@/redux/selector';
import axios from 'axios';
import { getFloorList } from '@/redux/floor-list/floorListSlice';
import { getRoomList } from '@/redux/room-list/roomSlice';
import { getTableList } from '@/redux/table-list/tableListSlice';

const ReceiptForm = ({ handleReceiptSubmit, handleClose, defaultValues }) => {
  const methods = useForm({
    resolver: yupResolver(reciptSchema),
    defaultValues,
    mode: 'onBlur',
  });
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.menuList);
  const [tableList, setTableList] = useState([]);

  useEffect(() => {
    dispatch(getMenuList({}));
  }, []);

  const [fileName, setfileName] = useState(defaultValues.photo);
  const updateFileName = (name) => {
    setfileName(name);
  };

  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
    getValues,
    watch,
  } = methods;

  const floorList = useAppSelector((state) => state.floorList);

  const roomList = useAppSelector((state) => state.roomList);

  const getAllTables = useAppSelector((state) => state.tableList);

  const getTables = async () => {
    const Time = convertTimeObjectToString(watch('time'));
    const adjustedDate = new Date(watch('date')).toISOString();

    try {
      // Fetch booking data from the API
      const response = await axios.post(`${NEXT_PUBLIC_API_URL}getBookList`, {
        date: adjustedDate,
        time: Time,
      });

      const bookedTables = response.data?.available || []; // Adjust as per API structure

      console.log('All Tables:', getAllTables.data);
      console.log('Booked Tables:', bookedTables);
      const filteredData = bookedTables.filter((table) => {
        // Check if the table is NOT booked
        const isBooked = getAllTables.data.some(
          (booked) => String(booked._id) === String(table._id),
        );
        console.log(`Table ${table._id} is booked:`, isBooked);
        return isBooked; // Include only tables that are NOT booked
      });

      console.log('Filtered Data:', filteredData);

      // Set the filtered tables
      setTableList(filteredData);
    } catch (error) {
      console.error('Error fetching tables:', error);
    }
  };

  useEffect(() => {
    if (watch('floor')) {
      dispatch(getRoomList({ floor_id: watch('floor').value }));
    }
  }, [watch('floor')]);

  useEffect(() => {
    if (watch('room')) {
      dispatch(
        getTableList({
          floor_id: watch('room').value,
          room_id: watch('floor').value,
        }),
      );
      getTables();
    }
  }, [watch('room')]);

  useEffect(() => {
    if (watch('date') && watch('time')) {
      dispatch(getFloorList({}));
    }
  }, [watch('date'), watch('time')]);

  const onSubmit = async (data) => {
    console.log('data', data);

    handleReceiptSubmit(data);
  };

  const handleImageUpload = async (name, event) => {
    const { files } = event.target;

    const selectedFile = files && files.length ? files[0] : '';
    if (selectedFile) {
      try {
        const formData = new FormData();
        formData.append('file', selectedFile);
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        };

        // const { data } = await axiosInstance.post(
        //   `${API_ENDPOINT.IMAGE_UPLOAD}?fileType=${ImageUpload.DOCUMENTS}`,
        //   formData,
        //   config,
        // );

        console.log('selectedFile', selectedFile);

        setValue(name, selectedFile);
        clearErrors(name);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <FormProvider
      methods={methods}
      onSubmit={handleSubmit(onSubmit)}>
      <div className='container mx-auto'>
        <div className='grid gap-4'>
          <div className='grid gap-4'>
            <ControllerTextField
              type='text'
              placeholder='Enter email id '
              name='email'
              label='Email'
            />
          </div>
          <div className='grid gap-4'>
            <ControllerTextField
              type='text'
              placeholder='Enter mobile no. '
              name='mobile'
              label='Mobile No.'
            />
          </div>
          <div className='grid gap-4'>
            <ControllerSelect
              options={generateOptions(data, '_id', 'menu_Name')}
              placeholder='Enter receipt name '
              name='receiptName'
              label='Receipt name'
            />
          </div>
          <div className='grid gap-4'>
            <ControllerDatePicker
              placeholder='Enter Date '
              name='date'
              label='Date'
            />
          </div>{' '}
          <div className='grid gap-4'>
            <ControllerDateTimePicker
              name='time'
              label='Time'
            />
          </div>
          <div className='grid gap-4'>
            <ControllerTextField
              type='text'
              placeholder='Enter Price '
              name='price'
              label='Price'
            />
          </div>
          <div className='grid gap-4'>
            <ControllerSelect
              name='menuType'
              placeholder='Select menu type'
              options={generateOptions(menuType, 'id', 'type')}
              label='Type'
            />
          </div>
          <div className='grid gap-4'>
            <ControllerSelect
              name='subMenuType'
              placeholder='Select sub menu type'
              options={generateOptions(subMenuType, 'id', 'type')}
              label='Sub Type'
            />
          </div>
          <div className='grid gap-4'>
            <ControllerSelect
              name='floor'
              placeholder='Select floor'
              options={generateOptions(floorList.data, '_id', 'floor_name')}
              label='Floor'
            />
          </div>
          <div className='grid gap-4'>
            <ControllerSelect
              name='room'
              placeholder='Select room'
              options={generateOptions(roomList.data, '_id', 'room_name')}
              label='Room'
            />
          </div>
          <div className='grid gap-4'>
            <ControllerSelect
              name='table_number'
              placeholder='Select table number'
              options={generateOptions(tableList, '_id', 'table_number')}
              label='Table Number'
            />
          </div>
          <div className='flex justify-end space-x-4'>
            <Button
              type='button'
              variant='bordered'
              onClick={handleClose}>
              Cancel
            </Button>
            <Button type='submit'>{defaultValues.id ? 'Update' : 'Add'}</Button>
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default ReceiptForm;
