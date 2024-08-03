class Formatador:

    def so_numeros(documento: str)-> str:
        doc_sem_separadores = documento.replace(".", "").replace("/", "").replace("-", "")
        doc_sem_separadores = "".join(filter(str.isdigit, doc_sem_separadores))
        
        return doc_sem_separadores

    def cpf_cnpj(documento: str) -> str:
        documento_sem_formatacao = Formatador.so_numeros(documento)

        tamanho_doc = len(documento_sem_formatacao)
        if tamanho_doc != 11 and tamanho_doc != 14 and tamanho_doc != 12 and tamanho_doc != 8:
            raise Exception("O documento deve ter 11 ou 14 caracteres.")

        if tamanho_doc == 11:
            return f"{documento_sem_formatacao[:3]}.{documento_sem_formatacao[3:6]}.{documento_sem_formatacao[6:9]}-{documento_sem_formatacao[9:11]}"
        elif tamanho_doc == 12:
            # CEI
            return f"{documento_sem_formatacao[:2]}.{documento_sem_formatacao[2:5]}.{documento_sem_formatacao[5:10]}.{documento_sem_formatacao[10:11]}-{documento_sem_formatacao[11:12]}"
        elif tamanho_doc == 8:
            # NIRF
            return f"{documento_sem_formatacao[:1]}.{documento_sem_formatacao[1:4]}.{documento_sem_formatacao[4:7]}.{documento_sem_formatacao[7:8]}"

        return f"{documento_sem_formatacao[:2]}.{documento_sem_formatacao[2:5]}.{documento_sem_formatacao[5:8]}/{documento_sem_formatacao[8:12]}-{documento_sem_formatacao[12:14]}"