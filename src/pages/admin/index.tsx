import { AuthState } from '@/lib/auth'
import React from 'react'

export default function Admin() {
    return (
        <AuthState>
            <h1>Admin</h1>
        </AuthState>
    )
}
