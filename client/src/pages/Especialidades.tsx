import CardEspecialidade from '@/components/CardEspecialidade';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Badge } from '@/components/ui/badge';
import { useUserStore } from '@/stores/useStore';
import {
  Activity,
  Brain,
  Dumbbell,
  Heart,
  Sparkles,
  Users,
  Utensils,
  Wind,
} from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const allSpecialties = [
  {
    id: 'psicologia',
    avatarId: 1,
    name: 'Psicologia',
    description: 'Suporte emocional e terapia cognitivo-comportamental',
    icon: Brain,
    tags: ['Saúde Mental', 'Terapia'],
  },
  {
    id: 'nutricao',
    avatarId: 2,
    name: 'Nutrição',
    description: 'Orientação nutricional personalizada para seus objetivos',
    icon: Utensils,
    tags: ['Alimentação', 'Saúde'],
  },
  {
    id: 'yoga',
    avatarId: 3,
    name: 'Yoga & Meditação',
    description: 'Práticas de bem-estar, mindfulness e equilíbrio',
    icon: Sparkles,
    tags: ['Bem-estar', 'Mindfulness'],
  },
  {
    id: 'coaching',
    avatarId: 4,
    name: 'Coaching',
    description: 'Desenvolvimento pessoal e profissional',
    icon: Users,
    tags: ['Desenvolvimento', 'Carreira'],
  },
  {
    id: 'fitness',
    avatarId: 5,
    name: 'Fitness',
    description: 'Treinos personalizados e acompanhamento físico',
    icon: Dumbbell,
    tags: ['Exercício', 'Saúde'],
  },
  {
    id: 'cardiologia',
    avatarId: 6,
    name: 'Cardiologia',
    description: 'Orientação para saúde cardiovascular',
    icon: Heart,
    tags: ['Saúde', 'Prevenção'],
  },
  {
    id: 'fisioterapia',
    avatarId: 7,
    name: 'Fisioterapia',
    description: 'Reabilitação e prevenção de lesões',
    icon: Activity,
    tags: ['Reabilitação', 'Saúde'],
  },
  {
    id: 'respiracao',
    avatarId: 8,
    name: 'Técnicas de Respiração',
    description: 'Exercícios respiratórios para relaxamento e foco',
    icon: Wind,
    tags: ['Bem-estar', 'Relaxamento'],
  },
];

const allTags = Array.from(
  new Set(allSpecialties.flatMap((s) => s.tags))
);

export default function Especialidades() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useUserStore();
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredSpecialties = selectedTag
    ? allSpecialties.filter((s) => s.tags.includes(selectedTag))
    : allSpecialties;

  const handleSelectAvatar = (avatarId: number, specialtyName: string) => {
    if (!user) {
      toast.info('Faça login para selecionar um avatar');
      navigate('/login');
    } else {
      navigate(`/chat/${avatarId}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="container">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('specialties.title')}
            </h1>
            <p className="text-lg text-muted-foreground">
              Escolha a especialidade ideal para suas necessidades
            </p>
          </div>

          {/* Filtros */}
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            <Badge
              variant={selectedTag === null ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setSelectedTag(null)}
            >
              {t('specialties.filterAll')}
            </Badge>
            {allTags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTag === tag ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => setSelectedTag(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* Grid de Especialidades */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSpecialties.map((specialty) => (
              <CardEspecialidade
                key={specialty.id}
                name={specialty.name}
                description={specialty.description}
                icon={specialty.icon}
                tags={specialty.tags}
                onSelect={() => handleSelectAvatar(specialty.avatarId, specialty.name)}
              />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
