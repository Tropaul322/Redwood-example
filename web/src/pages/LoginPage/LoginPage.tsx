import { useRef } from 'react'
import { useEffect } from 'react'

import image from 'public/image2.png'

import {
  Form,
  Label,
  TextField,
  PasswordField,
  Submit,
  FieldError,
} from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'

const LoginPage = () => {
  const { isAuthenticated, logIn } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.marketplace())
    }
  }, [isAuthenticated])

  const emailRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    emailRef.current?.focus()
  }, [])

  const onSubmit = async (data: Record<string, string>) => {
    console.log(data)
    const response = await logIn({
      username: data.email,
      password: data.password,
    })

    if (response.message) {
      toast(response.message)
    } else if (response.error) {
      toast.error(response.error)
    } else {
      toast.success('Welcome back!')
    }
  }

  return (
    <>
      <Metadata title="Login" />
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />

      <div className="flex h-screen justify-between gap-3 bg-gray-0 p-8">
        <div className="flex w-2/4 items-center justify-center">
          <div className="flex w-3/4 flex-col items-center justify-center gap-5">
            <Form onSubmit={onSubmit} className="flex w-full flex-col gap-3">
              <Label
                name="username"
                className="text-2xl font-bold"
                errorClassName="rw-label rw-label-error"
              >
                Sign In
              </Label>

              <Label
                name="email"
                className="rw-label"
                errorClassName="rw-label rw-label-error"
              >
                Email
              </Label>
              <TextField
                name="email"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                errorClassName="rw-input rw-input-error"
                ref={emailRef}
                validation={{
                  required: {
                    value: true,
                    message: 'Email is required',
                  },
                }}
              />
              <FieldError name="email" className="rw-field-error" />

              <Label
                name="password"
                className="rw-label"
                errorClassName="rw-label rw-label-error"
              >
                Password
              </Label>
              <PasswordField
                name="password"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                errorClassName="rw-input rw-input-error"
                autoComplete="current-password"
                validation={{
                  required: {
                    value: true,
                    message: 'Password is required',
                  },
                }}
              />
              <FieldError name="password" className="rw-field-error" />

              <Submit className="h-10 rounded-md bg-blue-500 text-white">
                Sign In
              </Submit>
            </Form>
            <p>
              Don{"'"}t have an account ?
              <Link className="text-blue-700" to={routes.signup()}>
                Sign Up
              </Link>
            </p>
          </div>
        </div>
        <div className=" flex w-2/4 flex-col items-center justify-center">
          <img className="h-full w-full pl-8" src={image} alt="landscape" />
        </div>
      </div>
    </>
  )
}

export default LoginPage
