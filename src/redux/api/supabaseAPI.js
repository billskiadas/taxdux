import {supabase} from "../../supabase/createSupabaseClient.js";

const supabaseAPI = {
    fetchUsers: async () => {
        const { data, error } = await supabase.rpc('get_profiles_with_roles');
        if (error) throw error;
        return data;
    },

    updateRole: async (userId, newRole) => {
        const { data, error } = await supabase
            .from('user_role')
            .update({ role_name: newRole })
            .match({ user_id: userId });
        if (error) throw error;
        return data;
    },

    updateUserActiveStatus: async (userId, isActive) => {
        const { data, error } = await supabase
            .from('user_role')
            .update({ active: isActive })
            .match({ user_id: userId });
        if (error) throw error;
        return data;
    }
};

export default supabaseAPI;