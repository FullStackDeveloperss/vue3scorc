export interface Dashboard {
  total_profiles: number;
  valid: number;
  invalid: number;
  friends: number;
  messages: number;
  user: User;
  statuses: Statuses;
}

export interface Statuses {
  valid: Valid[];
  invalid: Invalid[];
}

interface Valid {
  status: string;
  counter: number;
  text: string;
}

interface Invalid {
	status: string;
  counter: number;
  text: string;
}

interface User {
  name: string;
}
