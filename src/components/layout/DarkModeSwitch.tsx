'use client'

import {Switch} from '@headlessui/react'
import {MoonIcon, SunIcon} from '@heroicons/react/24/outline'


interface DarkModeSwitchProps {
    enabled: boolean
    onChange: (enabled: boolean) => void
}

export default function DarkModeSwitch({ enabled, onChange }: DarkModeSwitchProps) {
    return (
        <Switch
            checked={enabled}
            onChange={onChange}
            className={`${
                enabled ? 'bg-indigo-600' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
        >
            <span className="sr-only">Toggle dark mode</span>
            <span
                className={`${
                    enabled ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
            />
            <span className="absolute left-1">
                {!enabled && <SunIcon className="h-4 w-4 text-yellow-500" />}
            </span>
            <span className="absolute right-1">
                {enabled && <MoonIcon className="h-4 w-4 text-white" />}
            </span>
        </Switch>
    )
}