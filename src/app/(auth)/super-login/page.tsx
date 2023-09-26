"use client"
import { type Metadata } from 'next';
import Link from 'next/link';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Shell } from '@/components/shells/shell';
import AnimatedCharacters from '@/components/ui/animated-characters';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { PasswordInput } from '@/components/ui/password-input';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/auth/useAuth';

export default  function SignInPage() {

  const {adminLoginForm,attemptToAdminLogin,LoginLoading}=useAuth()
  return (
    <Shell className='max-w-lg '>
      <Card className=''>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-2xl'>
            <AnimatedCharacters text='Admin Sign in' />
          </CardTitle>
        
        </CardHeader>
        <CardContent className='grid gap-4'>
        {/* <OAuthSignIn/> */}
         
        <Form {...adminLoginForm}>
      <form
        className='grid gap-4'
        onSubmit={(...args) =>
          void adminLoginForm.handleSubmit(attemptToAdminLogin)(...args)
        }
      >
        <FormField
          control={adminLoginForm.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='example@gmail.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={adminLoginForm.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder='**********' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={LoginLoading}>
          {LoginLoading && (
            <Icons.spinner
              className='mr-2 h-4 w-4 animate-spin'
              aria-hidden='true'
            />
          )}
          Sign in
          <span className='sr-only'>Sign in</span>
        </Button>
      </form>
    </Form>
        </CardContent>
        <CardFooter className='flex flex-wrap items-center justify-between gap-2'>
          <div className='text-sm text-muted-foreground'>
            <span className='mr-1 hidden sm:inline-block'>
              Don&apos;t have an account?
            </span>
            <Link
              aria-label='Sign up'
              href='/signup'
              className='text-primary underline-offset-4 transition-colors hover:underline'
            >
              Sign up
            </Link>
          </div>
          <Link
            aria-label='Reset password'
            href='/signin/reset-password'
            className='text-sm text-primary underline-offset-4 transition-colors hover:underline'
          >
            Reset password
          </Link>
        </CardFooter>
      </Card>
    </Shell>
  );
}
