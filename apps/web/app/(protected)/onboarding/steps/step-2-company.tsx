'use client'

import { useState, useMemo } from 'react'
import { useOnboarding } from '../onboarding-context'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { X, Check, ChevronsUpDown } from 'lucide-react'
import { City } from 'country-state-city'
import { cn } from '@/lib/utils'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

export default function Step2Company() {
    const { data, updateData, nextStep, prevStep } = useOnboarding()
    const [open, setOpen] = useState(false)

    // Fetch Canadian cities once
    const canadianCities = useMemo(() => {
        return City.getCitiesOfCountry('CA') || []
    }, [])

    const handleNext = () => {
        if (!data.businessName || data.markets.length === 0) {
            alert('Please fill in company name and at least one market')
            return
        }
        nextStep()
    }

    const toggleCity = (cityName: string) => {
        if (data.markets.includes(cityName)) {
            updateData({ markets: data.markets.filter(c => c !== cityName) })
        } else {
            updateData({ markets: [...data.markets, cityName] })
        }
    }

    const removeCity = (cityToRemove: string) => {
        updateData({ markets: data.markets.filter(city => city !== cityToRemove) })
    }

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-white">Company & Markets</h2>
                <p className="text-zinc-400">Tell us about your business reach.</p>
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="company" className="text-zinc-300">Company Name</Label>
                    <Input
                        id="company"
                        placeholder="Your Company Name"
                        value={data.businessName}
                        onChange={(e) => updateData({ businessName: e.target.value })}
                        className="bg-zinc-900 border-zinc-800 text-white focus:ring-yellow-500 focus:border-yellow-500"
                    />
                </div>

                <div className="space-y-2">
                    <Label className="text-zinc-300">Markets/Cities (Canada)</Label>

                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className="w-full justify-between bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                            >
                                {data.markets.length > 0
                                    ? `${data.markets.length} cities selected`
                                    : "Select cities..."}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 bg-zinc-900 border-zinc-800 text-white">
                            <Command className="bg-zinc-900 text-white">
                                <CommandInput placeholder="Search Canadian city..." className="h-9 text-white" />
                                <CommandList>
                                    <CommandEmpty>No city found.</CommandEmpty>
                                    <CommandGroup className="max-h-[200px] overflow-y-auto">
                                        {canadianCities.map((city) => {
                                            const cityState = `${city.name}, ${city.stateCode}`
                                            return (
                                                <CommandItem
                                                    key={cityState} // Use cityState as key for uniqueness
                                                    value={cityState}
                                                    onSelect={() => {
                                                        // currentValue from cmdk is usually lowercased.
                                                        // We need the actual formatted string.
                                                        // But wait, cmdk onSelect gives the value prop?
                                                        // Actually shadcn/cmdk onSelect gives the value as passed to value prop but lowercased?
                                                        // Let's just use the cityState variable directly since we are inside the map.
                                                        toggleCity(cityState)
                                                    }}
                                                    className="text-zinc-300 aria-selected:bg-zinc-800 aria-selected:text-white cursor-pointer"
                                                >
                                                    <div className={cn(
                                                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                                        data.markets.includes(cityState)
                                                            ? "bg-primary text-primary-foreground"
                                                            : "opacity-50 [&_svg]:invisible"
                                                    )}>
                                                        <Check className={cn("h-4 w-4", data.markets.includes(cityState) ? "opacity-100" : "opacity-0")} />
                                                    </div>
                                                    {city.name}, {city.stateCode}
                                                </CommandItem>
                                            )
                                        })}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>

                    <div className="flex flex-wrap gap-2 mt-2">
                        {data.markets.map((city) => (
                            <div key={city} className="bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 px-3 py-1 rounded-full text-sm flex items-center gap-2 animate-in zoom-in-50 duration-200">
                                {city}
                                <button onClick={() => removeCity(city)} className="hover:text-yellow-400">
                                    <X size={14} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="pt-4 flex justify-between">
                <Button
                    variant="ghost"
                    onClick={prevStep}
                    className="text-zinc-400 hover:text-white hover:bg-zinc-800"
                >
                    Back
                </Button>
                <Button
                    onClick={handleNext}
                    className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8"
                >
                    Continue
                </Button>
            </div>
        </div>
    )
}
