"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/useAuth";
import { Button } from "@/components/ui/Button";
import styles from "./Dashboard.module.scss";

export default function DashboardPage() {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Only redirect if we're not loading and there's no user
    if (!isLoading && !user) {
      router.replace("/auth");
    }
  }, [user, isLoading, router]);

  const handleLogout = () => {
    logout();
    router.push("/auth");
  };

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading...</p>
      </div>
    );
  }

  // Show loading state if no user (will redirect)
  if (!user) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Redirecting...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Welcome to Dashboard</h1>
        <Button
          variant="secondary"
          onClick={handleLogout}
          className={styles.logoutButton}
        >
          Sign Out
        </Button>
      </div>

      <div className={styles.content}>
        <div className={styles.userCard}>
          {user.avatar && (
            <img
              src={user.avatar}
              alt={`${user.name} avatar`}
              className={styles.avatar}
            />
          )}
          <div className={styles.userInfo}>
            <h2 className={styles.userName}>{user.name}</h2>
            {user.email && <p className={styles.userEmail}>{user.email}</p>}
            <p className={styles.welcomeMessage}>
              Welcome to your dashboard! You have successfully signed in.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
