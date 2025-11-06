import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Atendimento } from '@/services/api';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';

interface TabelaHistoricoProps {
  atendimentos: Atendimento[];
}

const statusVariant = {
  completed: 'default' as const,
  'in-progress': 'secondary' as const,
  scheduled: 'outline' as const,
};

const statusLabel = {
  completed: 'Concluído',
  'in-progress': 'Em andamento',
  scheduled: 'Agendado',
};

export default function TabelaHistorico({ atendimentos }: TabelaHistoricoProps) {
  const { t } = useTranslation();

  if (atendimentos.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        {t('dashboard.noHistory')}
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('dashboard.date')}</TableHead>
            <TableHead>{t('dashboard.specialty')}</TableHead>
            <TableHead>{t('dashboard.avatar')}</TableHead>
            <TableHead>{t('dashboard.duration')}</TableHead>
            <TableHead>{t('dashboard.status')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {atendimentos.map((atendimento) => (
            <TableRow key={atendimento.id}>
              <TableCell>
                {format(new Date(atendimento.date), "dd/MM/yyyy 'às' HH:mm", {
                  locale: ptBR,
                })}
              </TableCell>
              <TableCell>{atendimento.specialty}</TableCell>
              <TableCell>{atendimento.avatarName}</TableCell>
              <TableCell>{atendimento.duration}</TableCell>
              <TableCell>
                <Badge variant={statusVariant[atendimento.status]}>
                  {statusLabel[atendimento.status]}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
