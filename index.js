const originalFetch = window.fetch;

export const createFetchInterceptor = () => {
  let requestInterceptor = null;

  const setRequestInterceptor = (interceptor) => {
    requestInterceptor = interceptor;
  };

  const interceptFetch = async (input, init) => {
    if (requestInterceptor) {
      const modified = await requestInterceptor(input, init);
      input = modified.input;
      init = modified.init;
    }
    return originalFetch(input, init);
  };

  window.fetch = interceptFetch;

  return {
    setRequestInterceptor,
  };
};
