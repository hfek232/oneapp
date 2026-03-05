-- 1. Ensure the wallet/balance column exists in profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS balance decimal DEFAULT 0,
ADD COLUMN IF NOT EXISTS referred_by uuid REFERENCES auth.users(id);

-- 2. Create the Growth Engine Function
CREATE OR REPLACE FUNCTION public.apply_social_rewards()
RETURNS trigger AS $$
BEGIN
  -- GIVE THE NEW USER 50 ETB WELCOME CREDIT
  NEW.balance := NEW.balance + 50;
  
  -- IF REFERRED, REWARD THE REFERRER
  IF NEW.referred_by IS NOT NULL THEN
    UPDATE public.profiles 
    SET referral_count = referral_count + 1,
        balance = balance + 10 -- Give the referrer 10 ETB too
    WHERE auth_user_id = NEW.referred_by;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Trigger it on every new signup
DROP TRIGGER IF EXISTS on_social_signup ON public.profiles;
CREATE TRIGGER on_social_signup
  BEFORE INSERT ON public.profiles
  FOR EACH ROW EXECUTE PROCEDURE public.apply_social_rewards();
