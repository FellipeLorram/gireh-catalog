import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export async function loginUser({ email, password }: { email: string, password: string }) {
    try {
        const user = await signInWithEmailAndPassword(auth, email, password);
        return user;
    } catch (error) {
        console.error("Error logging in user:", error);
    }
}