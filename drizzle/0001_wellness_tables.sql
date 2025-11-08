-- Wellness Platform Tables Migration
-- Created: 2025-11-08

-- Tabela de Avatares
CREATE TABLE `avatars` (
  `id` int AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(255) NOT NULL,
  `specialty` varchar(100) NOT NULL,
  `description` text,
  `imageUrl` varchar(500),
  `systemPrompt` text NOT NULL,
  `available` enum('true', 'false') NOT NULL DEFAULT 'true',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de Sessões
CREATE TABLE `sessions` (
  `id` int AUTO_INCREMENT PRIMARY KEY,
  `userId` int NOT NULL,
  `avatarId` int NOT NULL,
  `startedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `endedAt` timestamp,
  `status` enum('active', 'completed', 'cancelled') NOT NULL DEFAULT 'active',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`userId`) REFERENCES `users`(`id`),
  FOREIGN KEY (`avatarId`) REFERENCES `avatars`(`id`)
);

-- Tabela de Mensagens
CREATE TABLE `messages` (
  `id` int AUTO_INCREMENT PRIMARY KEY,
  `sessionId` int NOT NULL,
  `role` enum('user', 'assistant', 'system') NOT NULL,
  `content` text NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`sessionId`) REFERENCES `sessions`(`id`)
);

-- Índices para performance
CREATE INDEX `idx_sessions_userId` ON `sessions`(`userId`);
CREATE INDEX `idx_sessions_status` ON `sessions`(`status`);
CREATE INDEX `idx_messages_sessionId` ON `messages`(`sessionId`);
CREATE INDEX `idx_avatars_available` ON `avatars`(`available`);
