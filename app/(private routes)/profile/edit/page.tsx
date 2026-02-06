"use client";

import css from "./EditProfilePage.module.css";
import { useState } from "react";
import { fetchCurrentUser, updateMe } from "@/lib/api/clientApi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { useMutation } from "@tanstack/react-query";

const EditProfile = () => {
  const router = useRouter();

  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const [username, setUsername] = useState(user?.username || "");
  const [errorMsg, setErrorMsg] = useState("");

  const editProfileMutation = useMutation({
    mutationFn: updateMe,

    onSuccess: async () => {
      const upMe = await fetchCurrentUser();
      setUser(upMe);

      router.push("/profile");
    },
    onError: () => {
      setErrorMsg("Failed to edit username");
    },
  });

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleCancel = () => {
    router.back();
  };

  const handleSubmit = (formData: FormData) => {
    const newUsername = formData.get("username") as string;

    editProfileMutation.mutate(newUsername);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={user.avatar}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} action={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              disabled={editProfileMutation.isPending}
              name="username"
              defaultValue={username}
              onChange={handleInput}
              id="username"
              type="text"
              className={css.input}
            />
          </div>

          <p>{user.email}</p>

          {errorMsg && <p className={css.error}>{errorMsg}</p>}

          <div className={css.actions}>
            <button
              disabled={editProfileMutation.isPending}
              type="submit"
              className={css.saveButton}
            >
              {editProfileMutation.isPending ? "Saving..." : "Save"}
            </button>
            <button
              onClick={handleCancel}
              type="button"
              className={css.cancelButton}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditProfile;