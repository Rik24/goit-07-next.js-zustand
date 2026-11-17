import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ContactData {
  name: string;
  city: string;
  sex: string;
  description: string;
}

const initialContactStoreData: ContactData = {
  name: "",
  city: "",
  sex: "",
  description: "",
};

interface ContactStore {
  contactDraft: ContactData;
  setContactDraft: (ContactDraft: ContactData) => void;
  clearContactDraft: () => void;
}

export const useContactStore = create<ContactStore>()(
  persist(
    (set) => {
      return {
        contactDraft: initialContactStoreData,
        setContactDraft: (contactDraft) => set({ contactDraft }),
        clearContactDraft: () => set({ contactDraft: initialContactStoreData }),
      };
    },
    {
      name: "contact",
      partialize: (store) => ({ contactDraft: store.contactDraft }),
    },
  ),
);
