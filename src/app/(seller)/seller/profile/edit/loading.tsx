import { Skeleton } from "@/components/ui/skeleton"

import { Shell } from "@/components/shells/shell"
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from "@/components/common/shared/page-header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function AccountEditLoading() {
  return (
    <Shell variant="sidebar">
      <PageHeader id="account-header" aria-labelledby="account-header-heading">
        <PageHeaderHeading size="sm">Account</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Manage your account settings
        </PageHeaderDescription>
      </PageHeader>
      <div className="flex items-center gap-2 w-full">
        <Card className="w-2/4">
      <section
        id="user-account-info"
        aria-labelledby="user-account-info-heading"
        className="grid gap-10 rounded-lg border p-4"
      >
        <div className="space-y-2">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </div>
        
      </section>
      </Card>
      <Card className="w-2/4"> 
      <section
        id="user-account-info"
        aria-labelledby="user-account-info-heading"
        className="grid gap-10 rounded-lg place-items-center w-full border p-4"
      >
        <div className="space-y-2 flex flex-col items-center">
          <Skeleton className="h-8 w-[200px]" />
          <Skeleton className="h-8 w-[200px]" />
          <Skeleton className="h-8 w-[200px]" />
          <Button>
            <Skeleton className="h-8 w-[80px]" />
          </Button>
        </div>
      </section>
      </Card>
      </div>
      
    </Shell>
  )
}
