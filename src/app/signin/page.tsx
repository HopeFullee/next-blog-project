import LoginForm from "@/components/signin/LoginForm";

const SignInPage = async () => {
  return (
    <section className="flex-col mx-auto gap-30 max-w-1200 flex-center">
      <LoginForm />
    </section>
  );
};

export default SignInPage;
