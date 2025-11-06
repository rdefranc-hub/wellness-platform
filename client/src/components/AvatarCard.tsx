import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar as AvatarUI, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useTranslation } from 'react-i18next';

interface AvatarCardProps {
  name: string;
  specialty: string;
  description: string;
  imageUrl: string;
  available: boolean;
  onAttend?: () => void;
}

export default function AvatarCard({
  name,
  specialty,
  description,
  imageUrl,
  available,
  onAttend,
}: AvatarCardProps) {
  const { t } = useTranslation();

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-4">
          <AvatarUI className="h-16 w-16">
            <AvatarImage src={imageUrl} alt={name} />
            <AvatarFallback>{name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </AvatarUI>
          <div className="flex-1">
            <CardTitle className="text-lg">{name}</CardTitle>
            <CardDescription>{specialty}</CardDescription>
          </div>
          <Badge variant={available ? 'default' : 'secondary'}>
            {available ? 'Disponível' : 'Indisponível'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter>
        <Button
          onClick={onAttend}
          className="w-full"
          disabled={!available}
        >
          {t('dashboard.attendNow')}
        </Button>
      </CardFooter>
    </Card>
  );
}
