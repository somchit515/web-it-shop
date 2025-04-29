import React, { useEffect, useState } from "react";
import { useLoginMutation } from "../redux/authApi";
import toast from "react-hot-toast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { isLoading, error, data }] = useLoginMutation();
  console.log(data)

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message || "An error occurred"); // แสดงข้อความผิดพลาด
    }
  }, [error]);

  const SubmitHandles = async (e) => {
    e.preventDefault(); // ป้องกันการรีโหลดหน้า
    const loginData = { email, password };

    try {
      const result = await login(loginData).unwrap(); // เรียก API login
      console.log("Login successful:", result);
      toast.success("Login successful!"); // แสดงข้อความสำเร็จ
    } catch (err) {
      console.error("Login failed:", err);
      // ข้อความผิดพลาดจะถูกจัดการใน useEffect
    }
  };

  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form className="shadow rounded bg-body" onSubmit={SubmitHandles}>
          <h2 className="mb-4">Login</h2>
          <div className="mb-3">
            <label htmlFor="email_field" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email_field"
              className="form-control"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password_field" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password_field"
              className="form-control"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <a href="/password/forgot" className="float-end mb-4">
            ເຈົ້າລືມລະຫັດຜ່ານບໍ?
          </a>

          <button
            id="login_button"
            type="submit"
            className="btn w-100 py-2"
            disabled={isLoading}
          >
            {isLoading ? "Authenticating..." : "LOGIN"}
          </button>

          <div className="my-3">
            <a href="/register" className="float-end">
              ສະໝັກສະມາຊິກ
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;