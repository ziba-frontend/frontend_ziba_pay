import React from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { useBreadcrumbStore } from '@/store/bread-crumb'
import Link from 'next/link'

const BreadCrumb = () => {
    const { breadcrumbItems } = useBreadcrumbStore()
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {breadcrumbItems.map((breadcrumbItem, index) => {
                    return (
                        <div key={index} className='flex flex-wrap items-center gap-1.5 break-words text-sm text-slate-500 sm:gap-2.5 dark:text-slate-400'>
                            <BreadcrumbItem>
                                <Link className='text-sm text-[#070B14]' href={breadcrumbItem.href}>{breadcrumbItem.name}</Link>
                            </BreadcrumbItem>
                            {breadcrumbItems.length !== index + 1 && <BreadcrumbSeparator />}
                        </div>
                    )
                })}
            </BreadcrumbList>
        </Breadcrumb>
    )
}

export default BreadCrumb