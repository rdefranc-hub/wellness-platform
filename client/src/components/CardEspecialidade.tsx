import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface CardEspecialidadeProps {
  name: string;
  description: string;
  icon: LucideIcon;
  tags?: string[];
  onSelect?: () => void;
}

export default function CardEspecialidade({
  name,
  description,
  icon: Icon,
  tags = [],
  onSelect,
}: CardEspecialidadeProps) {
  const { t } = useTranslation();

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-lg">{name}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={onSelect} className="w-full">
          {t('specialties.selectAvatar')}
        </Button>
      </CardFooter>
    </Card>
  );
}
