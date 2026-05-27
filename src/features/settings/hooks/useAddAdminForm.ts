"use client";

import { useState } from "react";

type UseAddAdminFormProps = {
  onSubmit: (values: { email: string; password?: string }) => Promise<void>;
  onClose: () => void;
};

export function useAddAdminForm({ onSubmit, onClose }: UseAddAdminFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (val: string) => {
    if (!val) {
      return "Vui lòng nhập địa chỉ email";
    }
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(val)) {
      return "Địa chỉ email không đúng định dạng";
    }
    return "";
  };

  const validatePassword = (val: string) => {
    if (!val) {
      return "Vui lòng nhập mật khẩu";
    }
    if (val.length < 8) {
      return "Mật khẩu phải chứa ít nhất 8 ký tự";
    }
    return "";
  };

  const handleEmailChange = (val: string) => {
    setEmail(val);
    if (emailError) {
      setEmailError(validateEmail(val));
    }
  };

  const handlePasswordChange = (val: string) => {
    setPassword(val);
    if (passwordError) {
      setPasswordError(validatePassword(val));
    }
  };

  const handleConfirm = async () => {
    const emailErr = validateEmail(email);
    const pwdErr = validatePassword(password);

    setEmailError(emailErr);
    setPasswordError(pwdErr);

    if (emailErr || pwdErr) {
      return;
    }

    try {
      await onSubmit({ email: email.trim(), password });
      resetForm();
    } catch {
    }
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setEmailError("");
    setPasswordError("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return {
    email,
    password,
    emailError,
    passwordError,
    handleEmailChange,
    handlePasswordChange,
    handleConfirm,
    handleClose,
  };
}
