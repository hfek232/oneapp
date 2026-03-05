-- 1. Add columns to the profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS auth_user_id uuid REFERENCES auth.users(id),
ADD COLUMN IF NOT EXISTS referral_count int DEFAULT 0;

-- 2. Create the Trigger Function
CREATE OR REPLACE FUNCTION public.handle_new_auth_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (auth_user_id, first_name)
  VALUES (new.id, new.raw_user_meta_data->>'first_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Activate the Trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_auth_user();
