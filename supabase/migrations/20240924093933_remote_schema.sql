set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.add_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
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
$function$
;


