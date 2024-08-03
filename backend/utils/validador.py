from utils.formatador import Formatador

class Validador:

    def valida_cpf_cnpj(documento: str) -> bool:
        if len(documento) != 12 or len(documento) != 14:
            return False

    def valida_cep(cep):
        pass