const spinner = document.querySelector('.spinner');
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
  spinner.classList.add('none');
  return await response.json();
}

export async function getList(token, BACKEND) {
  try {
    const response = await fetch(`${BACKEND}accounts`, {
      headers: {
        Authorization: `Basic ${token}`,
      },
    });
    spinner.classList.add('none');
    return await response.json();
  } catch (err) {
    console.log(err.message);
  }
}

export async function getCurrencies(token, BACKEND) {
  try {
    const response = await fetch(`${BACKEND}currencies`, {
      headers: {
        Authorization: `Basic ${token}`,
      },
    });
    spinner.classList.add('none');
    return await response.json();
  } catch (err) {
    console.log(err.message);
  }
}

export async function getScore(token, BACKEND, id) {
  try {
    const response = await fetch(`${BACKEND}account/${id}`, {
      headers: {
        Authorization: `Basic ${token}`,
      },
    });
    spinner.classList.add('none');
    return await response.json();
  } catch (err) {
    console.log(err.message);
  }
}

export async function createAccaunt(token, BACKEND) {
  try {
    const response = await fetch(`${BACKEND}create-account`, {
      method: 'POST',
      body: '',
      headers: {
        Authorization: `Basic ${token}`,
      },
    });
    spinner.classList.add('none');
    return await response.json();
  } catch (err) {
    console.log(err.message);
  }
}

export async function sendScore(token, BACKEND, scoreFrom, scoreTo, scoreAmount) {
  try {
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
    spinner.classList.add('none');
    return await response.json();
  } catch (err) {
    console.log(err.message);
  }
}

export async function sendExchange(fr, too, am, token, BACKEND) {
  try {
    const response = await fetch(`${BACKEND}currency-buy`, {
      method: 'POST',
      body: JSON.stringify({
        from: fr,
        to: too,
        amount: am,
      }),
      headers: {
        Authorization: `Basic ${token}`,
        'Content-type': 'application/json',
      },
    });
    spinner.classList.add('none');
    return await response.json();
  } catch (err) {
    console.log(err.message);
  }
}

export async function currencyFeed(host) {
  try {
    const socket = new WebSocket(`ws://${host}currency-feed`);
    return socket;
  } catch (err) {
    console.log(err.message);
  }
}

export async function getBank(token, BACKEND) {
  try {
    const response = await fetch(`${BACKEND}banks`, {
      headers: {
        Authorization: `Basic ${token}`,
      },
    });
    spinner.classList.add('none');
    return await response.json();
  } catch (err) {
    console.log(err.message);
  }
}
