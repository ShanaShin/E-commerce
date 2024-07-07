import prismadb from "@/lib/prismadb";

import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function SetupLayout ({
    children
}: {
    children: React.ReactNode;
}) {
    const { userId } = auth();

    if (!userId) {
        redirect('/sign-in');
    }

    //loading the first store available w currently logged in user
    const store = await prismadb.store.findFirst({
        where: {
            userId
        }
    });

    //if store exists then we redirect to [storeId] -> dashboard
    if (store) {
        redirect('/${store.id}');
    }

    return (
        <>
            {children}
        </>
    );
};