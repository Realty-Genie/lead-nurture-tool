'use client'

import { useOnboarding } from '../onboarding-context'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function Step3Branding() {
    const { data, updateData, nextStep, prevStep } = useOnboarding()

    const handleNext = () => {
        if (!data.realtorType) {
            alert('Please select a realtor type')
            return
        }
        nextStep()
    }

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-white">Branding</h2>
                <p className="text-zinc-400">Define your professional identity.</p>
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <Label className="text-zinc-300">Realtor Type</Label>
                    <Select
                        value={data.realtorType}
                        onValueChange={(val: any) => updateData({ realtorType: val })}
                    >
                        <SelectTrigger className="bg-zinc-900 border-zinc-800 text-white focus:ring-yellow-500 focus:border-yellow-500">
                            <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                            <SelectItem value="Individual">Individual</SelectItem>
                            <SelectItem value="Agency">Agency</SelectItem>
                        </SelectContent>
                    </Select>
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
