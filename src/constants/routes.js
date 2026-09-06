
export const ROUTES = {
  HOME: "/",
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  FORGOT_PASSWORD: "/auth/forgot-password",
  RESET_PASSWORD: "/auth/reset-password/:token",
  PROFILE: "/auth/profile",

  EVENTS: "/events",
  CREATE_EVENT: "/organizations/events/create",
  EVENT_DETAILS: "/events/:id/details",
  ORGANIZER_EVENTS: "/organizer/events",
  ORGANIZER_EVENT_DETAILS: "/organizer/events/:id",

  ORGANIZATIONS_LIST : "/organizations",
  ORGANIZATIONS_DETAILS : "/organizations/:id",
  CREATE_ORGANIZATION : "/organizations/create",
  ORGANIZATION_MEMBERS: "/organizations/members" ,

  ACCEPT_INVITATION : "/accept-invitation"
  
};


