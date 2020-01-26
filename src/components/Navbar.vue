<template>
    <nav id="navbar" class="navbar">
        
        <div id="pesquisarRedeWrapper" :class="`${larguraTela > 650 ? 'desktop' : ''}`">       
            <input 
                v-model="pesquisarRede"
                id="pesquisarRede"
                :class="`${larguraTela > 650 ? 'desktop' : ''}`" 
                placeholder="Pesquisar empresa" 
                class="form-control" 
            />
        </div>

        <ul class="nav nav-tabs">
            <li class="nav-item">
                <div 
                    :class="`nav-link ${detalhamentoAberto == false ? 'active' : ''}`" 
                    @click="$emit('fecharDetalhamento')"
                >
                    Mapa
                </div>
            </li>
            <li class="nav-item">
                <div 
                    :class="`nav-link ${detalhamentoAberto == true ? 'active' : ''}`"  
                    @click="$emit('abrirDetalhamento')"
                >
                    Empresas
                </div>
            </li>                           
        </ul>

        <span class="navbar-text">
            {{redesFiltradas.length}} {{redesFiltradas.length > 1 ? "resultados" : "resultado"}}
        </span>
    </nav>
</template>

<script>

export default {
    name: 'navbar',

    data() {
        return {
            pesquisarRede: "",
            larguraTela: 0
        }
    },

    props: {
        detalhamentoAberto: Boolean,
        redesFiltradas: Array
    },

    watch: {
        pesquisarRede(newVal) {
            this.$emit('pesquisarRede', newVal)
        }
    },

    methods: {
        onResize() {
            this.larguraTela = window.innerWidth;
        }
    },

    mounted() {
        this.$nextTick(() => {
            window.addEventListener('resize', this.onResize);
            this.onResize();
        })
    }
}
</script>

<style>
#navbar {
    padding: 0px;
}

#pesquisarRedeWrapper {
    width: 100%;
}
#pesquisarRedeWrapper.desktop {
    position: absolute;
    bottom: 3px;
}

#pesquisarRede {
    margin-bottom: 5px;
}
#pesquisarRede.desktop {
    width: 250px; 
    margin: 0 auto;
}

.nav-tabs {
    z-index: 1
}

.nav-link.active {
    border-bottom: unset !important;
    background-color: #ddd !important;
}
</style>
