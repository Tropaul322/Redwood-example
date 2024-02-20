import { InputField, InputFieldProps } from '@redwoodjs/forms'

interface InputProps extends InputFieldProps {
  label?: string
}

const Input = ({ label, name, type }: InputProps) => {
  return (
    <>
      {label && <label htmlFor={name}>{label}</label>}
      <InputField
        type={type}
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        name={name}
        id={name}
      />
    </>
  )
}

export default Input
