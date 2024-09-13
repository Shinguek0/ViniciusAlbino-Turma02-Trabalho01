const Biblioteca = require("../src/Trabalho01Turma02");

describe('Teste da classe Biblioteca', () => {
    let gerenciador;
    
    beforeEach(() => {
        gerenciador = new Biblioteca()
    });

    test('Deve adicionar um livro corretamente', () => {
        const livro = {
            id: 1,            
            titulo: 'Diario de um Banana',
            sinopse: 'Conta a historia de um banana'
        }
        gerenciador.adicionarLivro(livro)
        expect(gerenciador.listarLivros()).toContain(livro);
        
    })

    test('Deve remover um livro corretamente', () => {
        const livro = {
            id: 2,            
            titulo: 'Game of Thrones',
            sinopse: 'Regras da brincadeira jogo da cadeira'
        }
        gerenciador.adicionarLivro(livro)
        gerenciador.removerLivro(2)
        expect(gerenciador.listarLivros()).not.toContain(livro);
    })

    test('Deve buscar um livro atravez do ID corretamente', () => {
        const livro = {
            id: 3,            
            titulo: 'Lord of the rings',
            sinopse: 'Regras da brincadeira jogo da cadeira'
        }
        gerenciador.adicionarLivro(livro)
        expect(gerenciador.buscarLivroPorId(3)).toBe(livro)
    })

    test('Deve buscar um livro atravez do nome corretamente', () => {
        const livro = {
            id: 4,            
            titulo: 'PLACE_HOLDER',
            sinopse: 'PLACE_HOLDER'
        }
        gerenciador.adicionarLivro(livro)
        expect(gerenciador.buscarLivroPorTitulo('PLACE_HOLDER')).toEqual([livro])
    })

    test('Deve listar todos os livros corretamente', () => {
        const livro1 = {
            id: 5,            
            titulo: 'PLACE_HOLDER',
            sinopse: 'PLACE_HOLDER'
        }
        const livro2 = {
            id: 6,            
            titulo: 'PLACE_HOLDER',
            sinopse: 'PLACE_HOLDER'
        }
        gerenciador.adicionarLivro(livro1)
        expect(gerenciador.listarLivros()).toEqual([livro1])
        gerenciador.adicionarLivro(livro2)
        expect(gerenciador.listarLivros()).toEqual([livro1, livro2])
    })

    test('Deve adicionar membro corretamente', () => {
        const membro = {
            id: 1,            
            nome: 'Leandro Ugioni',
            idade: 23
        }
        gerenciador.adicionarMembro(membro)
        expect(gerenciador.listarMembros()).toContain(membro);
    })

    test('Deve remover membro corretamente', () => {
        const membro = {
            id: 2,            
            nome: 'Vinicius Albino',
            idade: 20
        }
        gerenciador.adicionarMembro(membro)
        gerenciador.removerMembro(2)
        expect(gerenciador.listarMembros()).not.toContain(membro);
    })

    test('Deve buscar membro por ID corretamente', () => {
        const membro = {
            id: 3,            
            nome: 'Yuri Lopes',
            idade: 38
        }
        gerenciador.adicionarMembro(membro)
        expect(gerenciador.buscarMembroPorId(3)).toBe(membro);
    })

    test('Deve listar todos os livros corretamente', () => {
        const membro1 = {
            id: 4,            
            nome: 'Minatto Barp',
            idade: 21
        }
        const membro2 = {
            id: 5,            
            nome: 'Danilo Guloso',
            idade: 19
        }
        gerenciador.adicionarMembro(membro1)
        expect(gerenciador.listarMembros()).toEqual([membro1])
        gerenciador.adicionarMembro(membro2)
        expect(gerenciador.listarMembros()).toEqual([membro1, membro2])
    })

    test('Deve emprestar um livro disponível a um membro', () => {
        const livro = {
            id: 7,            
            titulo: 'Receitas da Palmirinha',
            sinopse: 'Livro de receitas contendo só as melhores da Palmirinha',
            emprestado: false,
            idMembro: null
        }

        const membro = {
            id: 6,            
            nome: 'Luzbreanda Silveira',
            idade: 19
        }
        gerenciador.adicionarLivro(livro);
        gerenciador.adicionarMembro(membro);
    
        const emprestimoRealizado = gerenciador.emprestarLivro(7, 6);
    
        expect(emprestimoRealizado).toBe(true);
        expect(gerenciador.buscarLivroPorId(7).emprestado).toBe(true);
        expect(gerenciador.buscarLivroPorId(7).idMembro).toBe(6);        
    })

    test('Deve retornar false ao tentar emprestar um livro já emprestado a outro membro', () => {
        const livro = {
            id: 8,            
            titulo: 'Dom Quixote',
            sinopse: 'A história de um cavaleiro blabla bla',
            emprestado: true,
            idMembro: 5
        }
    
        const membro = {
            id: 7,            
            nome: 'Lucas Italia',
            idade: 19
        }
        
        gerenciador.adicionarLivro(livro);
        gerenciador.adicionarMembro(membro);
    
        const emprestimoRealizado = gerenciador.emprestarLivro(8, 7);
    
        expect(emprestimoRealizado).toBe(false);
        expect(gerenciador.buscarLivroPorId(8).emprestado).toBe(true);
        expect(gerenciador.buscarLivroPorId(8).idMembro).toBe(5);
    });

    test('Deve retornar false ao tentar emprestar um livro inexistente', () => {
        const membro = {
            id: 8,            
            nome: 'Julia Culing',
            idade: 23
        }
        
        gerenciador.adicionarMembro(membro);
        const emprestimoRealizado = gerenciador.emprestarLivro(99, 8);
        expect(emprestimoRealizado).toBe(false);
    });

    test('Deve devolver um livro emprestado corretamente', () => {
        const livro = {
            id: 9,
            titulo: 'O pequeno principe',
            sinopse: 'Fala sobre um principe que tem 1.70',
            emprestado: true,
            idMembro: 6
        };
    
        gerenciador.adicionarLivro(livro);
    
        const devolucaoRealizada = gerenciador.devolverLivro(9);
    
        expect(devolucaoRealizada).toBe(true);
        expect(gerenciador.buscarLivroPorId(9).emprestado).toBe(false);
        expect(gerenciador.buscarLivroPorId(9).idMembro).toBeUndefined();
    });

    test('Deve retornar false ao tentar devolver um livro que não está emprestado', () => {
        const livro = {
            id: 10,
            titulo: 'Crepusculo',
            sinopse: 'Artigo cientifico sobre o fenomeno natural crepusculo',
            emprestado: false,
            idMembro: null
        };
    
        gerenciador.adicionarLivro(livro);
    
        const devolucaoRealizada = gerenciador.devolverLivro(8);
    
        expect(gerenciador.buscarLivroPorId(10).emprestado).toBe(false);
        expect(gerenciador.buscarLivroPorId(10).idMembro).toBeNull();
        expect(devolucaoRealizada).toBe(false);        
    });

    test('Deve listar todos os livros emprestados corretamente', () => {
        const livro1 = {
            id: 5,            
            titulo: 'PLACE_HOLDER',
            sinopse: 'PLACE_HOLDER',
            emprestado: false,
            idMembro: null
        }
        const livro2 = {
            id: 6,            
            titulo: 'PLACE_HOLDER',
            sinopse: 'PLACE_HOLDER',
            emprestado: true,
            idMembro: 5            
        }
        gerenciador.adicionarLivro(livro1)
        gerenciador.adicionarLivro(livro2)
        expect(gerenciador.listarLivrosEmprestados()).toEqual([livro2])        
    })

    test('Deve listar todos os livros disponiveis corretamente', () => {
        const livro1 = {
            id: 5,            
            titulo: 'PLACE_HOLDER',
            sinopse: 'PLACE_HOLDER',
            emprestado: false,
            idMembro: null
        }
        const livro2 = {
            id: 6,            
            titulo: 'PLACE_HOLDER',
            sinopse: 'PLACE_HOLDER',
            emprestado: true,
            idMembro: 5            
        }
        gerenciador.adicionarLivro(livro1)
        gerenciador.adicionarLivro(livro2)
        expect(gerenciador.listarLivrosDisponiveis()).toEqual([livro1])        
    })

    test('Deve contar os livros corretamente', () => {
        const livro1 = {
            id: 5,            
            titulo: 'PLACE_HOLDER',
            sinopse: 'PLACE_HOLDER',
            emprestado: false,
            idMembro: null
        }
        const livro2 = {
            id: 6,            
            titulo: 'PLACE_HOLDER',
            sinopse: 'PLACE_HOLDER',
            emprestado: true,
            idMembro: 5            
        }
        gerenciador.adicionarLivro(livro1)
        gerenciador.adicionarLivro(livro2)
        expect(gerenciador.contarLivros()).toBe(2)       
    })

    test('Deve contar os membros corretamente', () => {
        const membro1 = {
            id: 4,            
            nome: 'Minatto Barp',
            idade: 21
        }
        const membro2 = {
            id: 5,            
            nome: 'Danilo Guloso',
            idade: 19
        }
        gerenciador.adicionarMembro(membro1)
        gerenciador.adicionarMembro(membro2)
        expect(gerenciador.contarMembros()).toBe(2)       
    })

    test('Deve listar livros de um autor específico', () => {
        const livro1 = {
            id: 10,
            titulo: 'O Código Da Vinci',
            autor: 'Dan Brown',
            sinopse: 'Um thriller que envolve segredos ocultos na arte.',
            emprestado: false,
            idMembro: null
        };
    
        const livro2 = {
            id: 11,
            titulo: 'Anjos e Demônios',
            autor: 'Dan Brown',
            sinopse: 'Outro thriller que mistura ciência e religião.',
            emprestado: false,
            idMembro: null
        };
    
        const livro3 = {
            id: 12,
            titulo: 'O Senhor dos Anéis',
            autor: 'J.R.R. Tolkien',
            sinopse: 'Uma épica jornada pela Terra Média.',
            emprestado: false,
            idMembro: null
        };
    
        gerenciador.adicionarLivro(livro1);
        gerenciador.adicionarLivro(livro2);
        gerenciador.adicionarLivro(livro3);
    
        const livrosDanBrown = gerenciador.listarLivrosPorAutor('Dan Brown');
    
        expect(livrosDanBrown).toEqual([livro1, livro2]);
    });

    test('Deve listar livros de um gênero específico', () => {
        const livro1 = {
            id: 13,
            titulo: 'O Código Da Vinci',
            autor: 'Dan Brown',
            genero: 'Suspense',
            sinopse: 'Um thriller que envolve segredos ocultos na arte.',
            emprestado: false,
            idMembro: null
        };
    
        const livro2 = {
            id: 14,
            titulo: 'Anjos e Demônios',
            autor: 'Dan Brown',
            genero: 'Suspense',
            sinopse: 'Outro thriller que mistura ciência e religião.',
            emprestado: false,
            idMembro: null
        };
    
        const livro3 = {
            id: 15,
            titulo: 'O Senhor dos Anéis',
            autor: 'J.R.R. Tolkien',
            genero: 'Fantasia',
            sinopse: 'Uma épica jornada pela Terra Média.',
            emprestado: false,
            idMembro: null
        };
    
        gerenciador.adicionarLivro(livro1);
        gerenciador.adicionarLivro(livro2);
        gerenciador.adicionarLivro(livro3);
    
        const livrosSuspense = gerenciador.listarLivrosPorGenero('Suspense');
    
        expect(livrosSuspense).toEqual([livro1, livro2]);
    });

    test('Deve atualizar as informações de um livro existente', () => {
        const livro = {
            id: 16,
            titulo: 'Turma da monica jovem',
            autor: 'Mauricio de Sousa',
            genero: 'Terror',
            sinopse: 'Cansei',
            emprestado: false,
            idMembro: null
        };
    
        gerenciador.adicionarLivro(livro);
    
        const novosDados = {
            titulo: 'Turma da monica velha',
            sinopse: 'Eles ficaram velhos'
        };
    
        gerenciador.atualizarInformacaoLivro(16, novosDados);
    
        const livroAtualizado = gerenciador.buscarLivroPorId(16);
    
        expect(livroAtualizado.titulo).toBe('Turma da monica velha');
        expect(livroAtualizado.sinopse).toBe('Eles ficaram velhos');
        expect(livroAtualizado.autor).toBe('Mauricio de Sousa');
    });
    
    test('Deve listar todos os livros de um ano específico', () => {
        const livro1 = {
            id: 1,
            titulo: 'O Guia do Mochileiro das Galáxias',
            autor: 'Douglas Adams',
            genero: 'Ficção Científica',
            ano: 1979,
            sinopse: 'Uma comédia de ficção científica.',
            emprestado: false,
            idMembro: null
        };
    
        const livro2 = {
            id: 2,
            titulo: 'Neuromancer',
            autor: 'William Gibson',
            genero: 'Ficção Científica',
            ano: 1984,
            sinopse: 'Um clássico do cyberpunk.',
            emprestado: false,
            idMembro: null
        };
    
        const livro3 = {
            id: 3,
            titulo: 'Fundação',
            autor: 'Isaac Asimov',
            genero: 'Ficção Científica',
            ano: 1951,
            sinopse: 'Uma das maiores séries de ficção científica.',
            emprestado: false,
            idMembro: null
        };
    
        gerenciador.adicionarLivro(livro1);
        gerenciador.adicionarLivro(livro2);
        gerenciador.adicionarLivro(livro3);
    
        const livrosDe1984 = gerenciador.listarLivrosPorAno(1984);
    
        expect(livrosDe1984).toEqual([livro2]);
    }); 
})