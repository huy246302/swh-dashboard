import { supabase } from '../lib/supabaseClient';

export async function getUser() {
  const { data: { session } } = await supabase.auth.getSession();
  return session?.user || null;
}

export async function redirectToLogin() {
  return {
    redirect: {
      destination: '/login',
      permanent: false,
    },
  };
}
