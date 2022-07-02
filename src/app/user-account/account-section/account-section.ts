import { AccountSectionName } from './account-section-name';

export default interface AccountSection {
  labelName: string;
  iconClass?: string;
  order?: number;
  name?: AccountSectionName;
  subsections?: AccountSection[];
}
