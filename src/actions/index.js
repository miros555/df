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
  fetch('https://test-task-server.herokuapp.com/api/v1/category/all')
            .then((res) => { return res.json() })
            .then((data) => {
                console.log(data);
                this.setState({ data });
                });
};
