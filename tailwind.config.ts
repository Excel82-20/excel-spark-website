
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Enhanced blue-green palette
				'ocean-blue': 'hsl(var(--ocean-blue))',
				'teal-primary': 'hsl(var(--teal-primary))',
				'mint-fresh': 'hsl(var(--mint-fresh))',
				'sage-green': 'hsl(var(--sage-green))',
				'deep-teal': 'hsl(var(--deep-teal))',
				'light-cyan': 'hsl(var(--light-cyan))',
				'navy-deep': 'hsl(var(--navy-deep))',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'float-gentle': {
					'0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
					'33%': { transform: 'translateY(-10px) rotate(1deg)' },
					'66%': { transform: 'translateY(-5px) rotate(-1deg)' }
				},
				'slide-up': {
					from: {
						opacity: '0',
						transform: 'translateY(50px)'
					},
					to: {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'rotate-words': {
					'0%, 25%': { 
						opacity: '1',
						transform: 'translateY(0) scale(1)'
					},
					'35%, 65%': { 
						opacity: '0',
						transform: 'translateY(-20px) scale(0.8)'
					},
					'75%, 100%': { 
						opacity: '1',
						transform: 'translateY(0) scale(1)'
					}
				},
				'pulse-glow': {
					'0%, 100%': { boxShadow: '0 0 20px rgba(52, 211, 153, 0.3)' },
					'50%': { boxShadow: '0 0 40px rgba(52, 211, 153, 0.6)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out',
				'float-gentle': 'float-gentle 8s ease-in-out infinite',
				'slide-up': 'slide-up 0.8s ease-out forwards',
				'rotate-words': 'rotate-words 4s ease-in-out infinite',
				'pulse-glow': 'pulse-glow 3s ease-in-out infinite'
			},
			fontFamily: {
				'inter': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
			},
			borderWidth: {
				'3': '3px',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
