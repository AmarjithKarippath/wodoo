"use client"

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CheckCircle2, Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { COUNTRIES } from "@/lib/countries"
import { cn } from "@/lib/utils"

const registrationSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email("Enter a valid email"),
  storeName: z.string().trim().min(1, "Store name is required"),
  country: z.string().trim().min(1, "Country is required"),
  website: z
    .string()
    .trim()
    .optional()
    .refine(
      (value) => !value || /^https?:\/\/.+/i.test(value),
      "Enter a valid URL (include https://)",
    ),
})

type RegistrationForm = z.infer<typeof registrationSchema>

type RegistrationContextValue = {
  openRegistration: () => void
}

const RegistrationContext = createContext<RegistrationContextValue | null>(null)

export function useRegistration() {
  const context = useContext(RegistrationContext)
  if (!context) {
    throw new Error("useRegistration must be used within RegistrationProvider")
  }
  return context
}

function RegistrationDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [step, setStep] = useState<"form" | "success">("form")
  const [submittedEmail, setSubmittedEmail] = useState("")
  const [submitError, setSubmitError] = useState<string | null>(null)

  const form = useForm<RegistrationForm>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      name: "",
      email: "",
      storeName: "",
      country: "",
      website: "",
    },
  })

  const resetDialog = useCallback(() => {
    setStep("form")
    setSubmittedEmail("")
    setSubmitError(null)
    form.reset()
  }, [form])

  const handleOpenChange = (nextOpen: boolean) => {
    onOpenChange(nextOpen)
    if (!nextOpen) {
      resetDialog()
    }
  }

  const onSubmit = form.handleSubmit(async (values) => {
    setSubmitError(null)

    const response = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        storeName: values.storeName,
        country: values.country,
        website: values.website?.trim() || undefined,
      }),
    })

    const data = (await response.json()) as { error?: string }

    if (!response.ok) {
      setSubmitError(data.error ?? "Something went wrong. Please try again.")
      return
    }

    setSubmittedEmail(values.email)
    setStep("success")
  })

  const fieldClassName =
    "focus-visible:border-ink focus-visible:ring-ink/25"

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        {step === "form" ? (
          <>
            <DialogHeader>
              <DialogTitle>Create your store</DialogTitle>
              <DialogDescription>
                Get started in minutes. Tell us a bit about you and your shop.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full name</Label>
                <Input
                  id="name"
                  autoComplete="name"
                  placeholder="Jane Doe"
                  className={fieldClassName}
                  aria-invalid={!!form.formState.errors.name}
                  {...form.register("name")}
                />
                {form.formState.errors.name && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className={fieldClassName}
                  aria-invalid={!!form.formState.errors.email}
                  {...form.register("email")}
                />
                {form.formState.errors.email && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="storeName">Store name</Label>
                <Input
                  id="storeName"
                  autoComplete="organization"
                  placeholder="Wildgood Co."
                  className={fieldClassName}
                  aria-invalid={!!form.formState.errors.storeName}
                  {...form.register("storeName")}
                />
                {form.formState.errors.storeName && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.storeName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <select
                  id="country"
                  autoComplete="country-name"
                  className={cn(
                    "border-input bg-transparent shadow-xs flex h-9 w-full rounded-md border px-3 py-1 text-base outline-none transition-[color,box-shadow] md:text-sm",
                    "focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
                    "aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
                    fieldClassName,
                  )}
                  aria-invalid={!!form.formState.errors.country}
                  {...form.register("country")}
                >
                  <option value="">Select your country</option>
                  {COUNTRIES.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
                {form.formState.errors.country && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.country.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">
                  Website{" "}
                  <span className="text-muted-foreground">(optional)</span>
                </Label>
                <Input
                  id="website"
                  type="url"
                  autoComplete="url"
                  placeholder="https://yourbrand.com"
                  className={fieldClassName}
                  aria-invalid={!!form.formState.errors.website}
                  {...form.register("website")}
                />
                {form.formState.errors.website && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.website.message}
                  </p>
                )}
              </div>

              {submitError && (
                <p className="text-sm text-destructive">{submitError}</p>
              )}

              <Button
                type="submit"
                className="w-full rounded-full bg-ink text-ink-foreground hover:bg-ink/90 focus-visible:border-ink focus-visible:ring-ink/30"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Creating your store...
                  </>
                ) : (
                  "Create store"
                )}
              </Button>
            </form>
          </>
        ) : (
          <div className="space-y-4 py-2 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-ink/10 text-ink">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <DialogHeader className="text-center sm:text-center">
              <DialogTitle>You&apos;re on the list!</DialogTitle>
              <DialogDescription className="text-pretty">
                Due to high demand, you&apos;re on our waiting list. We&apos;ll get
                your store ready soon and reach out at{" "}
                <span className="font-medium text-foreground">
                  {submittedEmail}
                </span>{" "}
                when it&apos;s your turn.
              </DialogDescription>
            </DialogHeader>
            <Button
              type="button"
              className="w-full rounded-full bg-ink text-ink-foreground hover:bg-ink/90 focus-visible:border-ink focus-visible:ring-ink/30"
              onClick={() => handleOpenChange(false)}
            >
              Got it
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export function RegistrationProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)

  const value = useMemo(
    () => ({
      openRegistration: () => setOpen(true),
    }),
    [],
  )

  return (
    <RegistrationContext.Provider value={value}>
      {children}
      <RegistrationDialog open={open} onOpenChange={setOpen} />
    </RegistrationContext.Provider>
  )
}
