/*
 * Copyright (c) 2025. Sayat Raykul
 */

export interface IRegisterPayload {
  email: string;
  firstname: string;
  lastname: string;
  middle_name?: string;
  birthdate: string;
  iin: string;
  phone_number: string;
  city_id: number;
  address: string;
  password: string;
}

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface IResetPayload {
  email: string;
}

export interface IResetResponse {
  message: string;
}
