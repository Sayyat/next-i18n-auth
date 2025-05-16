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
    firstname: z.string({
      required_error: t("Firstname is required"),
    }),
    lastname: z.string({
      required_error: t("Lastname is required"),
    }),
    middle_name: z.string({
      required_error: t("Middle name is required"),
    }),
    birthdate: z.string({
      required_error: t("Birthdate is required"),
    }),
    iin: z.string({
      required_error: t("IIN is required"),
    }),

    phone_number: z
      .string()
      .min(11, t("Enter 11 symbols at least")) // Ensures at least 11 digits
      .max(15, t("Enter 15 symbols at most")) // Limits to 15 digits
      .regex(/^\+?[1-9]\d{6,14}$/, t("Invalid phone number")), // Allows optional "+" & ensures valid digits
    address: z.string({
      required_error: t("Address is required"),
    }),

    city_id: z.coerce.number({
      required_error: t("City is required"),
    }),
  });
};

export const createResetSchema = (
  t: TFunction<"features.authentication.lib.zod">,
) => {
  return z.object({
    email: z
      .string({
        required_error: t("Email is required"),
      })
      .email(t("Email is invalid")),
  });
};
