import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, database } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { User } from "@/lib/entities/user";


export function useUserData(): {
    user: User | null;
    loading: boolean;
} {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [fbUser, loading] = useAuthState(auth);

    useEffect(() => {
        async function getUser(uid: string) {
            const docRef = doc(database, "users", uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                if (data) {
                    setCurrentUser({
                        id: docSnap.id,
                        email: data.email,
                        name: data.name,
                        role: data.role,
                        store: data.store,
                        cart: data.cart,
                        orders: data.orders,
                        createdAt: data.createdAt,
                        updatedAt: data.updatedAt,
                        favorites: data.favorites,
                        password: data.password,
                        phone: data.phone,
                    } as User);
                }
            } 
        }
        if (fbUser) {
            getUser(fbUser.uid);
        } else {
            setCurrentUser(null);
        }
    }, [fbUser]);

    return { user: currentUser, loading };
}