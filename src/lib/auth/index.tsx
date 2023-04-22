import { Loading } from "@/components/layout/loading";
import { LoginScreen } from "@/components/layout/loginScreen";
import { useUserData } from "@/hooks/useUserData";

export function AuthState({ children }: { children: React.ReactNode }): JSX.Element {
    const { user, loading } = useUserData();

    if (loading) {
        return <Loading />
    }


    if (!user) {
        return <LoginScreen />
    }


    return <>
        {children}
    </>;
}