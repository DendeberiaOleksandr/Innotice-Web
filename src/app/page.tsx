"use client";
import AuthInitializer from "@/components/AuthInitializer";
import HomeComponent from "@/components/HomeComponent";
import { store } from "@/redux/store";
import { useEffect } from "react";
import { Provider } from "react-redux";

export default function Home() {
  return (
    <main>
      <Provider store={store}>
        <AuthInitializer>
          <HomeComponent />
        </AuthInitializer>
      </Provider>
    </main>
  );
}
