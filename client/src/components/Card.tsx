import { Card as ShadCard, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Card({ title, description, children, className = "", interactive = false }) {
  return (
    <ShadCard 
      className={`rounded-xl shadow-sm ${interactive ? 'hover:shadow transition-shadow cursor-pointer' : ''} ${className}`}
    >
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent>{children}</CardContent>
    </ShadCard>
  );
}
