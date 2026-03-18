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