export interface IUser {
    id: string;
    name: string;
    email: string;
    store: string;
    role: 'admin' | 'user';
};
