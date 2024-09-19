import { supabase } from "@/lib/sbClient";
import { signinSchema } from "@/pages/Signin";
import { signupSchema } from "@/pages/Signup";
import { AuthError, User } from "@supabase/supabase-js";
import React, { FC, useEffect, useState } from "react";
import { z } from "zod";

type UserContextProps = {
  user: User | null;
  isLoading: boolean;
  signIn: (
    values: z.infer<typeof signinSchema>
  ) => Promise<AuthError | undefined>;
  signUp: (
    values: z.infer<typeof signupSchema>
  ) => Promise<AuthError | undefined>;
  signOut: () => Promise<AuthError | undefined>;
};

export const UserContext = React.createContext<UserContextProps | null>(null);

type UserProviderProps = {
  children: React.ReactNode;
};

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { session } = (await supabase.auth.getSession()).data;

      if (!session) {
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase.auth.getUser();

      if (error) {
        setIsLoading(false);
        return;
      }

      setUser(data.user);
      setIsLoading(false);
    };

    getUser();
  }, []);

  const signIn = async (values: z.infer<typeof signinSchema>) => {
    const { data, error } = await supabase.auth.signInWithPassword(values);

    if (error) return error;

    setUser(data.user);
  };

  const signUp = async (values: z.infer<typeof signupSchema>) => {
    const { email, password, firstName, lastName } = values;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    });

    if (error) return error;

    setUser(data.user);
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) return error;

    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, isLoading, signIn, signUp, signOut }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = React.useContext(UserContext);

  if (!context) {
    throw Error("Must use UserContext with in a UserProvider.");
  }

  return context;
};
