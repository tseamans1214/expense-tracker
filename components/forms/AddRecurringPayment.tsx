"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { RecurringPaymentValidation } from "@/lib/validations/recurring-payment";
import { createRecurringPayment } from "@/lib/actions/recurring-payment.actions";

interface Props {
  userId: string;
}

function AddRecurringPayment({ userId }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<z.infer<typeof RecurringPaymentValidation>>({
    resolver: zodResolver(RecurringPaymentValidation),
    defaultValues: {
      userId: userId,
      amount: "",
      source: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof RecurringPaymentValidation>) => {
    await createRecurringPayment({
      userId: userId,
      amount: values.amount,
      source: values.source,
      path: pathname,
    });
    router.refresh();
  };

  return (
    <Form {...form}>
      <form
        className='mt-10 flex flex-col justify-start gap-10'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {/* Recurring Amount Input */}
        <FormField
          control={form.control}
          name='amount'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='text-base-semibold text-light-2'>
                Amount
              </FormLabel>
              <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1'>
                <Input 
                type="number"
                className=''
                {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Recurring Source Input */}
        <FormField
          control={form.control}
          name='source'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='text-base-semibold text-light-2'>
                Source
              </FormLabel>
              <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1'>
                <Input 
                type="text"
                className=''
                {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit'>
          Add Recurring Payment
        </Button>
      </form>
    </Form>
  );
}

export default AddRecurringPayment;