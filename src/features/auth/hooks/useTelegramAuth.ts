import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export const useTelegramAuth = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (telegramUser: any) => {
      const { data, error } = await supabase.functions.invoke('telegram-auth', { body: telegramUser });
      if (error) throw error;

      // setSession makes the login PERMANENT in localStorage
      const { data: sessionData, error: sessionError } = await supabase.auth.setSession({
        access_token: data.access_token,
        refresh_token: data.refresh_token,
      });

      if (sessionError) throw sessionError;
      return sessionData.user;
    },
    onSuccess: (user) => {
      queryClient.setQueryData(['auth-user'], user);
      console.log("Welcome to OneApp Marketplace, ", user?.user_metadata?.username);
    }
  });
};