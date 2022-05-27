export const responseHanlder = (code: number, message: string) => {
  let response: {[k: string]: any} = {};
  const apiCodes = [200, 201, 202, 203, 204]; // Todo: should be moved to constants
  response = {
    success:
      apiCodes.findIndex((value) => value === code) === -1 ? false : true,
    code: code,
    message: message,
  };

  return response;
};
