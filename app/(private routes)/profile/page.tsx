import css from "./ProfilePage.module.css";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { fetchCurrentUser } from "@/lib/api/serverApi";

export async function generateMetadata(): Promise<Metadata> {
  const { username, avatar } = await fetchCurrentUser();

  return {
    title: `Profile ${username}`,
    description: `${username}'s profile on NoteHub — manage your notes and personal settings`,
    openGraph: {
      title: `Profile ${username}`,
      description: `${username}'s profile on NoteHub — manage your notes and personal settings`,
      url: `https://08-zustand-aedg.vercel.app/profile`,
      images: [
        {
          url: avatar,
          width: 1200,
          height: 630,
          alt: `${username} avatar`,
        },
      ],
    },
  };
}

const Profile = async () => {
  const { username, email, avatar } = await fetchCurrentUser();

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={avatar}
            alt={username}
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {username}</p>
          <p>Email: {email}</p>
        </div>
      </div>
    </main>
  );
};
export default Profile;