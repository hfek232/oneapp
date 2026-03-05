#!/usr/bin/perl
use strict;
use warnings;
my $css_file = 'src/index.css';
my $css_content = <<'CSS_EOF';
@import "tailwindcss";
@theme {
  --color-neon-red: #FF3B30;
}
@layer base {
  body { @apply bg-white text-slate-900 antialiased; }
}
CSS_EOF
open(my $fh_css, '>', $css_file) or die $!;
print $fh_css $css_content;
close($fh_css);
my $main_file = 'src/main.tsx';
my $main_content = <<'MAIN_EOF';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
MAIN_EOF
open(my $fh_main, '>', $main_file) or die $!;
print $fh_main $main_content;
close($fh_main);
if (-e 'tailwind.config.js') { rename 'tailwind.config.js', 'tailwind.config.js.v3_legacy'; }
