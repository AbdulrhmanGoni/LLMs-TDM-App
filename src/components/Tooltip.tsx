import { ReactNode } from 'react';
import { Tooltip as TooltipContainer, TooltipContent, TooltipTrigger } from './ui/tooltip'

interface TooltipProps {
    children: ReactNode;
    tooltipContent?: string;
    className?: string;
}

export default function Tooltip({ children, tooltipContent, className }: TooltipProps) {

    return (
        <TooltipContainer delayDuration={200}>
            <TooltipTrigger asChild className={className}>
                {children}
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
                {tooltipContent}
            </TooltipContent>
        </TooltipContainer>
    )
}
