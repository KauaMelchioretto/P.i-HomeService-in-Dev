const initialState = {token: ""}

export default function Login(state = initialState, action) {
  switch (action?.type) {
    case "SET_LOGIN":
      return { ...state, ...action.login };

    case "RESET_LOGIN":
      return {initialState};

      default: return state;
  }
}

