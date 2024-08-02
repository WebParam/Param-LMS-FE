import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Router } from "next/router";
import { useRouter } from "next/navigation";
import { ResetPassword } from "@/app/lib/actions/users";

interface ChangePasswordFormProps {
  email: string;
  otp: string;
}

export default function ChangePasswordForm({
  email,
  otp,
}: ChangePasswordFormProps) {
  const [disable, setDisable] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const router = useRouter();
  const ChangePassword = async (event: React.FormEvent) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setDisable(true);
    const _id = toast.loading("Changing password...", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    const payload = { email, password, otp };

    try {
      const response = await ResetPassword(payload);

      toast.update(_id, {
        render: `Password changed successfully. You may now login.`,
        type: "success",
        isLoading: false,
      });
      setTimeout(() => {
        router.push("/auth/admin/login");
        toast.dismiss(_id);
      }, 2000);
    } catch (error) {
      toast.update(_id, {
        render: `Error changing password.`,
        type: "error",
        isLoading: false,
      });
      setDisable(false);
      console.log(error);
    }
  };

  return (
    <div className="container page__container">
      <div className="page-separator">
        <div className="page-separator__text">Change Password</div>
      </div>
      <div className="col-sm-6 p-0">
        <form onSubmit={ChangePassword}>
          <div className="form-group">
            <label className="form-label" htmlFor="password">
              New Password:
            </label>
            <input
              id="password"
              type="password"
              className="form-control"
              placeholder="Enter new password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="confirmPassword">
              Confirm New Password:
            </label>
            <input
              id="confirmPassword"
              type="password"
              className="form-control"
              placeholder="Confirm new password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button disabled={disable} type="submit" className="btn btn-primary">
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}
