"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form"
import { Input } from "@components/ui/input"

const schema = z.object({
  email: z.string().min(2).max(50),
})

type Schema = z.infer<typeof schema>

export function GeneralForm() {
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "zaruga@zaruga.peek.com",
    },
    mode: "onChange",
  })

  const onSubmit = (values: Schema) => {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="zaruga@" {...field} />
              </FormControl>
              <FormDescription>This is your Email address.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
