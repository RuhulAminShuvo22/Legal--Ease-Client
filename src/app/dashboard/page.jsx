"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function DashboardPage() {
    const router = useRouter();

    useEffect(() => {
        const redirectUser = async () => {
            try {
                const session = await authClient.getSession();

                if (!session?.data?.user) {
                    router.replace("/login");
                    return;
                }

                const email = session.data.user.email;

                const res = await fetch(
                    `http://localhost:5000/users/${email}`
                );

                if (!res.ok) {
                    router.replace("/");
                    return;
                }

                const user = await res.json();

                if (user.role === "admin") {
                    router.replace("/dashboard/admin");
                } else if (user.role === "lawyer") {
                    router.replace("/dashboard/lawyer");
                } else {
                    router.replace("/dashboard/client");
                }
            } catch (error) {
                console.error(error);
                router.replace("/");
            }
        };

        redirectUser();
    }, [router]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <p className="text-lg font-medium">
                Loading Dashboard...
            </p>
        </div>
    );
}