import { createClient } from '@supabase/supabase-js';
import { useAuthStore } from '@/stores/authStore';
import { useUserStore } from '../stores/userStore';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

supabase.auth.onAuthStateChange((event, session) => {
	const authStore = useAuthStore();
	const userStore = useUserStore();

	console.log(event);

	authStore.session = session?.user || null;
	userStore.getUser();
});
