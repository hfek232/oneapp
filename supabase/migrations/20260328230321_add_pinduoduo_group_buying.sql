-- 1. SYNC PROFILES (Standardizing ID to Auth User ID)
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name = 'profiles' AND column_name = 'auth_user_id') THEN
        UPDATE public.profiles SET id = auth_user_id WHERE id IS DISTINCT FROM auth_user_id;
        ALTER TABLE public.profiles DROP COLUMN IF EXISTS auth_user_id;
    END IF;
END $$;

-- 2. ENHANCE PRODUCTS (Pinduoduo Ready)
ALTER TABLE public.inethioproducts 
ADD COLUMN IF NOT EXISTS min_group_size INTEGER DEFAULT 3,
ADD COLUMN IF NOT EXISTS max_group_size INTEGER DEFAULT 10,
ADD COLUMN IF NOT EXISTS group_price_birr NUMERIC(10,2),
ADD COLUMN IF NOT EXISTS purchase_count INTEGER DEFAULT 0;

-- 3. THE GROUP ENGINE
CREATE TABLE IF NOT EXISTS public.groups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES public.inethioproducts(id) ON DELETE CASCADE,
    created_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    target_size INTEGER NOT NULL DEFAULT 3,
    current_size INTEGER DEFAULT 1,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'expired', 'cancelled')),
    expires_at TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '24 hours'),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. PARTICIPANTS & ORDER TRACKING
CREATE TABLE IF NOT EXISTS public.group_participants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    group_id UUID NOT NULL REFERENCES public.groups(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'refunded')),
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(group_id, user_id)
);

-- 5. THE AUTO-COMPLETION TRIGGER
CREATE OR REPLACE FUNCTION public.check_group_completion()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.groups
    SET current_size = (SELECT COUNT(*) FROM public.group_participants WHERE group_id = NEW.group_id AND payment_status = 'completed'),
        status = CASE WHEN (SELECT COUNT(*) FROM public.group_participants WHERE group_id = NEW.group_id AND payment_status = 'completed') >= target_size THEN 'completed' ELSE status END
    WHERE id = NEW.group_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_participant_joined ON public.group_participants;
CREATE TRIGGER on_participant_joined AFTER INSERT OR UPDATE OF payment_status ON public.group_participants FOR EACH ROW EXECUTE FUNCTION public.check_group_completion();