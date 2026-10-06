-- UNIRISE Campus Platform PostgreSQL Database Schema
-- Defines entities for Students, Clubs, Positions, Posts, Events, Messaging, and RLS Policies.

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES (Students, Club Coordinators, College Admins)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE,
    role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'club_coordinator', 'college_admin')),
    department TEXT,
    year TEXT,
    avatar_url TEXT,
    skills TEXT[] DEFAULT '{}',
    bio TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. CLUBS (Verified Campus Clubs)
CREATE TABLE IF NOT EXISTS public.clubs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    tagline TEXT,
    category TEXT NOT NULL DEFAULT 'Technology',
    description TEXT,
    logo_url TEXT,
    cover_url TEXT,
    verified BOOLEAN DEFAULT true,
    leader_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    member_count INT DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. CLUB MEMBERS
CREATE TABLE IF NOT EXISTS public.club_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    club_id UUID NOT NULL REFERENCES public.clubs(id) ON DELETE CASCADE,
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    role TEXT DEFAULT 'member' CHECK (role IN ('member', 'coordinator', 'leader')),
    joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(club_id, profile_id)
);

-- 4. CLUB POSITIONS (Transferable Official Identities)
CREATE TABLE IF NOT EXISTS public.club_positions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    club_id UUID NOT NULL REFERENCES public.clubs(id) ON DELETE CASCADE,
    position_title TEXT NOT NULL, -- e.g. 'President', 'Vice President', 'Secretary', 'Treasurer'
    holder_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    assigned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(club_id, position_title)
);

-- 5. POSTS (Campus Feed Items)
CREATE TABLE IF NOT EXISTS public.posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    club_id UUID REFERENCES public.clubs(id) ON DELETE SET NULL,
    author_name TEXT NOT NULL,
    author_type TEXT NOT NULL CHECK (author_type IN ('student', 'club', 'college')),
    type TEXT NOT NULL CHECK (type IN ('event', 'hackathon', 'internship', 'club', 'opportunity', 'student')),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    date_info TEXT,
    location TEXT DEFAULT 'Campus',
    tags TEXT[] DEFAULT '{}',
    action_text TEXT DEFAULT 'View Details',
    link TEXT DEFAULT '#',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. EVENTS (Event Details linked to Posts)
CREATE TABLE IF NOT EXISTS public.events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID UNIQUE REFERENCES public.posts(id) ON DELETE CASCADE,
    event_date DATE,
    event_time TIME,
    venue TEXT NOT NULL,
    registration_deadline TIMESTAMPTZ,
    max_attendees INT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. EVENT REGISTRATIONS
CREATE TABLE IF NOT EXISTS public.event_registrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'registered' CHECK (status IN ('registered', 'attended', 'cancelled')),
    registered_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(event_id, profile_id)
);

-- 8. CONNECTIONS (Mentors, Teammates, Student Connections)
CREATE TABLE IF NOT EXISTS public.connections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    requester_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    addressee_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(requester_id, addressee_id)
);

-- 9. CONVERSATIONS (Open Campus, Groups, Personal)
CREATE TABLE IF NOT EXISTS public.conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type TEXT NOT NULL CHECK (type IN ('open', 'group', 'personal')),
    name TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. CONVERSATION MEMBERS
CREATE TABLE IF NOT EXISTS public.conversation_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(conversation_id, profile_id)
);

-- 11. MESSAGES (Chat Messages for Realtime Subscriptions)
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
    sender_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    sender_name TEXT NOT NULL,
    content TEXT NOT NULL,
    sent_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 12. NOTIFICATIONS
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    recipient_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    link TEXT DEFAULT '#',
    read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clubs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.club_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.club_positions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversation_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Read policies (Public campus access)
CREATE POLICY "Public profiles read" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Public clubs read" ON public.clubs FOR SELECT USING (true);
CREATE POLICY "Public club members read" ON public.club_members FOR SELECT USING (true);
CREATE POLICY "Public club positions read" ON public.club_positions FOR SELECT USING (true);
CREATE POLICY "Public posts read" ON public.posts FOR SELECT USING (true);
CREATE POLICY "Public events read" ON public.events FOR SELECT USING (true);
CREATE POLICY "Public conversations read" ON public.conversations FOR SELECT USING (true);
CREATE POLICY "Public messages read" ON public.messages FOR SELECT USING (true);

-- Authenticated write policies
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Authenticated users can create posts" ON public.posts FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authors can update own posts" ON public.posts FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "Users can manage own event registrations" ON public.event_registrations FOR ALL USING (auth.uid() = profile_id);
CREATE POLICY "Users can manage connections" ON public.connections FOR ALL USING (auth.uid() = requester_id OR auth.uid() = addressee_id);
CREATE POLICY "Users can read own notifications" ON public.notifications FOR SELECT USING (auth.uid() = recipient_id);
CREATE POLICY "Users can create messages" ON public.messages FOR INSERT WITH CHECK (auth.role() = 'authenticated');
