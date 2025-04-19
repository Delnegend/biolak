import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import loginBanner from '../../../../public/login-banner.png'
import { RegisterFormCC } from './register-form.client'

export default async function Login() {
  return (
    <div className="max-w-4xl flex mx-auto my-[88px] rounded-3xl overflow-hidden">
      <Image
        src={loginBanner}
        alt="Login Banner"
        className="h-full w-[339px] max-h-[652px] object-cover"
      />
      <Card className="py-16 px-[72px] flex-1 flex flex-col border-none">
        <CardHeader className="mb-10">
          <CardTitle className="text-[2rem] font-semibold text-center">Đăng ký</CardTitle>
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
