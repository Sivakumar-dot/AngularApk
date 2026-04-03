export interface User {
  id: number;
  firstName: string;
  lastName?: string | null;
  email: string;
  mobile: string;
  roleId: number;
}
