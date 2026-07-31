import { create } from "zustand";
import Cookies from "js-cookie";

const COOKIE_NAME = "site_has_accepted_cookies";

export const useConsentStore = create((set, get) => ({
  isAccepted: false,
  isVisible: false,
  isInitialized: false,

  initConsent: () => {
    if (typeof window === "undefined") return;
    if (get().isInitialized) return; // не инициализировать повторно
    const cookieValue = Cookies.get(COOKIE_NAME);
    const accepted = cookieValue === "true";
    set({
      isAccepted: accepted,
      isVisible: !accepted,
      isInitialized: true,
    });
  },

  acceptConsent: () => {
    Cookies.set(COOKIE_NAME, "true", {
      expires: 365,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });
    set({ isAccepted: true, isVisible: false });
  },
}));
