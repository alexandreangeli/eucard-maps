<template>
    <div id="detalhamento">
        <div class="cardsWrapper">
            <div v-if="!redesCredenciadas.length" style="margin: 20px">Sem resultados</div>         
            <div 
                v-for="(rede, index) in redesCredenciadas" 
                :key="'detalhamento' + index"
                class="card"
            >
                <div class="card-body">
                    <div v-html="$utils.getInformacoesFormatadas(rede)"></div>
                    <div class="btn-wrapper">
                        <a href="#" class="btn btn-secondary" @click="$emit('focarRede', rede)">Ver no mapa</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'detalhamento',

    props: {
        redesCredenciadas: Array
    }
}
</script>

<style scoped>
#detalhamento {    
    overflow-y: auto;
    background-color: #dddddd;
    border: solid 1px;
    border-color: #dee2e6 #dee2e6 #fff;
    height: 100%;
}

.cardsWrapper {
    overflow-y: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}

.card {
    min-width: unset;
    display: unset;
    height: auto;
    width: 18rem; 
    margin: 10px 0 10px 0;
}

.card-body {
    height: 100%;
    display: flex; 
    flex-direction: column; 
    justify-content: space-between;
}

.btn-wrapper {
    margin-top: 10px;
    display: flex; 
    justify-content: flex-end;
}

.btn-secondary {
    background-color: #2981ca;
    border-color: #2981ca;   
    bottom: 0; 
    width: 100%;
}
</style>
