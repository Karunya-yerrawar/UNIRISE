-- UNIRISE Seed Data for Local Supabase Development

-- 1. Demo Profiles (UUIDs generated for local seed)
INSERT INTO public.profiles (id, full_name, email, role, department, year, skills, bio) VALUES
('00000000-0000-0000-0000-000000000001', 'Aarav Sharma', 'aarav.sharma@unirise.edu', 'student', 'Computer Science', '3rd Year', ARRAY['JavaScript', 'React', 'AI'], 'Building web solutions & competing in campus hackathons.'),
('00000000-0000-0000-0000-000000000002', 'Ananya Rao', 'ananya.rao@unirise.edu', 'club_coordinator', 'Computer Science', '4th Year', ARRAY['Python', 'Machine Learning', 'Figma'], 'AI Club President & mentor.'),
('00000000-0000-0000-0000-000000000003', 'Rahul Patil', 'rahul.patil@unirise.edu', 'club_coordinator', 'Robotics', '3rd Year', ARRAY['Robotics', 'C++', 'IoT'], 'Robotics Club Lead.'),
('00000000-0000-0000-0000-000000000004', 'Dr. V. K. Kulkarni', 'admin@unirise.edu', 'college_admin', 'Dean Office', 'Staff', ARRAY['Administration', 'Campus Lead'], 'College Academic Director.')
ON CONFLICT (id) DO NOTHING;

-- 2. Demo Clubs
INSERT INTO public.clubs (id, name, tagline, category, description, verified, leader_id, member_count) VALUES
('11111111-1111-1111-1111-111111111111', 'AI Club', 'Explore. Build. Innovate.', 'Technology', 'Official campus club dedicated to Artificial Intelligence & Data Science.', true, '00000000-0000-0000-0000-000000000002', 128),
('22222222-2222-2222-2222-222222222222', 'Robotics Club', 'Build the future.', 'Technology', 'Building autonomous bots, hardware labs, and competing nationwide.', true, '00000000-0000-0000-0000-000000000003', 94),
('33333333-3333-3333-3333-333333333333', 'Coding Club', 'Code. Compete. Create.', 'Technology', 'Competitive programming, web design, and open-source contributions.', true, NULL, 210),
('44444444-4444-4444-4444-444444444444', 'Entrepreneurship Cell', 'Ideas into impact.', 'Business', 'Startup incubator, pitching sessions, and founder networking.', true, NULL, 86)
ON CONFLICT (id) DO NOTHING;

-- 3. Demo Club Positions
INSERT INTO public.club_positions (id, club_id, position_title, holder_id) VALUES
('a1111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'President', '00000000-0000-0000-0000-000000000002'),
('a2222222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', 'President', '00000000-0000-0000-0000-000000000003')
ON CONFLICT (id) DO NOTHING;

-- 4. Demo Posts
INSERT INTO public.posts (id, author_id, club_id, author_name, author_type, type, title, description, date_info, location, tags, action_text, link) VALUES
('b1111111-1111-1111-1111-111111111111', '00000000-0000-0000-0000-000000000002', '11111111-1111-1111-1111-111111111111', 'AI Club', 'club', 'hackathon', 'AI INNOVATE 2026', 'Build innovative AI solutions and compete with students across campus.', '15 Oct 2026', 'Innovation Lab', ARRAY['AI', 'Hackathon', 'Competition'], 'Register', '#'),
('b2222222-2222-2222-2222-222222222222', '00000000-0000-0000-0000-000000000004', NULL, 'Career Cell', 'college', 'internship', 'Frontend Developer Internship', 'A paid internship opportunity for students interested in frontend development.', 'Apply before 20 Oct', 'Remote', ARRAY['Frontend', 'Internship'], 'Apply Now', '#'),
('b3333333-3333-3333-3333-333333333333', '00000000-0000-0000-0000-000000000003', '22222222-2222-2222-2222-222222222222', 'Robotics Club', 'club', 'event', 'Robotics Workshop', 'Learn robotics fundamentals and build your first autonomous bot.', '18 Oct 2026', 'Lab 3', ARRAY['Robotics', 'Workshop'], 'View Details', '#'),
('b4444444-4444-4444-4444-444444444444', '00000000-0000-0000-0000-000000000001', NULL, 'Aarav Sharma', 'student', 'opportunity', 'Looking for a Flutter teammate', 'Looking for a Flutter developer to join our hackathon team.', 'Posted today', 'Campus', ARRAY['Flutter', 'Hackathon', 'Team'], 'Connect', '#')
ON CONFLICT (id) DO NOTHING;

-- 5. Demo Conversations
INSERT INTO public.conversations (id, type, name) VALUES
('c1111111-1111-1111-1111-111111111111', 'open', 'Open Campus'),
('c2222222-2222-2222-2222-222222222222', 'group', 'Hackathon Hunters'),
('c3333333-3333-3333-3333-333333333333', 'group', 'CSE 3rd Year')
ON CONFLICT (id) DO NOTHING;

-- 6. Demo Messages
INSERT INTO public.messages (conversation_id, sender_name, content) VALUES
('c1111111-1111-1111-1111-111111111111', 'Ananya', 'Does anyone have teammates for the AI hackathon?'),
('c1111111-1111-1111-1111-111111111111', 'Aarav', 'I am looking for a frontend teammate too!'),
('c1111111-1111-1111-1111-111111111111', 'Ananya', 'Let''s connect after class.');
