-- Function to add new user
CREATE OR REPLACE FUNCTION public.add_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $$
BEGIN
  -- Insert new row into public.profile table
  INSERT INTO public.profile(id, email, first_name, last_name)
  VALUES (
    NEW.id, 
    NEW.email, 
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name'
  );

  -- Return the newly inserted record
  RETURN NEW;
END;
$$;

-- Set ownership
ALTER FUNCTION public.add_new_user() OWNER TO postgres;

-- Drop the existing trigger
DROP TRIGGER IF EXISTS on_auth_user_insert ON auth.users;

-- Trigger to call the function
CREATE TRIGGER on_auth_user_insert
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.add_new_user();

-- Create profile table
CREATE TABLE IF NOT EXISTS public.profile (
    id uuid DEFAULT auth.uid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    first_name text,
    last_name text,
    email text,
    PRIMARY KEY (id),
    FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Set ownership
ALTER TABLE public.profile OWNER TO postgres;

-- Row Level Security Policy
DROP POLICY IF EXISTS "allow all" ON public.profile;

CREATE POLICY "allow all" ON public.profile
USING (true) WITH CHECK (true);

-- Enable RLS
ALTER TABLE public.profile ENABLE ROW LEVEL SECURITY;

-- Grant permissions
GRANT ALL ON FUNCTION public.add_new_user() TO anon;
GRANT ALL ON FUNCTION public.add_new_user() TO authenticated;
GRANT ALL ON FUNCTION public.add_new_user() TO service_role;

GRANT ALL ON TABLE public.profile TO anon;
GRANT ALL ON TABLE public.profile TO authenticated;
GRANT ALL ON TABLE public.profile TO service_role;

-- Default privileges
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO service_role;

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO service_role;

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO service_role;