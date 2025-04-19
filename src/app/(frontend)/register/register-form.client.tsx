'use client'

import { Button } from '@/components/ui/button'
import { TextInput } from '@/components/ui/text-input'
import { SubmitHandler, useForm } from 'react-hook-form'

interface IFormInput {
  email: string
  password: string
  countryOfResidence: string
}

export function RegisterFormCC(): React.JSX.Element {
  const { register, handleSubmit } = useForm<IFormInput>()
  const onSubmit: SubmitHandler<IFormInput> = async (data) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-9">
        <TextInput label="Email" type="email" {...register('email')} />
        <TextInput label="Mật khẩu" {...register('password')} />
        <TextInput label="Quốc gia" {...register('countryOfResidence')} />
        <Button type="submit" size="lg">
          Đăng ký
        </Button>
      </div>
    </form>
  )
}
