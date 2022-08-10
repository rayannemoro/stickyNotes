import { List } from './lists';

export const LISTS: List[] = [
  { id: 1, title: 'Lista 01', priority: 'baixa', description: '' },
];

// Um campo select para prioridade (Baixa, Média e Alta) [campo obrigatório]
//  Um campo de text para o título [campo obrigatório]
//  Um campo textarea para o conteúdo do lembrete [campo obrigatório]
//  Um botão de cancelar
//  Um botão de salvar (que, ao clicado, salva o lembrete, fecha o modal e atualiza 
// a listagem da tela inicial)