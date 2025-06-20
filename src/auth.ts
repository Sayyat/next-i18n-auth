/*
 * Copyright (c) 2025. Sayat Raykul
 */

import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import {
  loginUser,
  refreshToken,
  registerUser,
} from "@/features/authentication/services/server";
import { jwtDecode } from "jwt-decode";
import { IUser } from "@/shared";
import {
  getLoginSchema,
  getRegisterSchema,
} from "@/features/authentication/lib/zodServer";
import { getTranslation } from "@/i18n";

class InvalidLoginError extends CredentialsSignin {
  static type = "InvalidLoginError";

  constructor(message: string) {
    super(message);
    this.code = message; // Custom error code if needed
  }
}

interface IAccessToken {
  token_type: "access" | "refresh";
  exp: number;
  iat: number;
  jti: string;
  user_id: number;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      id: "register",
      name: "Register",
      credentials: {
        email: {},
        firstname: {},
        lastname: {},
        middle_name: {},
        birthdate: {},
        iin: {},
        phone_number: {},
        city_id: {},
        address: {},
        password: {},
      },
      async authorize(credentials) {
        // const { t } = await getTranslation("shared.services.api");
        // 1. Validate login input
        const registerSchema = await getRegisterSchema();
        const { success, data, error } =
          await registerSchema.safeParseAsync(credentials);
        if (!success) {
          throw new InvalidLoginError(
            // error.errors[0]?.message || t("unknownError"),
            error.errors[0]?.message || "Unknown error",
          );
        }

        const result = await registerUser(data);

        if (!result.success) {
          throw new InvalidLoginError(result.error);
        }

        // ✅ If the backend returns access/refresh tokens, store them in the session immediately
        return result.data;
      },
    }),
    Credentials({
      id: "login",
      name: "Login",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, _) {
        // const { t } = await getTranslation("shared.services.api");
        // console.log({ t });
        const loginSchema = await getLoginSchema();
        const { success, data, error } =
          await loginSchema.safeParseAsync(credentials);
        if (!success) {
          throw new InvalidLoginError(
            // error.errors[0]?.message || t("Unknown Error"),
            error.errors[0]?.message || "Unknown Error",
          );
        }

        // 2. Attempt to login user
        const result = await loginUser(data);
        console.log({ result });
        if (!result.success) {
          throw new InvalidLoginError(result.error);
        }

        return result.data;
      },
    }),
  ],

  trustHost: true,
  session: {
    strategy: "jwt",
  },

  callbacks: {
    // Called when token is created/updated
    async jwt({ token, user }) {
      if (user) {
        const customUser = user as IUser;
        const { access, refresh, ...profile } = customUser;
        token.user = profile;
        token.access = access;
        token.refresh = refresh;
      }
      // console.log({in: "jwt", token})
      // Check for expiration if we have token.access
      if (token.access) {
        try {
          const decoded = jwtDecode<IAccessToken>(token.access as string);
          const currentTimeSeconds = Math.floor(Date.now() / 1000);
          const isExpired = decoded.exp <= currentTimeSeconds + 30; // Refresh 30 seconds before expiration
          // console.log({ isExpired });
          if (isExpired) {
            const refreshResponse = await refreshToken(token.refresh as string);
            if (refreshResponse.success) {
              token.access = refreshResponse.data.access;
            } else {
              console.log("refresh token failed");
              return null;
            }
          }
        } catch (error) {
          console.error("⚠️ Error refreshing token:", error);
          return null;
        }
      }
      return token;
    },

    // Called to update session
    async session({ session, token }) {
      if (token.user) {
        session.access = token.access as string;
      }
      return session;
    },
  },

  pages: {
    signIn: "/",
    error: "/",
  },
});
