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
import { Textarea } from "@/components/ui/textarea";

import { IncomeValidation } from "@/lib/validations/income";
import { createIncome } from "@/lib/actions/income.actions";

interface Props {
  userId: string;
}

function AddIncome({ userId }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<z.infer<typeof IncomeValidation>>({
    resolver: zodResolver(IncomeValidation),
    defaultValues: {
      userId: userId,
      amount: "",
      source: "",
      description: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof IncomeValidation>) => {
    //const amountNumber: number = Number(values.amount);
    console.log("Create Income");
    await createIncome({
      userId: userId,
      amount: values.amount,
      source: values.source,
      description: values.description,
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
        {/* Income Amount Input */}
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
        {/* Income Source Input */}
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
        {/* Income Description Input */}
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='text-base-semibold text-light-2'>
                Description
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
          Add Income
        </Button>
      </form>
    </Form>
  );
}

export default AddIncome;