export async function getToken(log, pass, BACKEND) {
  const response = await fetch(`${BACKEND}login`, {
    method: 'POST',
    body: JSON.stringify({
      login: log,
      password: pass,
    }),
    headers: {
      'Content-type': 'application/json',
    },
  });
  return await response.json();
}

export async function getList(token, BACKEND) {
  const response = await fetch(`${BACKEND}accounts`, {
    headers: {
      Authorization: `Basic ${token}`,
    },
  });
  return await response.json();
}

export async function getScore(token, BACKEND, id) {
  const response = await fetch(`${BACKEND}account/${id}`, {
    headers: {
      Authorization: `Basic ${token}`,
    },
  });
  return await response.json();
}

export async function createAccaunt(token, BACKEND) {
  const response = await fetch(`${BACKEND}create-account`, {
    method: 'POST',
    body: '',
    headers: {
      Authorization: `Basic ${token}`,
    },
  });
  return await response.json();
}

export async function sendScore(token, BACKEND, scoreFrom, scoreTo, scoreAmount) {
  const response = await fetch(`${BACKEND}transfer-funds`, {
    method: 'POST',
    body: JSON.stringify({
      from: scoreFrom,
      to: scoreTo,
      amount: scoreAmount,
    }),
    headers: {
      Authorization: `Basic ${token}`,
      'Content-type': 'application/json',
    },
  });
  return await response.json();
}
