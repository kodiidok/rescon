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

export interface SessionItem {
  startTime?: string;
  endTime?: string;
  title?: string;
  presenter?: string;
  abstractId?: number;
  sessionId?: string;
  via?: string;
}

export interface PlenaryTlak {
  startTime?: string;
  endTime?: string;
  presenter?: string;
  sessionId?: string;
  location?: string;
}