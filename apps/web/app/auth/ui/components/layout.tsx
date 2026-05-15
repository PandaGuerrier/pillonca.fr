import React from 'react'

import { Toaster } from '@workspace/ui/components/sonner'

import { AppLogo } from '#common/ui/components/app_logo'

export interface AuthLayoutProps extends React.PropsWithChildren {}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <>
      <Toaster />
      <div className="flex min-h-screen flex-col items-center justify-center p-6">
        <div className="mb-8">
          <AppLogo />
        </div>
        <div className="w-full max-w-xs">{children}</div>
      </div>
    </>
  )
}
