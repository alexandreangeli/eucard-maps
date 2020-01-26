<template>
    <div id="homePage">
        <Filtros
            :estados="estados"
            :cidades="cidadesFiltradas"
            :cartoes="cartoes"
            @selecionouEstado="selecionouEstado"
            @selecionouCidade="cidadeSelecionada = $event"
            @selecionouCartao="cartaoSelecionado = $event"
        /> 

        <Navbar
            :detalhamentoAberto="detalhamentoAberto"
            :redesFiltradas="redesFiltradas"
            @pesquisarRede="pesquisarRede = $event"
            @abrirDetalhamento="detalhamentoAberto = true"
            @fecharDetalhamento="detalhamentoAberto = false"
        />              
        
        <Detalhamento 
            v-show="detalhamentoAberto == true" 
            :redesCredenciadas="redesFiltradas" 
            @focarRede="focarRede"
        />   

        <Mapa 
            v-show="detalhamentoAberto == false" 
            ref="mapa"
            :redesCredenciadas="redesFiltradas" 
        />
  </div>
</template>

<script>
import Filtros from './Filtros'
import Navbar from './Navbar'
import Mapa from './Mapa'
import Detalhamento from './Detalhamento'

export default {
    name: 'mainPage',

    components: {   
        Filtros, Mapa, Detalhamento, Navbar
    },

    data() {
        return {
            pesquisarRede: "",
            estados: [],
            cidades: [],
            redesCredenciadas: [],
            cartoes: [
                {id: 1, nome: "Refeição"},
                {id: 2, nome: "Alimentação"},
                {id: 3, nome: "Multiconvenio"},
                {id: 4, nome: "Vale Natal"},
                {id: 7, nome: "Combustível"},
                {id: 8, nome: "Multiconvenio"},
                {id: 9, nome: "Autorização de Despesas"},
                {id: 10, nome: "Cartão Coorporativo"},
                {id: 12, nome: "Eu+Saúde"},
                {id: 13, nome: "Conta Eucard"},
                {id: 14, nome: "Eu+ Parceiro"}
            ],
            estadoSelecionado: "",
            cidadeSelecionada: {},
            cartaoSelecionado: {},
            detalhamentoAberto: false
        }
    },

    computed: {
        cidadesFiltradas() {
            return this.cidades.filter(cidade => cidade.uf == this.estadoSelecionado);
        },

        redesFiltradas() {
            return this.redesCredenciadas.filter(rede => rede.cidade == this.cidadeSelecionada.cidade && rede.produtos.includes(this.cartaoSelecionado.id) && rede.nome_fantasia.toUpperCase().includes(this.pesquisarRede.toUpperCase()));
        }
    },

    methods: {
        getListaRedes() {
            this.$http
                .post('https://api.eucard.com.br/v1/listarredes')
                .then(response => {
                    this.estados = response.data.estados;
                    this.cidades = response.data.cidades;
                    this.redesCredenciadas = response.data.redeCredenciada;
                })
        },

        focarRede(rede) {
            this.detalhamentoAberto = false;
            this.$refs.mapa.focarRede(rede);
        },

        selecionouEstado(estado) {
            this.estadoSelecionado = estado;
            this.cidadeSelecionada = {};
        }
    },

    created() {
        this.getListaRedes();
    }
  
}
</script>

<style>
#homePage {
    display: flex; 
    flex-direction: column; 
    height: 100%; 
    padding: 10px; 
    max-width: 1024px; 
    margin: auto; 
    background-color: #f2efe9;
    border: solid 1px;
    border-color: #dee2e6 #dee2e6 #fff;
}

label {
    margin-left: 5px;
}

.nav-link {
    cursor: pointer;
}
</style>
