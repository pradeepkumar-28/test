const initialState = {
  M3UParseData: "",
};

const m3uReducer = (state = initialState, action) => {
  switch (action.type) {
    case "M3U_PARSE_DATA":
      return {
        ...state,
        M3UParseData: action.payload,
      };
    default:
      return state;
  }
};

export default m3uReducer;
