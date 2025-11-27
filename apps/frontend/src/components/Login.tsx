import { SignIn } from "@clerk/clerk-react";

export default function Login() {
  return (
    <div style={{ marginTop: "50px" }}>
      <SignIn />
    </div>
  );
}
