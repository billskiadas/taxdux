import { Button } from "antd";
import { LogoutOutlined } from '@ant-design/icons';
import { supabase } from "../supabase/createSupabaseClient.js";

export const SignOutButton = ( ) => {
    const signOut = async () => {
        await supabase.auth.signOut();
    }

    return <Button style={{marginLeft: 5, fontSize: '20px'}} type="link" icon={<LogoutOutlined/>}
                   onClick={signOut}>
           </Button>

}