/**
 * Google Analytics 4 Event Tracking Utilities
 * 
 * This module provides type-safe functions for tracking custom events in GA4.
 * Events are only sent when GA4 is properly initialized.
 */

// Extend the Window interface to include gtag
declare global {
    interface Window {
        gtag?: (
            command: 'config' | 'event' | 'js',
            targetId: string | Date,
            config?: Record<string, any>
        ) => void;
        dataLayer?: Object[];
    }
}

/**
 * Generic event tracking function
 * @param eventName - Name of the event to track
 * @param parameters - Optional parameters to send with the event
 */
export const trackEvent = (
    eventName: string,
    parameters?: Record<string, any>
) => {
    // Only track in browser environment
    if (typeof window === 'undefined') return;

    // Check if gtag is available
    if (typeof window.gtag === 'function') {
        window.gtag('event', eventName, parameters);
    } else {
        // Fallback: push to dataLayer if gtag not yet loaded
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            event: eventName,
            ...parameters,
        });
    }
};

/**
 * Track when a user views a project page
 * @param projectSlug - The slug of the project being viewed
 * @param projectTitle - The title of the project being viewed
 */
export const trackProjectView = (
    projectSlug: string,
    projectTitle: string
) => {
    trackEvent('project_view', {
        project_slug: projectSlug,
        project_title: projectTitle,
        page_path: `/projects/${projectSlug}`,
    });
};

/**
 * Track custom interactions (e.g., button clicks, link clicks)
 * @param action - The action being performed
 * @param category - Category of the interaction
 * @param label - Optional label for additional context
 * @param value - Optional numeric value
 */
export const trackInteraction = (
    action: string,
    category: string,
    label?: string,
    value?: number
) => {
    trackEvent('interaction', {
        action,
        category,
        label,
        value,
    });
};

/**
 * Track outbound link clicks
 * @param url - The URL being clicked
 * @param label - Optional label (e.g., "GitHub", "LinkedIn")
 */
export const trackOutboundLink = (url: string, label?: string) => {
    trackEvent('outbound_link_click', {
        link_url: url,
        link_label: label,
    });
};
