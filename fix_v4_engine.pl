#!/usr/bin/perl
use strict;
use warnings;

print "🔧 Fixing Tailwind 4 + Vite 7 Engine...\n";

# 1. Update vite.config.ts with the mandatory v4 plugin
my $vite_file = 'vite.config.ts';
my $vite_code = <<'VITE_EOF';
import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__filename, "./src"),
    },
  },
})
VITE_EOF

open(my $fh_v, '>', $vite_file) or die "Error opening $vite_file: $!";
print $fh_v $vite_code;
close($fh_v);
print "✅ Injected @tailwindcss/vite plugin into $vite_file\n";

# 2. Update index.css to standard Tailwind 4
my $css_file = 'src/index.css';
my $css_code = <<'CSS_EOF';
@import "tailwindcss";

@theme {
  --color-primary: #FF3B30;
  --color-primary-foreground: #ffffff;
  --color-background: #ffffff;
  --color-foreground: #09090b;
  
  --radius-lg: 0.75rem;
  --radius-md: calc(0.75rem - 2px);
  --radius-sm: calc(0.75rem - 4px);
}

@layer base {
  body {
    @apply bg-white text-slate-900 antialiased;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  }
}
CSS_EOF

open(my $fh_c, '>', $css_file) or die "Error opening $css_file: $!";
print $fh_c $css_code;
close($fh_c);
print "✅ Updated index.css to Tailwind 4 standard\n";

# 3. Final cleanup of legacy v3 config
if (-e 'tailwind.config.js') {
    rename 'tailwind.config.js', 'tailwind.config.js.bak';
    print "📦 Archived legacy tailwind.config.js\n";
}
