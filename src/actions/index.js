// Action Creators
export const request = () => {
  return { type: 'REQUESTED' }
};

export const requestSuccess = (data) => {
  return { type: 'REQUESTED_SUCCEEDED', payload:data }
};

export const requestError = () => {
  return { type: 'REQUESTED_FAILED' }
};




export const fetchList = () => {
  return (dispatch) => {
    dispatch(request());
    fetch('https://test-task-server.herokuapp.com/api/v1/recipe/all' ,
    {
        mode: 'no-cors',
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },}


  )
      .then(res => res.json())
      .then(
        data => dispatch(requestSuccess(data)),
        err => dispatch(requestError())
      );
  }
};
