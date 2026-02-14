import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

console.log("NextAuth initialized inside route handler");

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials, req) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Please enter an email and password');
                }

                await dbConnect();

                let user: any = await User.findOne({ email: { $regex: new RegExp(`^${credentials.email}$`, 'i') } });

                // Seed Admin User if not exists (Only for initial setup or check on login)
                if (!user && credentials.email === 'ishankamadusanka61@gmail.com') {
                    // This ensures the admin user is created on first login attempt if DB is empty
                    const hashedPassword = await bcrypt.hash('Isha@1996', 10);
                    user = await User.create({
                        name: 'Admin',
                        email: 'ishankamadusanka61@gmail.com',
                        password: hashedPassword,
                        role: 'admin'
                    });
                    console.log("🔥 Admin user created automatically.");
                }

                if (!user || !user.password) {
                    throw new Error('No user found or password not set');
                }

                const isMatch = await bcrypt.compare(credentials.password, user.password);

                if (!isMatch) {
                    // Allow login with original password even if changed? No.
                    // However, for the very first time, we forcefully reset if user is THE admin and password matches the hardcoded one? 
                    // No, standard authentication flow is better. The seeding above handles creation.
                    throw new Error('Invalid credentials');
                }

                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    role: user.role
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, trigger, session }) {
            if (user) {
                token.id = user.id;
                token.role = (user as any).role;
            }
            if (trigger === "update" && session?.name) {
                token.name = session.name;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                (session.user as any).id = token.id;
                (session.user as any).role = token.role;
            }
            return session;
        },
    },
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/login',
        error: '/login', // Error code passed in query string as ?error=
    },
    secret: process.env.NEXTAUTH_SECRET || 'secret-key-change-me',
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
