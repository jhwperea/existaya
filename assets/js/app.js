new Vue({
    el:'#app',
    data:{
        menu: false,
        votar: 'listo',
        principal: [],
        secundarios: []
    },
    mounted(){
        this.getHeroes();
        this.getLocalStorage()
    },
    methods: {
        getPrincipal(){ axios('assets/js/principal.json').then(r=>{ this.principal = r.data }) },
        getHeroes(){ axios('assets/js/secundarios.json').then(r=>{ this.secundarios = r.data }) },
        getLocalStorage(){
            principal = localStorage.getItem("principal");
            !principal || principal == '[]' ?
                ( this.getPrincipal(), this.setLocalStorage() ):
                ( this.principal = JSON.parse(principal) )
        },
        setLocalStorage(){ localStorage.setItem("principal", JSON.stringify(this.principal)) },
        votarHeroe(superheroe, voto){
            sh = superheroe[0];
            voto == 'like' ? ( sh.likes++, sh.dislikes-- ):( sh.likes--, sh.dislikes++ )
            this.votar = voto;
            this.principal = superheroe;
            this.setLocalStorage()
        }
    }
})