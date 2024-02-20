import { useState } from 'react'

import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from 'firebase/storage'

import {
  FieldError,
  FileField,
  Form,
  Label,
  Submit,
  TextField,
} from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { Metadata, useMutation } from '@redwoodjs/web'
import { Toaster, toast } from '@redwoodjs/web/dist/toast'

import Loader from 'src/components/Loader/Loader'

import { storage } from '../../lib/storage'

const CREATE_PRODUCT = gql`
  mutation CreateProductMutation($input: CreateProductInput!) {
    createProduct(input: $input) {
      id
    }
  }
`

const CreateProductPage = () => {
  const [create] = useMutation(CREATE_PRODUCT)
  const [imageUrl, setImageUrl] = useState(null)
  const [loading, setLoading] = useState(false)

  const onImageChange = async (e) => {
    setLoading(true)
    const imageToUpload = e.target.files[0]
    if (imageToUpload === null) {
      toast.error('Please select an image')
      return
    }

    const imageRef = storageRef(storage, `products/${imageToUpload.name}`)

    await uploadBytes(imageRef, imageToUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrl(url)
        setLoading(false)
      })
    })
  }

  const onSubmit = async (data) => {
    try {
      await create({
        variables: {
          input: {
            name: data.name,
            price: data.price,
            image:
              imageUrl ||
              'https://cdn3.iconfinder.com/data/icons/online-states/150/Photos-512.png',
          },
        },
      })

      toast.success('Product created')
      navigate(routes.myProducts())
    } catch (err) {
      toast.error(err.message)
    }
  }

  return (
    <div className="w-2/4 p-10">
      {loading && <Loader />}
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <Metadata title="CreateProduct" description="CreateProduct page" />
      <h2 className="text-2xl font-bold">Create new Product</h2>

      <Form onSubmit={onSubmit} className="mt-4 flex w-full flex-col gap-3">
        <div className="h-full w-full">
          <img
            className="w-36"
            src={
              imageUrl ||
              'https://cdn3.iconfinder.com/data/icons/online-states/150/Photos-512.png'
            }
            alt=""
          />

          <FileField
            name="image"
            validation={{
              required: { value: true, message: 'Image is required' },
            }}
            onChange={onImageChange}
          />
          <FieldError name="image" className="rw-field-error" />
        </div>
        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Title of the product
        </Label>
        <TextField
          name="name"
          placeholder="Enter title of the product"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          errorClassName="rw-input rw-input-error"
          validation={{
            required: {
              value: true,
              message: 'Name is required',
            },
          }}
        />
        <FieldError name="name" className="rw-field-error" />

        <Label
          name="price"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Price
        </Label>
        <TextField
          name="price"
          placeholder="Enter price of the product"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          errorClassName="rw-input rw-input-error"
          validation={{
            required: {
              value: true,
              message: 'Price is required',
            },
          }}
        />
        <FieldError name="price" className="rw-field-error" />

        <Submit
          disabled={loading}
          className="h-10 w-36 self-end rounded-md bg-blue-500 px-2 text-white disabled:pointer-events-none disabled:bg-slate-300"
        >
          Upload Product
        </Submit>
      </Form>
    </div>
  )
}

export default CreateProductPage
