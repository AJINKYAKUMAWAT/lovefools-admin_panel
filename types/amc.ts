import { ListParameters } from './baseTypes';
import { ValueLabelOption } from './component/common/select';

export interface AmcQueryParams extends ListParameters {
  month?: ValueLabelOption | null | string;
  year?: string;
}

export interface AmcInput {
  id?: number | null;
  serviceName: string;
  serviceCompanyName: string;
  startDate: Date | string | null;
  endDate: Date | string | null;
  amount: number | string | null;
}
