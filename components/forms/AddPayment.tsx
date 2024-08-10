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

import { PaymentValidation } from "@/lib/validations/payment";
import { createIncome } from "@/lib/actions/income.actions";

interface Props {
  userId: string;
  createMethod: ({
    userId,
    amount,
    source,
    path,
  }: {
    userId: string;
    amount: number;
    source: string;
    path: string;
  }) => Promise<void>;
  //addMethod: (userId: string, amount: string, source: string, path: string) => Promise<void>;
}

function AddPayment({ userId, createMethod }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<z.infer<typeof PaymentValidation>>({
    resolver: zodResolver(PaymentValidation),
    defaultValues: {
      userId: userId,
      amount: "",
      source: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof PaymentValidation>) => {
    await createMethod({
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
        {/* Amount Input */}
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
        {/* Source Input */}
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
          Add
        </Button>
      </form>
    </Form>
  );
}

export default AddPayment;