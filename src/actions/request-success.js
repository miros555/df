export const requestSuccess = (data) => { console.log(data);
  return { type: 'REQUESTED_SUCCEEDED', payload:data }
};
