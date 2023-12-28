import { createClient } from '@supabase/supabase-js';
import { useAuthStore } from '@/stores/authStore';
import { useUserStore } from '../stores/userStore';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

supabase.auth.onAuthStateChange((event, session) => {
	const authStore = useAuthStore();
	const userStore = useUserStore();

	authStore.session = session?.user || null;
	userStore.getUser();
});
