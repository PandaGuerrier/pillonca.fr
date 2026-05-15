import { Field, FieldError, Form } from '#common/ui/components/form'
import useFlashMessage from '#common/ui/hooks/use_flash_message'

import { cn } from '@workspace/ui/lib/utils'
import { Button } from '@workspace/ui/components/button'
import { Input } from '@workspace/ui/components/input'
import { FieldSet, FieldGroup, FieldLabel } from '@workspace/ui/components/field'
import { PasswordInput } from '@workspace/ui/components/password-input'

export function LoginForm({ className }: { className?: string }) {
  const errorMessage = useFlashMessage('error')

  return (
    <Form route="auth.sign_in.handle" className={cn('flex flex-col gap-6', className)}>
      {({ processing }) => (
        <>
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">Connexion administrateur</h1>
            <p className="text-sm text-muted-foreground">Accès réservé aux administrateurs</p>
          </div>

          <FieldSet>
            <FieldGroup>
              <Field name="email">
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="admin@pillonca.fr"
                  required
                />
                <FieldError />
              </Field>
              <Field name="password">
                <FieldLabel htmlFor="password">Mot de passe</FieldLabel>
                <PasswordInput
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  required
                />
                <FieldError />
              </Field>
              <Field orientation="responsive">
                <Button type="submit" disabled={processing}>
                  Se connecter
                </Button>
              </Field>
              <FieldError errors={errorMessage ? [{ message: errorMessage }] : []} />
            </FieldGroup>
          </FieldSet>
        </>
      )}
    </Form>
  )
}
