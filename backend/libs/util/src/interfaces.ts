export interface Session {
  startTime?: string;
  endTime?: string;
  date?: string;
  sessionId?: string;
  category?: string;
  location?: string;
}

export interface ChairPerson {
  username?: string;
  email?: string;
  password?: string;
  name?: string;
  roleName?: string;
}