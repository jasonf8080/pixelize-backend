import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, registerUser } from "../features/authSlice";
import ButtonLoader from "../components/ButtonLoader";
import { useNavigate } from "react-router-dom";
 

const Auth = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState("register"); // "login" | "register"
  const isRegister = mode === "register";

  const {loginLoading, user} = useSelector((store) => store.auth)
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (mode === "register") {
      await dispatch(registerUser(form)).unwrap();
    }

    if (mode === "login") {
      await dispatch(loginUser(form)).unwrap();
    }

   setTimeout(() => {
     navigate("/");
   }, 2000)
  } catch (error) {
    // Error already handled in Redux state (message)
  }
};

  return (
    <div >
      <div className="min-h-screen  text-slate-900 dark:bg-slate-950 dark:text-slate-50">
       
            {/*
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
            <div className="tracking-[0.35em] text-sm font-medium text-slate-800 dark:text-slate-200">
                PIXELIZE
            </div>

            <button
                type="button"
                className="group flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600 shadow-sm transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                aria-label="Toggle theme"
            >
                <span className="inline-flex h-7 w-14 items-center rounded-full bg-slate-100 p-1 dark:bg-slate-800">
                <span className="h-5 w-5 rounded-full bg-white shadow transition" />
                </span>
            </button>
            </div>
            


        {/* Main */}
        <div className="mx-auto flex max-w-3xl flex-col items-center px-6 pb-16 pt-6">
          {/* Toggle */}
          <div className=" my-10 flex items-center">
                <h1>{mode === 'register' ? 'register' : 'login'}</h1>
          </div>

          {/* Card-ish form container (very minimal like your screenshot) */}
          <div className="w-full">
            
            <form onSubmit={handleSubmit} className="mx-auto max-w-xl">
                <Field
                  className='text-base'
                label="USERNAME"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="USERNAME"
                />
        
              <Field
                className='text-base'
                label="PASSWORD"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
              />

      
              {/* Actions */}
              <div className="mt-10 flex items-center justify-center">
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  {loginLoading ? <ButtonLoader/> : isRegister ? "Create account" : "Sign in"}
               
                </button>
              </div>

              {/* Bottom helper */}
              <div className="mt-8 text-center text-sm text-slate-400">
                {isRegister ? (
                  <>
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setMode("login")}
                      className="text-slate-600 underline-offset-4 hover:underline dark:text-slate-200 "
                    >
                      Login
                    </button>
                  </>
                ) : (
                  <>
                    Don’t have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setMode("register")}
                      className="text-slate-600 underline-offset-4 hover:underline dark:text-slate-200"
                    >
                      Register
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

function Field({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
}) {
  return (
    <div className="mb-8">
      <label className="mb-2 block text-[11px] tracking-[0.25em] text-slate-400">
        {label}
      </label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="input"
      />
    </div>
  );
}

export default Auth;
