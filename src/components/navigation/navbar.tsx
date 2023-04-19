import React from 'react';
import { ShoppingBag, Heart } from 'lucide-react';
import { useAtom } from 'jotai';
import { CartOpenAtom, FavoritesOpenAtom, UserLocation, userLocationAtom } from '@/context/appContext';

const navLinks: UserLocation[] = ['Tudo', 'Feminino', 'Masculino', 'Infantil'];

export function Navbar() {
    const [, setFavoritesOpen] = useAtom(FavoritesOpenAtom);
    const [, setCartOpenAtom] = useAtom(CartOpenAtom);

    return (
        <div className='p-4 px-2 flex flex-col gap-6'>
            <div className='flex flex-row w-full items-center justify-between'>
                <h1>Logo</h1>

                <div className='gap-4 flex items-center justify-center'>
                    <Heart
                        onClick={() => setFavoritesOpen(true)}
                        strokeWidth={1}
                    />
                    <ShoppingBag
                        onClick={() => setCartOpenAtom(true)}
                        strokeWidth={1}
                    />
                </div> 
            </div>

            <div className='flex flex-row items-center justify-between gap-2'>
                {navLinks.map((link) => (
                    <NavLink key={link} label={link} />
                ))}
            </div>
        </div>
    )
}

interface NavLinkProps {
    label: UserLocation;
}

function NavLink({ label }: NavLinkProps) {
    const [userLocation, setUserLocation] = useAtom(userLocationAtom);

    function handleClick() {
        setUserLocation(label);
    }

    return (
        <div onClick={handleClick} className={`rounded text-zinc-800 
        flex flex-row items-center justify-center 
        text-sm w-full p-1 ${userLocation === label && 'bg-zinc-500/10 font-medium'} 
        ease-in-out duration-300
        cursor-pointer
        
        `}>
            <p>
                {label}
            </p>
        </div>
    );
}
