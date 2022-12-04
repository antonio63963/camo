class Routes {
  HOME = "/";

  AUTH_SIGNIN = "/login";
  PINS = "/pins";

  PIN_SHOW = "/pin/:id";
  LIST_CREATE = "/pin/create";
  LIST_SHARE = "/lists/:id/share";
  NOT_FOUND = "/404";
}

export default new Routes();
