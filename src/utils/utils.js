export default {

    getInformacoesFormatadas(rede) {
        return `
            <h5 class="card-title">${rede.nome_fantasia}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${rede.tipo_estabelecimento}</h6>
            <p class="card-text">${this.getEndereçoFormatado(rede)}</p>
            <p class="card-text">Telefone: ${rede.telefone}</p>
        `
    },

    getEndereçoFormatado(rede) {
        return `${rede.logradouro}, ${rede.numero}${rede.complemento ? ", " + rede.complemento : ""} - ${rede.bairro}, ${rede.cidade} - ${rede.uf}`;
    }
    
}