type Method = 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT';

type CallApiParams = {
  url: string;
  method: Method;
  useCredentials?: boolean;
  body?: Record<string, any>;
  headers?: Record<string, string>;
  queryParams?: Record<string, any>;
};

type Options = {
  method: Method;
  headers: Headers;
  body: string | null;
  credentials?: 'include';
};

const CallApi = ({
  url,
  method,
  useCredentials = false,
  body,
  headers = {},
  queryParams = {},
}: CallApiParams) => {
  const options: Options = {
    method: method,
    headers: new Headers({'content-type': 'application/json', ...headers}), // by default setting the content-type to be json type
    body: body ? JSON.stringify(body) : null,
  };
  if (useCredentials) {
    options.credentials = 'include';
  }

  let newUrl = url;

  if (queryParams) {
    const newParams = new URLSearchParams(queryParams).toString();
    newUrl = new URL(`${url}?${newParams}`).toString();
  }

  return fetch(newUrl, options).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      return res.json().then(function (json) {
        // to be able to access error status when you catch the error
        return Promise.reject({
          status: res.status,
          ok: false,
          message: json.message,
          body: json,
        });
      });
    }
  });
};

export default CallApi;
