/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  GroupedOptions,
  ValueLabelOption,
} from '@/types/component/common/select';
import { FileDetails } from '@/types/component/common/documentViewer';
import axios from 'axios';
import axiosInstance from './axios';
import { MonthsOptions, Roles } from './constant';
import { datepickerFormatDate } from './formatTime';

interface CustomError extends Error {
  name: string;
  message: string;
}

interface Role {
  id: number;
  roleName: string;
}

export const numberWithCommas = (x: number) => {
  return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const findSelectedValueLabelOptions = (
  options: ValueLabelOption[] | GroupedOptions[] = [],
  selectedValues: string[] = [],
): ValueLabelOption[] => {
  const selectedOptions: ValueLabelOption[] = [];
  options?.forEach((option) => {
    if ('options' in option) {
      const selectedGroupOptions = option.options.filter((item) =>
        selectedValues.includes(item.value),
      );
      selectedOptions.push(...selectedGroupOptions);
    } else {
      if (selectedValues.includes(option.value)) {
        selectedOptions.push(option);
      }
    }
  });

  return selectedOptions;
};

export function getDaysInMonth(monthName: string): ValueLabelOption[] {
  const monthIndex = MonthsOptions.findIndex(
    (month) => month.value === monthName.toUpperCase(),
  );

  if (monthIndex === -1) {
    // throw new Error('Invalid month name');
    return [];
  }

  const now = new Date();
  const currentYear = now.getFullYear();

  const daysInMonth = new Date(currentYear, monthIndex + 1, 0).getDate();

  const dateOptions: ValueLabelOption[] = [];
  for (let day = 1; day <= daysInMonth; day++) {
    dateOptions.push({ value: String(day), label: String(day) });
  }

  return dateOptions;
}

export const exportData = async (
  api: string,
  name: string,
  handleError: (error: CustomError) => void,
) => {
  try {
    const response = await axiosInstance.get(api, {
      responseType: 'blob', // Set the response type to blob
    });

    // Check if response is valid
    if (!response || !response.data) {
      throw new Error('Empty response or no data received.');
    }

    const contentType = response.headers['content-type'];

    if (!contentType || contentType !== 'application/octet-stream') {
      throw new Error('Invalid Content-Type for file download.');
    }

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', name);
    document.body.appendChild(link);
    link.click();
  } catch (error) {
    if (error instanceof Error) {
      handleError(error as CustomError);
    }
  }
};

export const disabledForSA = (roles: Role[]) => {
  const rolesNames = roles.map((role) => role.roleName);
  if (rolesNames && rolesNames.includes(Roles.SUPER_ADMIN)) {
    return false;
  } else {
    return true;
  }
};

export const disabledForRoles = (roles: Role[], Role: string[]) => {
  const rolesNames = roles.map((role) => role.roleName);
  if (rolesNames && Role.some((role) => rolesNames.includes(role))) {
    return false;
  } else {
    return true;
  }
};

export const findSingleSelectedValueLabelOption = (
  options: ValueLabelOption[],
  selectedValue: string | number,
): ValueLabelOption => {
  return options.find((item) => item.value === selectedValue)! || null;
};

export const generateOptionsFromEnum = (members: string[]) =>
  members.map((member) => {
    return {
      value: member,
      label: `${`${member
        .toLowerCase()
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (match) => match.toUpperCase())}`}`,
    };
  });

export const generateOptions = (
  options: any,
  valueKey: string,
  labelKey: string,
  idkey?: string,
  groupKey: string | null = null,
  groupTitleKey: string | null = null,
  isDirectValues: boolean = false,
) => {
  if (options && options.length > 0 && options[0]?.data) {
    return options.map((group: any) => {
      const groupTitle = groupTitleKey ? group[groupTitleKey] : group.title;

      const unique = group.data.filter((obj: any, index: number) => {
        return index === group.data.findIndex((o: any) => obj.id === o.id);
      });

      return {
        label: groupTitle
          ?.toLowerCase()
          .replace(/_/g, ' ')
          .replace(/\b\w/g, (match: any) => match.toUpperCase()),
        options: unique.map((item: any) => ({
          value: isDirectValues ? item : item[valueKey],
          label: `${item?.employeeId} - ${`${item[labelKey]
            ?.toLowerCase()
            .replace(/_/g, ' ')
            .replace(/\b\w/g, (match: any) => match.toUpperCase())}`}`,
        })),
      };
    });
  } else {
    return options?.length > 0
      ? options.map((item: any) => {
          if (groupKey && item[groupKey]) {
            // Grouped option
            return {
              label: item[groupKey]
                ?.toLowerCase()
                .replace(/_/g, ' ')
                .replace(/\b\w/g, (match: any) => match.toUpperCase()),
              options: item[groupKey].map((status: any) => ({
                value: isDirectValues ? status : status[valueKey],
                label: `${`${status[labelKey]
                  ?.toLowerCase()
                  .replace(/_/g, ' ')
                  .replace(/\b\w/g, (match: any) => match.toUpperCase())}`}`,
              })),
            };
          } else {
            // Non-grouped option
            const label = isDirectValues ? item : item[labelKey];
            return {
              value: isDirectValues ? item : item[valueKey],
              label: `${`${idkey ? `${item[idkey]} - ` : ''}${label
                ?.toLowerCase()
                .replace(/_/g, ' ')
                .replace(/\b\w/g, (match: any) => match.toUpperCase())} `}`,
            };
          }
        })
      : [];
  }
};

export const generateDocumentTypeOptions = (
  panNumber: string,
  aadharNumber: string,
): ValueLabelOption[] => {
  const options: ValueLabelOption[] = [];

  if (aadharNumber) {
    options.push({ value: 'AADHAR_CARD', label: 'Aadhar Card' });
  }

  if (panNumber) {
    options.push({ value: 'PAN_CARD', label: 'Pan Card' });
  }

  return options;
};

export const downloadFile = async (url: string, fileName?: string) => {
  try {
    const response = await axios.get(url, {
      responseType: 'blob',
    });
    let docName = '';
    if (!fileName) {
      docName = url.substring(url.lastIndexOf('/') + 1);
    }
    const blob = new Blob([response.data]);

    const href = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = href;
    link.download = !fileName ? docName : fileName;
    link.click();
  } catch (error) {
    console.error('Error downloading file:', error);
    throw error;
  }
};

export const formatCurrency = (amount: string) => {
  const inputValue = String(amount);

  const cleaned = inputValue.replace(/[^\d.]/g, '');

  const parts = cleaned.split('.');
  const integerPart = parts[0];
  const decimalPart = parts[1] || '';

  let lastThree = integerPart.slice(-3);
  const otherNumbers = integerPart.slice(0, -3);

  if (otherNumbers !== '') {
    lastThree = ',' + lastThree;
  }

  const formattedInteger =
    otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;

  let result = formattedInteger;
  if (decimalPart.length > 0 || inputValue.includes('.')) {
    result += '.' + decimalPart;
  }
  const formattedAmount = '\u20B9' + result;
  return formattedAmount;
};

export function formatCurrencyInWord(amount: number) {
  if (amount >= 1e9) {
    return (amount / 1e9).toFixed(2) + ' Billion';
  } else if (amount >= 1e7) {
    return (amount / 1e7).toFixed(2) + ' Crore';
  } else if (amount >= 1e5) {
    return (amount / 1e5).toFixed(2) + ' Lac';
  } else if (amount >= 1e4) {
    return (amount / 1e3).toFixed(1) + ' K';
  } else if (amount >= 10) {
    return amount.toString();
  } else {
    return amount.toString();
  }
}

export const generateMonthList = (
  startYear: number,
  startMonth: number,
  numMonths: number,
): { label: string; value: string }[] => {
  const monthNames: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const monthList: { label: string; value: string }[] = [];
  let currentYear: number = startYear;
  let currentMonth: number = startMonth;

  for (let i: number = 0; i < numMonths; i++) {
    monthList.push({
      label: `${monthNames[currentMonth % 12]} ${currentYear}`,
      value: `${monthNames[currentMonth % 12].toUpperCase()} ${currentYear}`,
    });
    currentMonth--;
    if (currentMonth === -1) {
      currentMonth = 11;
      currentYear--;
    }
  }

  return monthList.reverse();
};

export const formatDateIfValid = (date: string) => {
  try {
    return new Date(datepickerFormatDate(date));
  } catch (error) {
    console.error('Invalid date:', date);
    return null;
  }
};

export const toTitleCase = (str: string) => {
  return str
    ?.split(' ')
    ?.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

export const getFileDetailsFromUrl = (url: string): FileDetails => {
  const segments = url.split('/');
  const fileNameWithExtension = segments.pop();
  if (!fileNameWithExtension) {
    return { fileName: '', fileExtension: '' };
  }

  const lastDotIndex = fileNameWithExtension.lastIndexOf('.');
  if (lastDotIndex !== -1) {
    const fileName = fileNameWithExtension.slice(0, lastDotIndex);
    const fileExtension = fileNameWithExtension
      ?.slice(lastDotIndex + 1)
      .toLowerCase();
    return { fileName, fileExtension };
  }

  return { fileName: fileNameWithExtension, fileExtension: '' };
};

export function formatInput(input: string) {
  const cleaned = input.replace(/[^\d.]/g, '');

  const parts = cleaned.split('.');
  const integerPart = parts[0];
  const decimalPart = parts[1] || '';

  let lastThree = integerPart.slice(-3);
  const otherNumbers = integerPart.slice(0, -3);

  if (otherNumbers !== '') {
    lastThree = ',' + lastThree;
  }

  const formattedInteger =
    otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;

  let result = formattedInteger;
  if (decimalPart.length > 0 || input.includes('.')) {
    result += '.' + decimalPart;
  }

  return result;
}
