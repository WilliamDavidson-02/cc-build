import Button from "@/components/Buttons";
import Textfield from "@/components/Textfield";
import Typography from "@/components/Typography";
import { useUser } from "@/context/userContext";
import { ChangeEvent, FC, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";

export const signinSchema = z.object({
  email: z.string().email({ message: "Ange en gilitig email address." }),
  password: z.string().min(8, { message: "Lösenorde är för kort." }),
});

type Field = {
  value: string;
  error: string | null;
  isValid: boolean;
};

type SigninSchema = z.infer<typeof signinSchema>;

const defaultFormState: Record<keyof SigninSchema, Field> = {
  email: {
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

const Signin: FC = () => {
  const [form, setForm] = useState(defaultFormState);
  const [error, setError] = useState<string | null>(null);
  const { signIn } = useUser();

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
    const { success } = signinSchema.shape[fieldName].safeParse(value);

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
    ) as z.infer<typeof signinSchema>;

    const err = await signIn(values);
    if (err?.status === 400) {
      setError("Ogiltig email eller lösenord");
    }
  };

  return (
    <main className="p-4 flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="max-w-[500px] w-full flex flex-col gap-4"
      >
        <Typography variant="h3" as="h1">
          Logga in
        </Typography>
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
          Logga in
        </Button>
        {error && (
          <Typography className="text-red-500 text-center" size="sm">
            {error}
          </Typography>
        )}
        <Typography className="text-center mt-4" size="sm">
          Har du inget konto?{" "}
          <Link to={"/sign-up"} className="underline">
            Skap konto
          </Link>
        </Typography>
      </form>
    </main>
  );
};

export default Signin;
