export const getInitialState = () => ({
  isWaiting: false,
});

export default actionTypeSet => (state = getInitialState(), action) => {
  const { type } = action;
  switch (type) {
    case actionTypeSet.Start: return {
      isWaiting: true,
    };
    case actionTypeSet.Finished: return {
      isWaiting: false,
    };
    default: return state;
  }
};
