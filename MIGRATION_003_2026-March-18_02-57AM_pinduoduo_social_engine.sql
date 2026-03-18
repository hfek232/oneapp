-- ==========================================
-- MIGRATION: 003
-- GENERATED: 2026-March-18_02-57AM
-- DESCRIPTION: OneApp Social Commerce Engine
-- ==========================================

-- 1. PROFILES & WALLETS
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
    full_name TEXT,
    telegram_id TEXT UNIQUE,
    referred_by UUID REFERENCES public.profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.wallets (
    user_id UUID REFERENCES public.profiles(id) PRIMARY KEY,
    bonus_balance DECIMAL(12,2) DEFAULT 25.00,
    referral_balance DECIMAL(12,2) DEFAULT 0.00,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. PRODUCTS & DEALS
CREATE TABLE IF NOT EXISTS public.products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    base_price DECIMAL(12,2) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS public.deals (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    group_price DECIMAL(12,2) NOT NULL,
    min_participants INTEGER DEFAULT 2
);

-- 3. GROUP BUY ENGINE
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'group_buy_status') THEN
        CREATE TYPE group_buy_status AS ENUM ('open', 'success', 'expired');
    END IF;
END $$;

CREATE TABLE IF NOT EXISTS public.group_instances (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    deal_id UUID REFERENCES public.deals(id),
    creator_id UUID REFERENCES public.profiles(id),
    status group_buy_status DEFAULT 'open',
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
