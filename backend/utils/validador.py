from utils.formatador import Formatador

class Validador:

    def valida_cpf_cnpj(documento: str) -> bool:
        """
            Efetua a validação do CPF, tanto formatação quando dígito verificadores.
            @todo Adicionar validação do CNPJ. Por enquanto, valida só CPF.

            https://pt.stackoverflow.com/questions/64608/como-validar-e-calcular-o-d%C3%ADgito-de-controle-de-um-cpf
        """
        # Obtém apenas os números do CPF, ignorando pontuações
        numeros = [int(digito) for digito in Formatador.so_numeros(documento)]

        # Verifica se o CPF possui 11 números ou se todos são iguais:
        if ((len(numeros) != 11) and (len(numeros) != 14)) or len(set(numeros)) == 1:
            return False

        if len(numeros) == 14:

            # Pega apenas os 12 primeiros dígitos do CNPJ e gera os 2 dígitos que faltam
            
            novo = numeros[:12]
   
            prod = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
            while len(novo) < 14:
                r = sum([x*y for (x, y) in zip(novo, prod)]) % 11
                if r > 1:
                    f = 11 - r
                else:
                    f = 0
                novo.append(f)
                prod.insert(0, 6)
   
            # Se o número gerado coincidir com o número original, é válido
            if novo != numeros:
               return False
            return True
 
        # Validação do primeiro dígito verificador:
        soma_dos_produtos = sum(a*b for a, b in zip(numeros[0:9], range(10, 1, -1)))
        digitos_esperados = (soma_dos_produtos * 10 % 11) % 10
        if numeros[9] != digitos_esperados:
            return False

        # Validação do segundo dígito verificador:
        soma_dos_produtos = sum(a*b for a, b in zip(numeros[0:10], range(11, 1, -1)))
        digitos_esperados = (soma_dos_produtos * 10 % 11) % 10
        if numeros[10] != digitos_esperados:
            return False

        return True
        

    def valida_cep(cep):
        pass