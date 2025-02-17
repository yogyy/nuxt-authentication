import { EventHandlerRequest, H3Event } from "h3";
import { SESSION_COOKIE_NAME } from "./session";

export function setSessionTokenCookie(
  event: H3Event<EventHandlerRequest>,
  token: string,
  expiresAt: Date
): void {
  setCookie(event, SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    path: "/",
  });
}

export function deleteSessionTokenCookie(
  event: H3Event<EventHandlerRequest>
): void {
  setCookie(event, SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    path: "/",
  });
}
