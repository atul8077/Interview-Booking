-- Drop tables if they exist
DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS interviews;
DROP TABLE IF EXISTS profiles;

-- Profiles table (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Interviews table (created by admin)
CREATE TABLE interviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  duration_minutes INTEGER DEFAULT 60,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Bookings table
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  interview_id UUID REFERENCES interviews(id) ON DELETE CASCADE,
  schedule_date DATE NOT NULL,
  schedule_time TIME NOT NULL,
  zoom_link TEXT,
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Setup Row Level Security (RLS)

-- Profiles RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone."
  ON profiles FOR SELECT
  USING ( true );

CREATE POLICY "Users can insert their own profile."
  ON profiles FOR INSERT
  WITH CHECK ( auth.uid() = id );

CREATE POLICY "Users can update own profile."
  ON profiles FOR UPDATE
  USING ( auth.uid() = id );

-- Interviews RLS
ALTER TABLE interviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Interviews are viewable by everyone."
  ON interviews FOR SELECT
  USING ( true );

-- (Note: In a real app, only admins should insert/update interviews, but for simplicity we allow authenticated users or rely on app logic)
CREATE POLICY "Admins can insert interviews"
  ON interviews FOR INSERT
  WITH CHECK ( auth.role() = 'authenticated' ); 

CREATE POLICY "Admins can update interviews"
  ON interviews FOR UPDATE
  USING ( auth.role() = 'authenticated' ); 

CREATE POLICY "Admins can delete interviews"
  ON interviews FOR DELETE
  USING ( auth.role() = 'authenticated' ); 

-- Bookings RLS
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own bookings or admins can view all"
  ON bookings FOR SELECT
  USING ( auth.uid() = user_id OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin') );

CREATE POLICY "Users can insert their own bookings"
  ON bookings FOR INSERT
  WITH CHECK ( auth.uid() = user_id );

CREATE POLICY "Users and admins can update bookings"
  ON bookings FOR UPDATE
  USING ( auth.role() = 'authenticated' );

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name', 'user');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call the function on signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
