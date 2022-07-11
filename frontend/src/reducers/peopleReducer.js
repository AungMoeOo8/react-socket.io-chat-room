export const peopleReducer = (state, action) => {
  const { socketId, name } = action.payload;
  switch (action.type) {
    case "add":
      return [...state, { socketId, name }];

    case "remove":
      return state.filter((element) => element.socketId === socketId);

    default:
      throw new Error();
  }
};
