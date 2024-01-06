import axios, { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

type RequestBody = {
  code: string;
  redirect_uri: string;
};

export type AuthResponse = {
  token_type: string;
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
};

export async function POST(request: NextRequest) {
  const clientId = process.env.DISCORD_CLIENT_ID;
  const clientSecret = process.env.DISCORD_OAUTH_CLIENT_SECRET;

  const requestBody: RequestBody = await request.json();
  try {
    const dsResponse = await axios.post(
      "https://discord.com/api/v10/oauth2/token",
      {
        grant_type: "authorization_code",
        code: requestBody.code,
        redirect_uri: requestBody.redirect_uri,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        auth: {
          username: clientId!,
          password: clientSecret!,
        },
      }
    );
    return NextResponse.json(dsResponse.data);
  } catch (err: any) {
    return NextResponse.json({data: err}, { status: 400 });
  }
}
