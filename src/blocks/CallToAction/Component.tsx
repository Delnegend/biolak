import React from 'react'

import type { CallToActionBlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/utilities/ui'
import { Lato } from 'next/font/google'
import Link from 'next/link'

const lato = Lato({
  subsets: ['latin'],
  weight: ['400'],
})

export function CallToActionBlock(props: CallToActionBlockProps): React.JSX.Element {
  const bgUrl =
    props.background && typeof props.background === 'object' && props.background.url
      ? props.background.url
      : 'https://placehold.co/1920x1080'

  const variant = props.variant ?? 'centered'

  if (variant === 'centered')
    return (
      <div
        className="flex h-[60rem] items-center justify-center"
        style={{
          backgroundImage: `url(${bgUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Card className="flex w-5/6 max-w-[46rem] flex-col justify-center rounded-[0.5rem] border-none bg-primary-foreground p-12">
          <CardHeader>
            {props['sub-title'] && (
              <div className="text-center text-[2rem] font-bold text-primary">
                {props['sub-title']}
              </div>
            )}
            <CardTitle className="whitespace-pre-wrap text-center text-7xl font-bold leading-[4.5rem] text-primary">
              {props.title}
            </CardTitle>
            {props.description && (
              <CardDescription>
                <RichText
                  data={props.description}
                  enableGutter={false}
                  className={cn('text-balance text-center text-2xl text-[#834621]', lato.className)}
                />
              </CardDescription>
            )}
          </CardHeader>
          <CardContent className="grid max-w-[38.5rem]">
            <Link
              href={props.button.link?.url ?? '#'}
              target={props.button.link?.newTab ? '_blank' : '_self'}
              className="grid"
            >
              <Button size="lg" className="w-full max-w-[28rem] place-self-center">
                {props.button.text}
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )

  return (
    <div
      style={{
        backgroundImage: `url(${bgUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="box-content flex w-5/6 max-w-[28rem] flex-col gap-6 p-24">
        <div className="leading whitespace-pre-wrap font-serif text-8xl font-bold leading-[5rem] text-white">
          {props.title}
        </div>
        {props.description && (
          <RichText
            data={props.description}
            enableGutter={false}
            className="text-balance text-xl leading-8 text-white"
          />
        )}
        <Link
          href={props.button.link?.url ?? '#'}
          target={props.button.link?.newTab ? '_blank' : '_self'}
        >
          <Button className="w-full" size="lg">
            {props.button.text}
          </Button>
        </Link>
      </div>
    </div>
  )
}
