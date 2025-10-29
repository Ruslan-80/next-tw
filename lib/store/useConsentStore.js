import { create } from "zustand";
import Cookies from "js-cookie";

const COOKIE_NAME = "site_has_accepted_cookies";

export const useConsentStore = create((set) => ({
  isAccepted: false,
  isVisible: false,

  initConsent: () => {
    if (typeof window === "undefined") return; // чтобы не выполнялось на сервере
    const cookieValue = Cookies.get(COOKIE_NAME);
    const accepted = cookieValue === "true";
    set({
      isAccepted: accepted,
      isVisible: !accepted,
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
