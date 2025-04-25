"use client";

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const Player = dynamic(() => import('lottie-react'), { ssr: false });

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [animationData, setAnimationData] = useState(null);
  const [username, setUsername] = useState('');
  const [fullname, setFullname] = useState('');
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    fetch('/anim/success.json')
      .then(response => response.json())
      .then(data => setAnimationData(data));
  }, []);

  const validateEmail = () => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email)) {
      setError('Email tidak valid.');
      setIsEmailValid(false);
      return false;
    }
    setError('');
    setIsEmailValid(true);
    return true;
  };

  const validatePassword = () => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&+=])[A-Za-z\d@#$%^&+=]{8,}$/;
    if (!passwordRegex.test(password)) {
      setError('Password harus minimal 8 karakter, mengandung setidaknya 1 angka, 1 huruf, dan 1 karakter khusus.');
      setIsPasswordValid(false);
      return false;
    }
    setError('');
    setIsPasswordValid(true);
    return true;
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const uploadFileWithProgress = async (file: File) => {
    try {
      const timestamp = Date.now();
      const { data, error } = await supabase.storage
        .from('streem')
        .upload(`users/${timestamp}_${file.name}`, file);

      if (error) {
        throw new Error('Failed to upload avatar.');
      }

      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    setError(''); // Reset error message
    setUploadProgress(0); // Reset progress
    try {
      const response = await uploadFileWithProgress(file);
      const { data } = supabase.storage
        .from('streem')
        .getPublicUrl(response.path);
      setAvatarUrl(data.publicUrl);
    } catch (error) {
      console.log(error);
      setError('Failed to upload avatar.');
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail() || !validatePassword()) return;

    setIsLoading(true);
    const { data: signUpData, error } = await supabase.auth.signUp({ email, password });
    if (!error && signUpData.user) {
      // Insert new user data into the users table
      console.log(avatarUrl);
      const { error: insertError } = await supabase.from('users').insert({
        id: signUpData.user.id,
        email: signUpData.user.email,
        username,
        fullname,
        avatar_url: avatarUrl,
        // Add other fields as necessary
      });
      setIsLoading(false);
      if (insertError) {
        setError(insertError.message);
      } else {
        setSuccess('Pendaftaran berhasil! Silakan <a href="/signin" class="text-blue-500 hover:underline">login di sini</a>.');
      }
    } else {
      setIsLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-80">
        <Image src="/streem.png" alt="Streem Logo" width={100} height={100} className="mx-auto mb-4" priority />
        {!success && <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>}
        {success ? (
          <div className="text-center">
            {animationData && (
              <div className="flex justify-center mb-4">
                <Player
                  autoplay
                  loop={false}
                  animationData={animationData}
                  style={{ height: '150px', width: '150px' }}
                />
              </div>
            )}
            <h2 className="text-xl font-bold mb-4">Selamat!</h2>
            <p className="text-green-500 mb-4" dangerouslySetInnerHTML={{ __html: success }}></p>
            <p>Terima kasih telah bergabung dengan kami. Nikmati pengalaman baru Anda!</p>
          </div>
        ) : (
          <form onSubmit={handleSignUp} className="flex flex-col">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mb-4 p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Full Name"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              required
              className="mb-4 p-2 border border-gray-300 rounded"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={validateEmail}
              required
              className="mb-4 p-2 border border-gray-300 rounded"
            />
            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={validatePassword}
                required
                className="p-2 border border-gray-300 rounded w-full"
              />
              <span
                onClick={togglePasswordVisibility}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
            <div className="mb-4">
              <input type="file" onChange={handleAvatarUpload} style={{ display: 'none' }} id="fileInput" />
              <button type="button" className="bg-blue-500 text-white hover:bg-blue-600 cursor-pointer p-2 rounded" onClick={() => document.getElementById('fileInput').click()}>Choose file</button>
              {uploadProgress > 0 && uploadProgress < 100 && (
                <progress value={uploadProgress} max="100">{uploadProgress}%</progress>
              )}
              {avatarUrl && <img src={avatarUrl} alt="Uploaded Avatar" style={{ width: '100px', height: '100px' }} />}
            </div>
            <button
              type="submit"
              className={`p-2 rounded ${isEmailValid && isPasswordValid && !isLoading ? 'bg-blue-500 text-white hover:bg-blue-600 cursor-pointer' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
              disabled={!isEmailValid || !isPasswordValid || isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                  Mendaftarkan...
                </div>
              ) : (
                'Sign Up'
              )}
            </button>
          </form>
        )}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
}
