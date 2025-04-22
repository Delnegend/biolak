import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import loginBanner from '../../../../public/login-banner.png'
import { RegisterFormCC } from './register-form.client'

export default async function Login() {
  return (
    <div className="mx-auto my-[88px] flex max-w-4xl overflow-hidden rounded-3xl">
      <Image
        src={loginBanner}
        alt="Login Banner"
        className="h-full max-h-[652px] w-[339px] object-cover"
      />
      <Card className="flex flex-1 flex-col border-none px-[72px] py-16">
        <CardHeader className="mb-10">
          <CardTitle className="text-center text-[2rem] font-semibold">Đăng ký</CardTitle>
          <CardDescription className="text-center">
            Đã có tài khoản? <Link href="/login">Đăng nhập</Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterFormCC />
        </CardContent>
      </Card>
    </div>
  )
}
