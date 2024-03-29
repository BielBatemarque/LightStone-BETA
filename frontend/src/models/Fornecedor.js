export class Fornecedor{
    constructor(nomeEmpresa, cnpj, cep, numero, cidade, uf, logradouro, bairro){
        this.nome_empresa = nomeEmpresa;
        this.cnpj = cnpj;
        this.cep = cep;
        this.numero = numero;
        this.cidade = cidade;
        this.uf = uf;
        this.logradouro = logradouro;
        this.bairro = bairro;
    };
};