import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'

import axios from "axios"

const LoginPopup = ({ setShowLogin }) => {
  const navigate = useNavigate()
  const { url, setToken } = useContext(StoreContext)
  const [currState, setCurrState] = useState("Login")
  const [errorMessage, setErrorMessage] = useState("")
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const onChangeHandler = (event) => {
    const { name, value } = event.target
    setErrorMessage("") // Clear error when typing
    setData(prev => ({ ...prev, [name]: value }))
  }

  const onLogin = async (event) => {
    event.preventDefault()
    let newUrl = url + (currState === "Login" ? "/api/user/login" : "/api/user/register")

    try {
      const response = await axios.post(newUrl, data)
      if (response.data.success) {
        setToken(response.data.token)
        localStorage.setItem("token", response.data.token)
        navigate('/menu')

        setShowLogin(false)
      } else {
        setErrorMessage(response.data.message || "Something went wrong")
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Server error. Please try again later.")
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md relative">
        <form onSubmit={onLogin}>
          {/* Title + Close */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">{currState}</h2>
            <img
              onClick={() => setShowLogin(false)}
              src={assets.cross_icon}
              alt="Close"
              className="w-5 h-5 cursor-pointer"
            />
          </div>

          {/* Inputs */}
          <div className="flex flex-col gap-4 mb-2">
            {currState === "Sign Up" && (
              <input
                name="name"
                value={data.name}
                onChange={onChangeHandler}
                type="text"
                placeholder="Your name"
                required
                className="p-2 border border-gray-300 rounded"
              />
            )}
            <input
              name="email"
              value={data.email}
              onChange={onChangeHandler}
              type="email"
              placeholder="Your email"
              required
              className="p-2 border border-gray-300 rounded"
            />
            <input
              name="password"
              value={data.password}
              onChange={onChangeHandler}
              type="password"
              placeholder="Password"
              required
              className="p-2 border border-gray-300 rounded"
            />
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="text-red-600 text-sm mb-3">{errorMessage}</div>
          )}

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-[#FF5722] text-white py-2 rounded hover:bg-gray-800 transition"
          >
            {currState === "Sign Up" ? "Create account" : "Login"}
          </button>

          {/* Terms */}
          <div className="flex items-start gap-2 text-sm mt-3">
            <input type="checkbox" required className="mt-1" />
            <p>By continuing, I agree to the terms of use & privacy policy</p>
          </div>

          {/* Toggle */}
          <p className="text-sm mt-4">
            {currState === "Login" ? (
              <>
                Create a new account?{" "}
                <span
                  onClick={() => setCurrState("Sign Up")}
                  className="text-blue-600 cursor-pointer"
                >
                  Click here
                </span>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <span
                  onClick={() => setCurrState("Login")}
                  className="text-blue-600 cursor-pointer"
                >
                  Login here
                </span>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  )
}

export default LoginPopup
