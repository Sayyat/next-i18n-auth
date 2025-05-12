/*
 * Copyright (c) 2025. Sayat Raykul
 */

import { NextResponse } from "next/server";
import { env } from "@/shared/data/env/server";

const API_BASE_URL = env.API_URL; // Your backend API URL

export async function POST(req: Request) {
  try {
    const { pathname } = new URL(req.url);

    // Extract API path (remove `/api/proxy/`)
    const endpoint = pathname.replace(/^\/api\/proxy\//, "/api/");

    console.log("Old:", `${pathname}`);
    console.log("New:", `${endpoint}`);
    console.log("Proxying POST request to:", `${API_BASE_URL}${endpoint}`);

    // Forward request to actual backend
    const res = await fetch(`${API_BASE_URL}${endpoint}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(req.headers.get("authorization")
          ? { authorization: req.headers.get("authorization")! }
          : {}),
      },
      body: JSON.stringify(await req.json()),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("Proxy Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 },
    );
  }
}

export async function GET(req: Request) {
  try {
    const { pathname, search } = new URL(req.url);

    // Extract API path (remove `/api/proxy/`)
    const endpoint = pathname.replace(/^\/api\/proxy\//, "/api/");

    console.log("Old:", `${pathname}`);
    console.log("New:", `${endpoint}`);
    console.log(
      "Proxying GET request to:",
      `${API_BASE_URL}${endpoint}${search}`,
    );

    // Forward request to actual backend
    const res = await fetch(`${API_BASE_URL}${endpoint}${search}`, {
      method: "GET",
      headers: {
        ...(req.headers.get("authorization")
          ? { authorization: req.headers.get("authorization")! }
          : {}),
      },
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("Proxy Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 },
    );
  }
}
