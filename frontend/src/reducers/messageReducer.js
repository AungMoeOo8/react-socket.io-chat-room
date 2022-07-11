import { formatTime } from "../ulti";

export const messageReducer = (state, action) => {
  const { socketId, author, time, message } = action.payload;
  switch (action.type) {
    case "clientConnect":
      return [
        ...state,
        {
          socketId,
          author,
          time: formatTime(time),
          message: `${author} has connected`,
        },
      ];

    case "clientDisconnect":
      return [
        ...state,
        {
          socketId,
          author,
          time: formatTime(time),
          message: `${author} has disconnected`,
        },
      ];

    case "message":
      return [
        ...state,
        {
          socketId,
          author,
          time: formatTime(time),
          message,
        },
      ];

    default:
      throw new Error();
  }
};
