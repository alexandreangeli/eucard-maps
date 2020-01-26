<template>
    <div id="filtros" class="row">
        <div class="form-group col-4">
            <label>Cartão</label>            
            <select class="form-control" v-model="cartaoSelecionado">
                <option v-if="!cartaoSelecionado.id" :value="{}">Selecione um tipo de cartão</option>
                <option 
                    v-for="cartao in cartoes" 
                    :key="cartao.nome + cartao.id"
                    :value="cartao"
                >
                    {{cartao.nome}}
                </option>
            </select>       
        </div> 
        <div class="form-group col-4">
            <label>Estado</label>            
            <select class="form-control" v-model="estadoSelecionado" :disabled="!estados.length">
                <option v-if="!estadoSelecionado" value="">Selecione um estado</option>
                <option 
                    v-for="estado in estados" 
                    :key="estado" 
                    :value="estado"
                >
                    {{estado}}
                </option>
            </select>  
        </div>
        <div class="form-group col-4">
            <label>Cidade</label>            
            <select class="form-control" v-model="cidadeSelecionada" :disabled="!cidades.length">
                <option v-if="!cidadeSelecionada.cidade" :value="{}">Selecione uma cidade</option>
                <option 
                    v-for="cidade in cidades" 
                    :key="cidade.cidade" 
                    :value="cidade"
                >
                    {{cidade.cidade}}
                </option>
            </select>  
        </div>               
    </div>   
</template>

<script>
export default {
    name: 'filtros',

    data() {
        return {
            estadoSelecionado: "",
            cidadeSelecionada: {},
            cartaoSelecionado: {}
        }
    },

    props: {
        estados: Array,
        cidades: Array,
        cartoes: Array
    },

    watch: {
        estadoSelecionado(newVal) {
            this.cidadeSelecionada = {};
            this.$emit('selecionouEstado', newVal);
        },
        cidadeSelecionada(newVal) {
            this.$emit('selecionouCidade', newVal);
        },
        cartaoSelecionado(newVal) {
            this.$emit('selecionouCartao', newVal);
        }
    }
}
</script>

<style>
#filtros {
    align-items: baseline;
    margin-left: 0px;
    width: 100%;
}
</style>
