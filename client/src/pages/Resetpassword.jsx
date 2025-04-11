import React, { useState } from "react";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      setSuccess("");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      setSuccess("");
      return;
    }

    setError("");
    setSuccess("Password reset successfully!");
    console.log("Reset password:", newPassword);

    // Send password to backend here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-90 max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>

        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
        {success && <p className="text-green-500 mb-4 text-sm">{success}</p>}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-1">
            New Password
          </label>
          <input
          placeholder="Enter your new password"
            type="password"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Confirm New Password
          </label>
          <input
            type="password"
            placeholder="Enter the confirm password"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
