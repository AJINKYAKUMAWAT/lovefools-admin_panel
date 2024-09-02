import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import { RootState, AppDispatch } from './store';

export const createTypedSelector = (selector) => {
  return (state) => selector(state);
};

createTypedSelector.propTypes = {
  selector: PropTypes.func.isRequired,
};

export const useAppDispatch = () => useDispatch();

export const useAppSelector = useSelector;
