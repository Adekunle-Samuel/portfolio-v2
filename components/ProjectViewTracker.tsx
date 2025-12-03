'use client';

import { useEffect } from 'react';
import { trackProjectView } from '@/lib/analytics';

interface ProjectViewTrackerProps {
    projectSlug: string;
    projectTitle: string;
}

/**
 * Client component to track project page views in Google Analytics
 * This component should be added to project detail pages
 */
export default function ProjectViewTracker({
    projectSlug,
    projectTitle,
}: ProjectViewTrackerProps) {
    useEffect(() => {
        // Track the project view when component mounts
        trackProjectView(projectSlug, projectTitle);
    }, [projectSlug, projectTitle]);

    // This component doesn't render anything
    return null;
}
