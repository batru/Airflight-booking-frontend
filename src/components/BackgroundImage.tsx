import { ImageWithFallback } from './figma/ImageWithFallback';

interface BackgroundImageProps {
  children: React.ReactNode;
  className?: string;
}

export function BackgroundImage({ children, className = "" }: BackgroundImageProps) {
  return (
    <div className={`min-h-screen relative ${className}`}>
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1653832919568-8aac81463eb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbm93eSUyMG1vdW50YWluJTIwc3Vuc2V0JTIwYXZpYXRpb258ZW58MXx8fHwxNzYwOTUwMjYxfDA&ixlib=rb-4.0&q=80&w=1080"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/40 via-blue-900/30 to-blue-900/60" />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

