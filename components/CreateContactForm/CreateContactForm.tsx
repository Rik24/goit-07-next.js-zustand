"use client";

import { createContact } from "@/lib/api/contactsApi";
import { useContactStore } from "@/stores/contactStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import css from "./CreateContactForm.module.css";

export default function CreateContactForm() {
  // const { contactDraft, setContactDraft, clearContactDraft } =
  //   useContactStore();

  const contactDraft = useContactStore((s) => s.contactDraft);
  const setContactDraft = useContactStore((s) => s.setContactDraft);
  const clearContactDraft = useContactStore((s) => s.clearContactDraft);

  const router = useRouter();

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: createContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      clearContactDraft();
      router.push("/contacts/filter/all");
    },
  });

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setContactDraft({
      ...contactDraft,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = () => {
    mutate({ ...contactDraft });
  };

  return (
    <form className={css.form} action={handleSubmit}>
      <label className={css.label}>
        Name:
        <input
          type="text"
          name="name"
          value={contactDraft.name}
          onChange={handleChange}
        />
      </label>
      <label className={css.label}>
        City:
        <input
          type="text"
          name="city"
          value={contactDraft.city}
          onChange={handleChange}
        />
      </label>
      <label className={css.label}>
        Sex:
        <select name="sex" value={contactDraft.sex} onChange={handleChange}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </label>
      <label className={css.label}>
        Description:
        <textarea
          name="description"
          value={contactDraft.description}
          onChange={handleChange}
        ></textarea>
      </label>
      <button type="submit">Create contact</button>
    </form>
  );
}
