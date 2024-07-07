import React from "react";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
export default async function DashboardLayout ({
    children,
    params //what the storeId value will be stored in
}: {
    children: React.ReactNode;
    params: {storeId: string}
}) {
    const { userId } = auth();

    if (!userId) {
        redirect('/sign-in');
    }

    //confirms again that the storeId exists
    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId // same thing as userId: userId
        }
    });

    //if it doesn't exist then it returns back to the root
    if (!store) {
        redirect('/');
    }

    return (
        <>
            <div>This will be a NavBar</div>
            {children}
        </>
    )
}