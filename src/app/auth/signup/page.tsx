// import Icon from "@/components/Icon";
import SwitchButton from "@/components/SwitchButton";
import { prisma } from "@/db";
import { generateHash } from "@/helpers/helper";
import { redirect } from "next/navigation";
// import { FcGoogle } from "react-icons/fc";

const registerNewUser = async (formData: FormData) => {
  "use server";

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  let password = formData.get("password") as string;
  password = generateHash(password);

  let user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (user) throw new Error(`User with email ${email} already exists.`);
  user = await prisma.user.create({
    data: {
      email,
      name,
      password,
      googleId: "dasd45",
    },
  });
  return redirect("/auth/login");
};

export default function Login() {
  return (
    <div className="relative w-full h-full bg-base-200 px-4 flex items-center justify-center">
      <SwitchButton value="LOG IN" to="/auth/login" />

      {/* <div className="relative sm:w-full md:w-1/3 bg-slate-400 h-full"> */}
      {/* <div className="w-full flex items-center justify-center h-full"> */}
      <div className="rounded-xl shadow-xl sm:w-full md:w-10/12 lg:w-1/3 bg-neutral-300">
        <div className="p-6 sm:p-16">
          <div className="">
            <img
              src="https://tailus.io/sources/blocks/social/preview/images/icon.svg"
              loading="lazy"
              className="w-10"
              alt="tailus logo"
            />
            <h2 className="mb-8 text-2xl text-cyan-900 font-bold">
              Sign Up to unlock the <br /> best of SecureStore.
            </h2>
          </div>
          <div className="mt-16 w-full">
            <form action={registerNewUser}>
              <div className="flex flex-col items-center justify-center gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="input input-bordered w-full"
                  name="name"
                  id="name"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="input input-bordered w-full"
                  name="email"
                  id="email"
                  required
                />
                <input
                  type="text"
                  placeholder="Password"
                  className="input input-bordered w-full"
                  name="password"
                  id="password"
                  required
                />
                <input
                  type="text"
                  placeholder="Confirm Password"
                  className="input input-bordered w-full"
                  name="confirm-password"
                  id="confirm-password"
                  required
                />
                <button
                  type="submit"
                  className="btn btn-primary sm:w-full md:w-2/3 lg:w-1/3"
                >
                  Register
                </button>
              </div>
            </form>
            {/* <button
                  className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 
 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100"
                >
                  <div className="relative flex items-center space-x-4 justify-center ">
                    <img
                      src="https://tailus.io/sources/blocks/social/preview/images/google.svg"
                      className="w-5"
                      alt="google logo"
                    />
                    <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
                      Continue with Google
                    </span>
                  </div>
                </button> */}
          </div>
          {/* <div className="mt-32 space-y-4 text-gray-600 text-center sm:-mb-8">
              </div> */}
        </div>
      </div>
    </div>
    //   </div>
    // </div>
  );
}
