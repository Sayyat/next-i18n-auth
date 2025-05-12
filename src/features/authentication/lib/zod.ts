/*
 * Copyright (c) 2025. Sayat Raykul
 */

import { z } from "zod";
import { TFunction } from "@/i18n";

export const createRegisterSchema = (
  t: TFunction<"features.authentication.lib.zod">,
) => {
  return z
    .object({
      email: z
        .string({
          required_error: t("Email is required"),
        })
        .email(t("Email is invalid")),
      firstname: z.string({
        required_error: t("Firstname is required"),
      }),
      lastname: z.string({
        required_error: t("Lastname is required"),
      }),
      middle_name: z.string().optional(),
      birthdate: z.string({
        required_error: t("Birthdate is required"),
      }),
      iin: z.string({
        required_error: t("IIN is required"),
      }),

      phone_number: z
        .string()
        .min(11, t("Phone is min")) // Ensures at least 7 digits
        .max(15, t("Phone is max")) // Limits to 15 digits
        .regex(/^\+?[1-9]\d{6,14}$/, t("Phone is invalid")), // Allows optional "+" & ensures valid digits
      address: z.string({
        required_error: t("Lastname is required"),
      }),

      city_id: z.coerce.number({
        required_error: t("City is required"),
      }),
      password: z
        .string()
        .min(
          8,
          t("Password must be at least {{symbols}} symbols", {
            symbols: 8,
          }),
        )
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, t("Password is weak")),

      confirm: z.string(),
    })
    .refine((data) => data.password === data.confirm, {
      message: t("Password and Confirm mismatch"),
      path: ["confirm"],
    });
};

export const createLoginSchema = (
  t: TFunction<"features.authentication.lib.zod">,
) => {
  return z.object({
    email: z
      .string({
        required_error: t("Email is required"),
      })
      .email(t("Email is invalid")),
    password: z.string().min(5, t("Password is min", { min: 5 })),
  });
};

export const createEditProfileSchema = (
  t: TFunction<"features.authentication.lib.zod">,
) => {
  return z.object({
    email: z
      .string({
        required_error: t("Email is required"),
      })
      .email(t("Email is invalid")),
    firstname: z.string().min(1, t("Firstname is min")),
    lastname: z.string().min(1, t("Lastname is min")),
    middle_name: z.string().min(1, t("middle_name is min")),
    birthdate: z.string().min(1, t("birthdate is min")),
    iin: z.string().min(1, t("iin is min")),

    phone_number: z
      .string()
      .min(11, t("phone is min")) // Ensures at least 11 digits
      .max(15, t("phone is max")) // Limits to 15 digits
      .regex(/^\+?[1-9]\d{6,14}$/, t("phone is invalid")), // Allows optional "+" & ensures valid digits
    address: z.string().min(1, t("address is min")),

    city_id: z.coerce
      .number({
        required_error: t("city is required"),
      })
      .min(0, t("city is required"))
      .optional(),
  });
};

export const createResetSchema = (
  t: TFunction<"features.authentication.lib.zod">,
) => {
  return z.object({
    email: z
      .string({
        required_error: t("email is required"),
      })
      .email(t("email is invalid")),
  });
};
