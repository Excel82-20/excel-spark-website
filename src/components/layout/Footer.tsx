"use client";
import React from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FrameIcon, FacebookIcon, InstagramIcon } from 'lucide-react';

// TikTok is not in lucide-react, so use a simple SVG inline for TikTok
const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
		<path d="M9 8v8a3 3 0 1 0 3-3h0V3h3a5 5 0 0 0 5 5" />
	</svg>
);

interface FooterLink {
	title: string;
	href: string;
	icon?: React.ComponentType<{ className?: string }>;
}

interface FooterSection {
	label: string;
	links: FooterLink[];
}

const footerLinks: FooterSection[] = [
	{
		label: 'Product',
		links: [
			{ title: 'Features', href: '#features' },
			{ title: 'Pricing', href: '#pricing' },
			{ title: 'Testimonials', href: '#testimonials' },
			{ title: 'Integration', href: '/' },
		],
	},
	{
		label: 'Company',
		links: [
			{ title: 'FAQs', href: '/faqs' },
			{ title: 'About Us', href: '/about' },
			{ title: 'Privacy Policy', href: '/privacy' },
			{ title: 'Terms of Services', href: '/terms' },
		],
	},
	{
		label: 'Resources',
		links: [
			{ title: 'Blog', href: '/blog' },
			{ title: 'Changelog', href: '/changelog' },
			{ title: 'Brand', href: '/brand' },
			{ title: 'Help', href: '/help' },
		],
	},
	{
		label: 'Social Links',
		links: [
			{ title: 'Facebook', href: 'https://www.facebook.com/share/1Af4gq2fZR/', icon: FacebookIcon },
			{ title: 'Instagram', href: 'https://www.instagram.com/_excelinstitute?igsh=MWE4bnA3cXo1ZjEzYg==', icon: InstagramIcon },
			{ title: 'TikTok', href: 'https://www.tiktok.com/@_excelinstitute?_t=ZS-8xbLsBZsbtA&_r=1', icon: TikTokIcon },
		],
	},
];

export function Footer() {
	return (
		<footer className="w-full flex flex-col items-center justify-center bg-white py-12 px-4 border-t">
			{/* Logo */}
			<div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-8">
				<FrameIcon className="w-8 h-8 text-black" />
			</div>
			{/* Nav Links */}
			<nav className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-8 w-full max-w-xs sm:max-w-none">
				<a href="/#hero-section" className="text-black text-base hover:underline">Home</a>
				<a href="/#courses-section" className="text-black text-base hover:underline">Courses</a>
				<a href="/#testimonials-section" className="text-black text-base hover:underline">Stories</a>
				<a href="/#team-section" className="text-black text-base hover:underline">Team</a>
				<a href="/gallery" className="text-black text-base hover:underline">Gallery</a>
				<a href="/#contact-section" className="text-black text-base hover:underline">Contact</a>
			</nav>
			{/* Social Icons */}
			<div className="flex space-x-6 mb-8">
				<a href="https://www.facebook.com/share/1Af4gq2fZR/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-black hover:bg-gray-100 transition"><FacebookIcon className="w-5 h-5" /></a>
				<a href="https://www.instagram.com/_excelinstitute?igsh=MWE4bnA3cXo1ZjEzYg==" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-black hover:bg-gray-100 transition"><InstagramIcon className="w-5 h-5" /></a>
				<a href="https://www.tiktok.com/@_excelinstitute?_t=ZS-8xbLsBZsbtA&_r=1" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-black hover:bg-gray-100 transition"><TikTokIcon className="w-5 h-5" /></a>
			</div>
			{/* Copyright */}
			<p className="text-gray-500 text-sm">© {new Date().getFullYear()} Your Company. All rights reserved.</p>
		</footer>
	);
}

type ViewAnimationProps = {
	delay?: number;
	className?: ComponentProps<typeof motion.div>['className'];
	children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
	const shouldReduceMotion = useReducedMotion();

	if (shouldReduceMotion) {
		return children;
	}

	return (
		<motion.div
			initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
			whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
			viewport={{ once: true }}
			transition={{ delay, duration: 0.8 }}
			className={className}
		>
			{children}
		</motion.div>
	);
} 