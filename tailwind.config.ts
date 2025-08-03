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
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
				math: ['STIX Two Math', 'Computer Modern', 'serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					glow: 'hsl(var(--primary-glow))',
					deep: 'hsl(var(--primary-deep))'
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
				proof: {
					bg: 'hsl(var(--proof-bg))',
					border: 'hsl(var(--proof-border))',
					highlight: 'hsl(var(--syntax-highlight))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
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
				'float': {
					'0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
					'50%': { transform: 'translateY(-20px) rotate(180deg)' }
				},
				'pulse-glow': {
					'0%, 100%': { 
						boxShadow: '0 0 5px hsl(var(--primary) / 0.3)',
						transform: 'scale(1)'
					},
					'50%': { 
						boxShadow: '0 0 30px hsl(var(--primary) / 0.6)',
						transform: 'scale(1.05)'
					}
				},
				'type-draw': {
					'0%': { width: '0', opacity: '0' },
					'50%': { opacity: '1' },
					'100%': { width: '100%', opacity: '1' }
				},
				'section-reveal': {
					'0%': { opacity: '0', transform: 'translateY(50px) scale(0.95)' },
					'100%': { opacity: '1', transform: 'translateY(0) scale(1)' }
				},
				'grid-float': {
					'0%, 100%': { transform: 'translate(0, 0)' },
					'25%': { transform: 'translate(-2px, -2px)' },
					'50%': { transform: 'translate(2px, -2px)' },
					'75%': { transform: 'translate(-2px, 2px)' }
				},
				'geometric-pulse': {
					'0%, 100%': { 
						transform: 'scale(1) rotate(0deg)',
						borderColor: 'hsl(var(--primary) / 0.2)'
					},
					'50%': { 
						transform: 'scale(1.2) rotate(180deg)',
						borderColor: 'hsl(var(--primary) / 0.4)'
					}
				},
				'geometric-rotate': {
					'from': { transform: 'rotate(45deg)' },
					'to': { transform: 'rotate(405deg)' }
				},
				'particle-float': {
					'0%, 100%': { 
						transform: 'translate(0, 0) scale(1)',
						opacity: '0.3'
					},
					'50%': { 
						transform: 'translate(-10px, -15px) scale(1.1)',
						opacity: '0.7'
					}
				},
				'morphing-shape': {
					'0%, 100%': { 
						borderRadius: '50% 50% 50% 50%',
						transform: 'rotate(0deg)'
					},
					'25%': { 
						borderRadius: '60% 40% 60% 40%',
						transform: 'rotate(90deg)'
					},
					'50%': { 
						borderRadius: '40% 60% 40% 60%',
						transform: 'rotate(180deg)'
					},
					'75%': { 
						borderRadius: '50% 50% 60% 40%',
						transform: 'rotate(270deg)'
					}
				},
				'gradient-flow': {
					'0%, 100%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 4s ease-in-out infinite',
				'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
				'type-draw': 'type-draw 2s ease-out forwards',
				'section-reveal': 'section-reveal 0.8s ease-out forwards',
				'grid-float': 'grid-float 20s ease-in-out infinite',
				'geometric-pulse': 'geometric-pulse 4s ease-in-out infinite',
				'geometric-rotate': 'geometric-rotate 8s linear infinite',
				'particle-float': 'particle-float 6s ease-in-out infinite',
				'morphing-shape': 'morphing-shape 8s ease-in-out infinite',
				'gradient-flow': 'gradient-flow 3s ease-in-out infinite'
			},
			spacing: {
				'section': 'var(--section-padding)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;