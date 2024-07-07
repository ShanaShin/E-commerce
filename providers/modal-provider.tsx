"use client";

import {useEffect, useState} from "react";
import { StoreModal } from "@/components/modals/store-modal";

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }
    return (
        <>
            <StoreModal />
        </>
    )
}
// add this modal provider into layout.tsx
// layout.tsx is a server component, thus we cannot just add a client comp.
// we have to ensure there is no hydration errors