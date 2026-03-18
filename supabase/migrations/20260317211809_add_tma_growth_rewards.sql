-- migration: add_tma_growth_rewards
-- Created: 2026-03-18 00:18:09
-- Purpose: 50 ETB Welcome Credit and 10 ETB Referral Payout

-- 1. Ensure schema is ready
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS balance decimal DEFAULT 0,
ADD COLUMN IF NOT EXISTS referral_count int DEFAULT 0;

-- 2. Create the Reward Function
CREATE OR REPLACE FUNCTION public.handle_tma_signup_rewards()
RETURNS trigger AS $$
DECLARE
    referrer_id uuid;
BEGIN
    -- Extract the referral UUID from the 'referred_by' metadata sent by App.tsx
    -- If it's not a valid UUID, this will safely return NULL
    BEGIN
        referrer_id := (NEW.raw_user_meta_data->>'referred_by')::uuid;
    EXCEPTION WHEN OTHERS THEN
        referrer_id := NULL;
    END;

    -- Give the 50 ETB Welcome Credit to the new user
    UPDATE public.profiles 
    SET balance = COALESCE(balance, 0) + 50 
    WHERE id = NEW.id;

    -- If a valid referrer is present, credit them 10 ETB
    IF referrer_id IS NOT NULL THEN
        UPDATE public.profiles 
        SET balance = COALESCE(balance, 0) + 10,
            referral_count = COALESCE(referral_count, 0) + 1
        WHERE id = referrer_id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Bind Trigger to auth.users (triggers on every new signup)
DROP TRIGGER IF EXISTS on_auth_user_created_growth ON auth.users;
CREATE TRIGGER on_auth_user_created_growth
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_tma_signup_rewards();
