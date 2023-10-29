

/** url of the backend server */
export const server = process.env.SERVER ?? "http://localhost:3333";

/** api hanlders to get paginated data */

export async function getAllUsers(page: number, pageSize: number) {
  const res = await fetch(`${server}/users?page=${page}&limit=${pageSize}`);
  if (!res.ok) {
    throw new Error("Failed to fetch user data");
  }
  return res.json();
}

export async function getAllRoles(page: number, pageSize: number) {
  const res = await fetch(`${server}/roles?page=${page}&limit=${pageSize}`);
  if (!res.ok) {
    throw new Error("Failed to fetch role data");
  }
  return res.json();
}

export async function getAllSessionItems(page: number, pageSize: number) {
  const res = await fetch(
    `${server}/session-items?page=${page}&limit=${pageSize}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch session item data");
  }
  return res.json();
}

export async function getAllSessions(page: number, pageSize: number) {
  const res = await fetch(`${server}/sessions?page=${page}&limit=${pageSize}`);
  if (!res.ok) {
    throw new Error("Failed to fetch session data");
  }
  return res.json();
}

/** api handlers to get data by id */

export async function getUserById(id: string) {
  const res = await fetch(`${server}/users/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch user data");
  }
  return res.json();
}

export async function getRoleById(id: string) {
  const res = await fetch(`${server}/roles/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch role data");
  }
  return res.json();
}

export async function getSessionById(id: string) {
  const res = await fetch(`${server}/sessions/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch session data");
  }
  return res.json();
}

export async function getSessionItemById(id: string) {
  const res = await fetch(`${server}/session-items/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch session-item data");
  }
  return res.json();
}

export async function getSessionItemByAbstractId(id: number) {
  const res = await fetch(`${server}/session-items/abstract/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch session-item data");
  }
  return res.json();
}

export async function getSessionItemBySessionId(id: string) {
  const res = await fetch(`${server}/session-items/session/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch session-item data");
  }
  return res.json();
}

export async function getSessionByCategory(category: string) {
  const res = await fetch(`${server}/sessions/category/${category}`);
  if (!res.ok) {
    throw new Error("Failed to fetch session data");
  }
  return res.json();
}

export async function getSessionByDate(date: string) {
  const res = await fetch(`${server}/sessions/date/${date}`);
  if (!res.ok) {
    throw new Error("Failed to fetch session data");
  }
  return res.json();
}

/** post request handlers */

export async function postUserData(data: any) {
  const res = await fetch(`${server}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Failed to submit user data");
  }
  return await res.json();
}

export async function postRoleData(data: any) {
  const res = await fetch(`${server}/roles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Failed to submit role data");
  }
  return await res.json();
}

export async function postSessionItemData(data: any) {
  const res = await fetch(`${server}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Failed to submit session item data");
  }
  return await res.json();
}

export async function postSessionData(data: any) {
  const res = await fetch(`${server}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Failed to submit session data");
  }
  return await res.json();
}

/** update request handlers */



/** delete request handlers */


/** search handler */
export async function searchSessionItems(query: string) {
  const queryString = encodeURIComponent(query);

  
  const res = await fetch(
    `${server}/session-items/search?q=${queryString}`
  );
  if (!res.ok) {
    throw new Error("Failed to search session item data");
  }
  return res.json();
}