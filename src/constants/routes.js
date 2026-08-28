
export const ROUTES = {
  HOME: "/",
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  FORGOT_PASSWORD: "/auth/forgot-password",
  RESET_PASSWORD: "/auth/reset-password/:token",
  PROFILE: "/auth/profile",

  EVENTS: "/events",
  EVENT_DETAILS: "/events/:id/details",

  ORGANIZATIONS_LIST : "/organizations",
  ORGANIZATIONS_DETAILS : "/organizations/:id",
  CREATE_ORGANIZATION : "/organizations/create",

  ACCEPT_INVITATION : "/accept-invitation"
};