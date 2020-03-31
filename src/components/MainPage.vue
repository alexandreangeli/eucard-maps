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

import redesCredenciadas from '../utils/redesCredenciadasBackup'

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
        async getListaRedes() { 
            try {
                let response = await this.$http.post('https://api.eucard.com.br/v1/listarredes')
                
                this.estados = response.data.estados;
                this.cidades = response.data.cidades;
                this.redesCredenciadas = response.data.redeCredenciada;
            } catch {
                this.estados = JSON.parse(`["PR","MT","RR","RO","SC","BA","AM","DF","SP","RJ","AC","MS","MG","GO","RS","ES","PA","PB"]`)

                this.cidades = JSON.parse(`[{"uf":"PR","cidade":"SAO MIGUEL DO IGUACU"},{"uf":"MT","cidade":"CUIABA"},{"uf":"RR","cidade":"BOA VISTA"},{"uf":"PR","cidade":"CASCAVEL"},{"uf":"RO","cidade":"JIPARANA"},{"uf":"SC","cidade":"SAO BENTO DO SUL"},{"uf":"BA","cidade":"FEIRA DE SANTANA"},{"uf":"AM","cidade":"MANAUS"},{"uf":"PR","cidade":"PATO BRANCO"},{"uf":"RO","cidade":"PORTO VELHO"},{"uf":"PR","cidade":"MATELANDIA"},{"uf":"PR","cidade":"CURITIBA"},{"uf":"PR","cidade":"LARANJEIRAS DO SUL"},{"uf":"DF","cidade":"BRASILIA"},{"uf":"MT","cidade":"VARZEA GRANDE"},{"uf":"SP","cidade":"BARUERI"},{"uf":"PR","cidade":"PINHAIS"},{"uf":"RO","cidade":"VILHENA"},{"uf":"PR","cidade":"CASVEL"},{"uf":"MT","cidade":"LUCAS DO RIO VERDE"},{"uf":"RO","cidade":"OURO PRETO DO OESTE"},{"uf":"RO","cidade":"PIMENTA BUENO"},{"uf":"RJ","cidade":"PARAIBA DO SUL"},{"uf":"PR","cidade":"CAMBE"},{"uf":"PR","cidade":"MEDIANEIRA"},{"uf":"RO","cidade":"ARIQUIMES"},{"uf":"SP","cidade":"ARACATUBA"},{"uf":"AM","cidade":"RIO PRETO DA EVA"},{"uf":"PR","cidade":"ANDIRA"},{"uf":"PR","cidade":"LONDRINA"},{"uf":"SP","cidade":"SAO PAULO"},{"uf":"RO","cidade":"ARIQUEMES"},{"uf":"PR","cidade":"TOLEDO"},{"uf":"PR","cidade":"CEU AZUL"},{"uf":"RO","cidade":"MACHADINHO DOESTE"},{"uf":"PR","cidade":"MARINGA"},{"uf":"PR","cidade":"RIO NEGRO"},{"uf":"AC","cidade":"RIO BRANCO"},{"uf":"RO","cidade":"CACOAL"},{"uf":"MS","cidade":"CAMPO GRANDE"},{"uf":"RO","cidade":"ESPIGAO DO OESTE"},{"uf":"SP","cidade":"PRESIDENTE PRUDENTE"},{"uf":"MG","cidade":"UBERLANDIA"},{"uf":"MG","cidade":"PAINS"},{"uf":"PR","cidade":"SERTANOPOLIS"},{"uf":"PR","cidade":"SANTA TEREZINHA DE ITAIPU"},{"uf":"PR","cidade":"IBIPORA"},{"uf":"PR","cidade":"JATAIZNHO"},{"uf":"MG","cidade":"DONA EUZEBIA"},{"uf":"PR","cidade":"BANDEIRANTES"},{"uf":"PR","cidade":"OURO VERDE DO OESTE"},{"uf":"PR","cidade":"BRAGANEY"},{"uf":"PR","cidade":"ANGULO"},{"uf":"PR","cidade":"CAMBARA"},{"uf":"PR","cidade":"UMUARAMA"},{"uf":"SC","cidade":"SAO LOURENCO DO OESTE"},{"uf":"PR","cidade":"MISSAL"},{"uf":"SC","cidade":"PINHALZINHO"},{"uf":"RO","cidade":"SAO MIGUEL DO GUAPORE"},{"uf":"PR","cidade":"IPORA"},{"uf":"AM","cidade":"BENJAMIN CONSTANT"},{"uf":"PR","cidade":"GUAIRA"},{"uf":"PR","cidade":"BOA VISTA DA APARECIDA"},{"uf":"RO","cidade":"GUAJARAMIRIM"},{"uf":"PR","cidade":"APUCARANA"},{"uf":"PR","cidade":"TERRA ROXA"},{"uf":"PR","cidade":"PARANAVAI"},{"uf":"PR","cidade":"QUATRO PONTES"},{"uf":"PR","cidade":"ITAIPULANDIA"},{"uf":"PR","cidade":"CIANORTE"},{"uf":"PR","cidade":"NOVA SANTA ROSA"},{"uf":"SC","cidade":"FRAIBURGO"},{"uf":"PR","cidade":"MERCEDES"},{"uf":"RO","cidade":"NOVA BRASILANDIA DOESTE"},{"uf":"PR","cidade":"ITAPEJARA D OESTE"},{"uf":"PR","cidade":"CAFELANDIA"},{"uf":"PR","cidade":"MARECHAL C RONDON"},{"uf":"SP","cidade":"PROMISSAO"},{"uf":"PR","cidade":"CLEVELANDIA"},{"uf":"PR","cidade":"DIAMANTE D OESTE"},{"uf":"PR","cidade":"SANTA TEREZA DO OESTE"},{"uf":"PR","cidade":"PEROBAL"},{"uf":"RO","cidade":"MINISTRO ANDREAZZA"},{"uf":"SC","cidade":"FLORIANOPOLIS"},{"uf":"PR","cidade":"VERA CRUZ DO OESTE"},{"uf":"PR","cidade":"ROLANDIA"},{"uf":"RO","cidade":"SAO FELIPE DOESTE"},{"uf":"PR","cidade":"DOIS VIZINHOS"},{"uf":"PR","cidade":"IGUATU"},{"uf":"PR","cidade":"NOVA AURORA"},{"uf":"PR","cidade":"SAO PEDRO DO IGUACU"},{"uf":"RO","cidade":"ESPIGAO DOESTE"},{"uf":"PR","cidade":"CAMPO MOURAO"},{"uf":"RO","cidade":"PRESIDENTE MEDICI"},{"uf":"PR","cidade":"PONTA GROSSA"},{"uf":"GO","cidade":"GOIATUBA"},{"uf":"PR","cidade":"SANTA HELENA"},{"uf":"PR","cidade":"PATO BRAGADO"},{"uf":"AM","cidade":"MANACAPURU"},{"uf":"RO","cidade":"CEREJEIRAS"},{"uf":"PR","cidade":"CAMPO BONITO"},{"uf":"PR","cidade":"BRAGANTINA"},{"uf":"RS","cidade":"VACARIA"},{"uf":"RO","cidade":"JI PARANA"},{"uf":"SP","cidade":"CATANDUVA"},{"uf":"ES","cidade":"COLATINA"},{"uf":"PR","cidade":"TUPASSI"},{"uf":"SC","cidade":"ANITAPOLIS"},{"uf":"PR","cidade":"RAMILANDIA"},{"uf":"PR","cidade":"FRANSCISCO ALVES"},{"uf":"PR","cidade":"CORBELIA"},{"uf":"SC","cidade":"SANTA ROSA DE LIMA"},{"uf":"SC","cidade":"RIO FORTUNA"},{"uf":"RS","cidade":"AJURICABA"},{"uf":"SP","cidade":"ANALANDIA"},{"uf":"SC","cidade":"ITAPIRANGA"},{"uf":"AM","cidade":"PRESIDENTE FIGUEIREDO"},{"uf":"AM","cidade":"COARI"},{"uf":"PR","cidade":"SANTO ANTONIO DA PLATINA"},{"uf":"SP","cidade":"VOTUPORANGA"},{"uf":"PR","cidade":"ENTRE RIOS DO OESTE"},{"uf":"AM","cidade":"CARAUARI"},{"uf":"AM","cidade":"TEFE"},{"uf":"PR","cidade":"CORNELIO PROCOPIO"},{"uf":"PR","cidade":"AMPERE"},{"uf":"RS","cidade":"JOIA"},{"uf":"RS","cidade":"CHIAPETTA"},{"uf":"RS","cidade":"NOVA RAMADA"},{"uf":"PR","cidade":"MARIALVA"},{"uf":"PR","cidade":"ESTACAO ARAUCARIA"},{"uf":"PR","cidade":"CORONEL VIVIDA"},{"uf":"PA","cidade":"OBIDOS"},{"uf":"SC","cidade":"SAO MIGUEL DO OESTE"},{"uf":"SC","cidade":"CATANDUVAS"},{"uf":"PR","cidade":"FOZ DO IGUACU"},{"uf":"PB","cidade":"PATOS"},{"uf":"SC","cidade":"MAFRA"},{"uf":"RS","cidade":"CORONEL BICACO"},{"uf":"PR","cidade":"SAO JOAO"},{"uf":"PR","cidade":"SARANDI"},{"uf":"PR","cidade":"CHOPINZINHO"},{"uf":"PR","cidade":"MANGUEIRINHA"},{"uf":"PR","cidade":"JANDAIA DO SUL"},{"uf":"PR","cidade":"MANDAGUARI"},{"uf":"SP","cidade":"LINS"},{"uf":"SC","cidade":"XAVANTINA"},{"uf":"PR","cidade":"SAO JOSE DAS PALMEIRAS"},{"uf":"SC","cidade":"RIO NEGRINHO"},{"uf":"SP","cidade":"BIRIGUI"},{"uf":"PR","cidade":"FRANCISCO BELTRAO"},{"uf":"PR","cidade":"MARECHAL CANDIDO RONDON"},{"uf":"RS","cidade":"AUGUSTO PESTANA"},{"uf":"AM","cidade":"AUTAZES"},{"uf":"SP","cidade":"OURINHOS"},{"uf":"AM","cidade":"PARINTINS"},{"uf":"PR","cidade":"SERRANOPOLIS DO IGUACU"},{"uf":"MG","cidade":"BELO HORIZONTE"},{"uf":"RS","cidade":"IJUI"},{"uf":"RS","cidade":"PORTO ALEGRE"},{"uf":"PR","cidade":"SAO JOSE DOS PINHAIS"},{"uf":"SP","cidade":"PENAPOLIS"},{"uf":"MT","cidade":"RONDONOPOLIS"},{"uf":"PR","cidade":"JACAREZINHO"},{"uf":"SP","cidade":"DOIS CORREGOS"},{"uf":"RO","cidade":"NOVA MAMORE"},{"uf":"RO","cidade":"ESPIGAO D OESTE"},{"uf":"SP","cidade":"SAO JOSE DO RIO PRETO"},{"uf":"MT","cidade":"NOSSA SENHORA APARECIDA"},{"uf":"GO","cidade":"VALPARAISO DE GOIAS"},{"uf":"PR","cidade":"PARANAGUA"},{"uf":"SP","cidade":"SAO JOSE RIO PRETO"},{"uf":"PR","cidade":"ARAPONGAS"},{"uf":"SP","cidade":"MIRASSOL"},{"uf":"MS","cidade":"TRES LAGOAS"},{"uf":"PR","cidade":"PAICANDU"},{"uf":"SC","cidade":"JOACABA"},{"uf":"PR","cidade":"FAZENDA RIO GRANDE"},{"uf":"RO","cidade":"ITACOATIARA"},{"uf":"RS","cidade":"SANTO AUGUSTO"},{"uf":"AM","cidade":"ALVARAES"},{"uf":"RO","cidade":"BURITIS"},{"uf":"RO","cidade":"JARU"},{"uf":"RO","cidade":"CANDEIAS DO JAMARI"},{"uf":"MT","cidade":"SINOP"},{"uf":"MG","cidade":"CATAGUASES"},{"uf":"SP","cidade":"ASSIS"},{"uf":"MS","cidade":"DOURADOS"},{"uf":"PR","cidade":"MANDAGUACU"},{"uf":"PR","cidade":"FERNANDOPOLIS"},{"uf":"GO","cidade":"GOIANIA"}]`)

                this.redesCredenciadas = JSON.parse(redesCredenciadasBackup)
            }  
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
