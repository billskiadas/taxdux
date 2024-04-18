import {supabase} from "../supabase/createSupabaseClient.js";
import {Button} from "antd";
import { GoogleOutlined } from '@ant-design/icons';

export const GoogleSignIn = () => {

    const signInWithGoogle = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: '/',
                queryParams: {
                    prompt: 'consent',
                },
            },
        });

        if (error) console.error('Error during sign in:', error);
    };
    return <Button onClick={signInWithGoogle} icon={<GoogleOutlined />} size={'large'}>Sign in</Button>
}