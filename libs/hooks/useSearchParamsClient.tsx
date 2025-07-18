'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

function useSearchParamsClient<T extends string>(key: string, defaultValue: T): [T, (value: string) => void] {
    const router = useRouter()
    const searchParams = useSearchParams()

    const currentValue = (searchParams.get(key) as T) ?? defaultValue

    const setValue = useCallback(
        (value: string | ((currentValue: T) => string)) => {
            const newValue = typeof value === 'function' ? (value as (currentValue: T) => string)(currentValue) : value
            const params = new URLSearchParams(searchParams.toString())
            params.set(key, newValue)
            router.replace(`?${params.toString()}`, { scroll: false })
        },
        [key, router, searchParams, currentValue]
    )

    return [currentValue, setValue]
}

export default useSearchParamsClient