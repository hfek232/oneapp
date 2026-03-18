-- Migration: add_telegram_id_to_profiles
-- Description: Adds telegram_id to profiles for seamless TMA 8.0 authentication.

ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS telegram_id text UNIQUE;

-- Index for high-speed lookups during the "initAuth" flow
CREATE INDEX IF NOT EXISTS idx_profiles_telegram_id ON public.profiles(telegram_id);

COMMENT ON COLUMN public.profiles.telegram_id IS 'Unique Telegram User ID used for OneApp implicit login.';
