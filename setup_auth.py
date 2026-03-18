import os
from pathlib import Path

# Mapping of file paths to their contents
files = {
    'src/features/auth/hooks/useTelegramAuth.ts': r'''
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router'; 
import { supabase } from '@/lib/supabase';

export const useTelegramAuth = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ['telegram-login'],
    mutationFn: async (telegramUser: any) => {
      // Step 1: Verify with Edge Function
      const { data, error } = await supabase.functions.invoke('telegram-auth', {
        body: telegramUser,
      });

      if (error) throw new Error(error.message);

      // Step 2: Set the Supabase Session
      const { data: authData, error: authError } = await supabase.auth.setSession({
        access_token: data.access_token,
        refresh_token: data.refresh_token,
      });

      if (authError) throw authError;
      return authData.user;
    },
    onSuccess: (user) => {
      // Post-Login Flow
      queryClient.setQueryData(['auth-user'], user);
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      console.log('Auth Success:', user?.id);
      
      // Navigate to dashboard
      navigate({ to: '/dashboard' }); 
    },
    onError: (err: any) => {
      console.error('Telegram Auth Failed:', err.message);
    }
  });
};
''',
    'src/features/auth/components/TelegramLogin.tsx': r'''
import { useEffect, useRef } from 'react';
import { useTelegramAuth } from '../hooks/useTelegramAuth';

export const TelegramLogin = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { mutate, isPending } = useTelegramAuth();

  useEffect(() => {
    // 1. Define global callback for the Widget
    (window as any).onTelegramAuth = (user: any) => {
      mutate(user);
    };

    // 2. Create and inject the widget script
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.setAttribute('data-telegram-login', 'App_yehfdhdbot');
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-radius', '10');
    script.setAttribute('data-onauth', 'onTelegramAuth(user)');
    script.setAttribute('data-request-access', 'write');
    script.async = true;

    containerRef.current?.appendChild(script);

    // Cleanup on unmount
    return () => {
      if (containerRef.current) containerRef.current.innerHTML = '';
      delete (window as any).onTelegramAuth;
    };
  }, [mutate]);

  return (
    <div className='flex flex-col items-center gap-4'>
      <div id='telegram-login-container' ref={containerRef} />
      {isPending && (
        <p className='text-sm text-gray-500 animate-pulse'>
          Verifying session...
        </p>
      )}
    </div>
  );
};
''',
}

def setup():
    for path_str, body in files.items():
        path = Path(path_str)
        # Create directories
        path.parent.mkdir(parents=True, exist_ok=True)
        # Write the file content
        path.write_text(body.strip())
        print(f'✅ Created: {path_str}')

if __name__ == '__main__':
    setup()
    print('\n🚀 OneApp Auth structure deployed.')
