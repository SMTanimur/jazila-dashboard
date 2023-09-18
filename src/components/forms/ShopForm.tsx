import React from 'react'
import { Card, CardContent } from '../ui/card'
import { IShop } from '@/types'
interface ShopFormProps {
  initialData?: IShop
}
const ShopForm = ({initialData}:ShopFormProps) => {
  
  return (
    <React.Fragment>
      <Card className='rounded-xl p-4'>
        
        <CardContent >
         <div>
          hello
         </div>
        </CardContent>

      </Card>
    </React.Fragment>
  )
}

export default ShopForm