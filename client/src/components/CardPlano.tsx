import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface CardPlanoProps {
  name: string;
  price: string;
  features: string[];
  popular?: boolean;
  onSubscribe?: () => void;
}

export default function CardPlano({
  name,
  price,
  features,
  popular = false,
  onSubscribe,
}: CardPlanoProps) {
  const { t } = useTranslation();

  return (
    <Card className={`h-full flex flex-col relative ${popular ? 'border-primary shadow-lg' : ''}`}>
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge className="bg-primary text-primary-foreground">
            {t('subscriptions.premium.popular')}
          </Badge>
        </div>
      )}
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">{name}</CardTitle>
        <CardDescription className="text-3xl font-bold text-foreground mt-4">
          {price}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button
          onClick={onSubscribe}
          className="w-full"
          variant={popular ? 'default' : 'outline'}
        >
          {t('subscriptions.subscribe')}
        </Button>
      </CardFooter>
    </Card>
  );
}
