'use client'

import { OnboardingProvider, useOnboarding } from './onboarding-context'
import Step1Personal from './steps/step-1-personal'
import Step2Company from './steps/step-2-company'
import Step3Branding from './steps/step-3-branding'
import Step4BrandingExtended from './steps/step-4-branding-extended'
import Step5Review from './steps/step-5-review'

function OnboardingContent() {
    const { currentStep, totalSteps } = useOnboarding()

    const renderStep = () => {
        switch (currentStep) {
            case 1: return <Step1Personal />
            case 2: return <Step2Company />
            case 3: return <Step3Branding />
            case 4: return <Step4BrandingExtended />
            case 5: return <Step5Review />
            default: return <Step1Personal />
        }
    }

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="w-full max-w-xl">
                {/* Progress Header */}
                <div className="mb-8">
                    <p className="text-zinc-500 text-sm font-medium mb-2 uppercase tracking-wider">Step {currentStep} of {totalSteps}</p>

                    {/* Progress Bar */}
                    <div className="flex gap-2 mb-8">
                        {Array.from({ length: totalSteps }).map((_, i) => (
                            <div
                                key={i}
                                className={`h-1 flex-1 rounded-full transition-all duration-500 ${i + 1 <= currentStep ? 'bg-yellow-500' : 'bg-zinc-800'
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Card Container */}
                <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 md:p-8 shadow-2xl shadow-black/50">
                    {renderStep()}
                </div>
            </div>
        </div>
    )
}

export default function OnboardingPage() {
    return (
        <OnboardingProvider>
            <OnboardingContent />
        </OnboardingProvider>
    )
}