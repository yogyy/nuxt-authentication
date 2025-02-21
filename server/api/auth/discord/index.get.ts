import { discord } from "~/server/utils/o-auth";
import * as arctic from "arctic";

export default defineEventHandler(async (event) => {
  const state = arctic.generateState();
  const codeVerifier = arctic.generateCodeVerifier();
  const scopes = ["email", "identify"];
  const url = discord.createAuthorizationURL(state, codeVerifier, scopes);

  setCookie(event, "discord_state", state, {
    maxAge: 60 * 5,
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  setCookie(event, "discord_code_verifier", codeVerifier, {
    maxAge: 60 * 5,
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return sendRedirect(event, url.toString());
});
