'use client';
import useAuthentication from "@/hooks/useAuthentication";
import { AuthenticationState } from "@/redux/features/authentication/authenticationSlice";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function HomeComponent() {
  const params = useSearchParams();

  const code = params.get("code");

  const {authentication, isLoading} = useAuthentication({
    code: code,
    redirectUri: "http://localhost:3000",
  });

  return (
    <section>
      {
        authentication?.accessToken ? 'Authorized' : <Link
        href={`https://discord.com/oauth2/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID}&scope=identify&redirect_uri=http%3A%2F%2Flocalhost:3000`}
      >
        Login
      </Link>
      }
    </section>
  );
}

export default HomeComponent;
