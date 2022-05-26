export const MessagesReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'set':
      return {messages: action.payload};
    case 'send':
      return {messages: state.messages.push(action.payload)};
    case 'delete':
      return {
        messages: state.messages.filter(
          (m: any) => m['_id'] !== action.payload,
        ),
      };
    default:
      throw new Error();
  }
};

export const MessageReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'set':
      return {message: action.payload};
    default:
      throw new Error();
  }
};
