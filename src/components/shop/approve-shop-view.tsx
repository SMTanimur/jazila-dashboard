import { useShop } from '@/hooks/shops/useShop';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Icons } from '../ui/icons';

import { Card } from '../ui/card';

const ApproveShopView = () => {
  const { shopApproveForm, shopApproveLoading, attemptToApproveShop } =
    useShop();


  return (
    <Card className='p-6'>
      <Form {...shopApproveForm}>
        <form
          className='grid gap-4'
          onSubmit={(...args) =>
            void shopApproveForm.handleSubmit(attemptToApproveShop)(...args)
          }
        >
          <FormField
            control={shopApproveForm.control}
            name='admin_commission_rate'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Admin Commission Rate</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type='number'
                    inputMode='numeric'
                    onChange={e => {
                      const value = e.target.value;
                      const parsedValue = parseInt(value, 10);
                      if (isNaN(parsedValue)) return;
                      field.onChange(parsedValue);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={shopApproveLoading}>
            {shopApproveLoading && (
              <Icons.spinner
                className='mr-2 h-4 w-4 animate-spin'
                aria-hidden='true'
              />
            )}
            Approve
            <span className='sr-only'>Approve</span>
          </Button>
        </form>
      </Form>
    </Card>
  );
};

export default ApproveShopView;
