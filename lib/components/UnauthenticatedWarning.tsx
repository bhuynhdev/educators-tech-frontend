import Link from "next/link";

export const UnauthenticatedWarning = () => {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <p>You are not logined yet!</p>
      <p>
        Please{" "}
        <Link href="/login">
          <a className="underline">Login</a>
        </Link>{" "}
        or{" "}
        <Link href="/register">
          <a className="underline">Register</a>
        </Link>{" "}
        first
      </p>
    </div>
  );
};
