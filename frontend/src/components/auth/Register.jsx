import React, { useState, useEffect } from "react";
import { useRegisterMutation } from "../redux/authApi";
import toast from "react-hot-toast";

function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const [register, { isLoading, error, data }] = useRegisterMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message || "An error occurred"); // แสดงข้อความผิดพลาด
    }
  }, [error]);

  const SubmitHandles = async (e) => {
    e.preventDefault(); // ป้องกันการรีโหลดหน้า
    const registerData = { name, email, password };

    try {
      const result = await register(registerData).unwrap(); // เรียก API register
      console.log("Register successful:", result);
      toast.success("Register successful!"); // แสดงข้อความสำเร็จ
    } catch (err) {
      console.error("Register failed:", err);
      // ข้อความผิดพลาดจะถูกจัดการใน useEffect
    }
  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form className="shadow rounded bg-body" onSubmit={SubmitHandles}>
          <h2 className="mb-4">Register</h2>

          <div className="mb-3">
            <label htmlFor="name_field" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name_field"
              className="form-control"
              name="name"
              value={name}
              onChange={onChange}
            />
          </div>

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
              onChange={onChange}
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
              onChange={onChange}
            />
          </div>

          <button
            id="register_button"
            type="submit"
            className="btn w-100 py-2"
            disabled={isLoading}
          >
            {isLoading ? "ກຳລັງສະໝັກສະມາຊິກ..." : "REGISTER"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;