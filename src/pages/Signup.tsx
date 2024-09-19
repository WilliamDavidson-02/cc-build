import Button from "@/components/Buttons";
import Textfield from "@/components/Textfield";
import Typography from "@/components/Typography";
import { useUser } from "@/context/userContext";
import { ChangeEvent, FC, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";

export const signupSchema = z.object({
  email: z.string().email({ message: "Ange en gilitig email address." }),
  firstName: z.string().min(1, { message: "Ange ditt namn" }),
  lastName: z.string().min(1, { message: "Ange ditt efternamn" }),
  password: z.string().min(8, { message: "Lösenorde är för kort." }),
});

type Field = {
  value: string;
  error: string | null;
  isValid: boolean;
};

type SignupSchema = z.infer<typeof signupSchema>;

const defaultFormState: Record<keyof SignupSchema, Field> = {
  email: {
    value: "",
    error: null,
    isValid: false,
  },
  firstName: {
    value: "",
    error: null,
    isValid: false,
  },
  lastName: {
    value: "",
    error: null,
    isValid: false,
  },
  password: {
    value: "",
    error: null,
    isValid: false,
  },
};

const Signup: FC = () => {
  const [form, setForm] = useState(defaultFormState);
  const [error, setError] = useState<string | null>(null);
  const { signUp } = useUser();

  const isValid = Object.values(form).reduce((p, c) => {
    if (!c.isValid) p = false;
    return p;
  }, true);

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const fieldName = ev.target.getAttribute(
      "name"
    ) as keyof typeof defaultFormState;

    if (!fieldName) return;

    const { value } = ev.target;
    const { success } = signupSchema.shape[fieldName].safeParse(value);

    setForm((prev) => ({
      ...prev,
      [fieldName]: {
        ...prev[fieldName],
        value,
        isValid: success,
      },
    }));
  };

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();

    if (error) setError(null);

    const values = Object.fromEntries(
      Object.entries(form).map(([key, { value }]) => [key, value])
    ) as z.infer<typeof signupSchema>;

    values.email = values.email.trim().toLowerCase();
    values.firstName = values.firstName.trim();
    values.lastName = values.lastName.trim();

    const err = await signUp(values);
    if (err) {
      setError("Gick ett att skapa konto.");
    }
  };

  return (
    <main className="p-4 flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="max-w-[500px] w-full flex flex-col gap-4"
      >
        <Typography variant="h3" as="h1">
          Skapa konto
        </Typography>
        <Textfield
          title="Namn"
          name="firstName"
          size="large"
          value={form.firstName.value}
          onChange={handleChange}
        />
        {form.firstName.error && (
          <Typography className="text-red-500" size="sm">
            {form.firstName.error}
          </Typography>
        )}
        <Textfield
          title="Efternamn"
          name="lastName"
          size="large"
          value={form.lastName.value}
          onChange={handleChange}
        />
        {form.lastName.error && (
          <Typography className="text-red-500" size="sm">
            {form.lastName.error}
          </Typography>
        )}
        <Textfield
          title="Email"
          name="email"
          size="large"
          value={form.email.value}
          onChange={handleChange}
        />
        {form.email.error && (
          <Typography className="text-red-500" size="sm">
            {form.email.error}
          </Typography>
        )}
        <Textfield
          title="Password"
          name="password"
          size="large"
          value={form.password.value}
          onChange={handleChange}
        />
        {form.password.error && (
          <Typography className="text-red-500" size="sm">
            {form.password.error}
          </Typography>
        )}
        <Button disabled={!isValid} type="submit">
          Skapa konto
        </Button>
        {error && (
          <Typography className="text-red-500 text-center" size="sm">
            {error}
          </Typography>
        )}
        <Typography className="text-center mt-4" size="sm">
          Har du redan ett konto?{" "}
          <Link to={"/sign-in"} className="underline">
            Logga in
          </Link>
        </Typography>
      </form>
    </main>
  );
};

export default Signup;
