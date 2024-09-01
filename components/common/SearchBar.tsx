import { useCallback, useEffect, useState } from 'react';
import TextField from './TextField';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/solid';
import ComponentProps from '@/types/component/common/searchbar';

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

const SearchBar: React.FC<ComponentProps> = ({
  onChange,
  value,
  className,
  ...restProps
}) => {
  const [searchQuery, setSearchQuery] = useState(value || '');
  const [prevDebouncedSearchTerm, setPrevDebouncedSearchTerm] =
    useState<string>('');

  const debouncedSearchTerm = useDebounce(searchQuery.trim(), 500);

  useEffect(() => {
    if (prevDebouncedSearchTerm !== debouncedSearchTerm) {
      onChange(debouncedSearchTerm);
      setPrevDebouncedSearchTerm(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, onChange, prevDebouncedSearchTerm]);

  const handleInputChange = useCallback((event: string) => {
    setSearchQuery(event);
  }, []);

  const handleClearClick = () => {
    setSearchQuery('');
  };

  useEffect(() => {
    setSearchQuery(value || '');
  }, [value]);

  return (
    <TextField
      value={searchQuery || ''}
      radius='sm'
      className={`max-w-[220px] ${className}`}
      onChange={handleInputChange}
      endContent={
        searchQuery ? (
          <XMarkIcon
            className='w-5 cursor-pointer'
            onClick={() => handleClearClick()}
          />
        ) : (
          <MagnifyingGlassIcon className='w-5 cursor-pointer' />
        )
      }
      {...restProps}
    />
  );
};

export default SearchBar;
