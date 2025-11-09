import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, ArrowLeft, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { trpc } from '@/lib/trpc';

interface Message {
  id: number;
  role: 'user' | 'assistant' | 'system';
  content: string;
  createdAt: string;
}

function ChatContent() {
  const params = useParams();
  const navigate = useNavigate();
  const avatarId = parseInt(params.avatarId || '0');
  
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Mutations
  const startSessionMutation = trpc.chat.startSession.useMutation();
  const sendMessageMutation = trpc.chat.sendMessage.useMutation();
  const endSessionMutation = trpc.chat.endSession.useMutation();

  // Queries
  const { data: avatarData } = trpc.avatars.getById.useQuery(
    { id: avatarId },
    { enabled: avatarId > 0 }
  );

  const { data: messagesData, refetch: refetchMessages } = trpc.chat.getMessages.useQuery(
    { sessionId: sessionId! },
    { enabled: sessionId !== null, refetchInterval: false }
  );

  // Iniciar sessão ao montar o componente
  useEffect(() => {
    if (avatarId > 0 && !sessionId) {
      startSessionMutation.mutate(
        { avatarId },
        {
          onSuccess: (data) => {
            setSessionId(data.sessionId);
            setIsLoading(false);
            toast.success(`Conectado com ${data.avatar.name}!`);
          },
          onError: (error) => {
            toast.error(`Erro ao iniciar sessão: ${error.message}`);
            setIsLoading(false);
          },
        }
      );
    }
  }, [avatarId]);

  // Atualizar mensagens quando dados mudarem
  useEffect(() => {
    if (messagesData?.messages) {
      // Filtrar mensagens do sistema (não mostrar para o usuário)
      const userMessages = messagesData.messages.filter(
        (msg: Message) => msg.role !== 'system'
      );
      setMessages(userMessages);
    }
  }, [messagesData]);

  // Auto-scroll para última mensagem
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !sessionId || isSending) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setIsSending(true);

    // Adicionar mensagem do usuário imediatamente (otimistic update)
    const tempUserMessage: Message = {
      id: Date.now(),
      role: 'user',
      content: userMessage,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, tempUserMessage]);

    try {
      const response = await sendMessageMutation.mutateAsync({
        sessionId,
        message: userMessage,
      });

      // Atualizar com resposta do servidor
      await refetchMessages();
    } catch (error: any) {
      toast.error(`Erro ao enviar mensagem: ${error.message}`);
      // Remover mensagem temporária em caso de erro
      setMessages((prev) => prev.filter((msg) => msg.id !== tempUserMessage.id));
    } finally {
      setIsSending(false);
    }
  };

  const handleEndSession = async () => {
    if (!sessionId) return;

    try {
      await endSessionMutation.mutateAsync({ sessionId });
      toast.success('Sessão encerrada!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(`Erro ao encerrar sessão: ${error.message}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-12">
          <div className="container max-w-4xl">
            <Card>
              <CardHeader>
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-4 w-48" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-96 w-full" />
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-6">
        <div className="container max-w-4xl">
          <Card className="h-[calc(100vh-12rem)]">
            {/* Header do Chat */}
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigate('/dashboard')}
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={avatarData?.imageUrl} alt={avatarData?.name} />
                    <AvatarFallback>
                      {avatarData?.name?.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-xl">{avatarData?.name}</CardTitle>
                    <CardDescription>{avatarData?.specialty}</CardDescription>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={handleEndSession}>
                  Encerrar
                </Button>
              </div>
            </CardHeader>

            {/* Área de Mensagens */}
            <CardContent className="p-0 flex flex-col h-[calc(100%-8rem)]">
              <ScrollArea className="flex-1 p-4" ref={scrollRef}>
                <div className="space-y-4">
                  {messages.length === 0 ? (
                    <div className="text-center text-muted-foreground py-12">
                      <p className="text-lg mb-2">
                        Olá! Sou {avatarData?.name}.
                      </p>
                      <p>{avatarData?.description}</p>
                      <p className="mt-4">Como posso ajudar você hoje?</p>
                    </div>
                  ) : (
                    messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.role === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg px-4 py-2 ${
                            message.role === 'user'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {new Date(message.createdAt).toLocaleTimeString('pt-BR', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                  {isSending && (
                    <div className="flex justify-start">
                      <div className="max-w-[80%] rounded-lg px-4 py-2 bg-muted">
                        <Loader2 className="h-4 w-4 animate-spin" />
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Input de Mensagem */}
              <div className="border-t p-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Digite sua mensagem..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isSending}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isSending}
                    size="icon"
                  >
                    {isSending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function Chat() {
  return (
    <ProtectedRoute>
      <ChatContent />
    </ProtectedRoute>
  );
}
