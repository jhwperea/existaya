new Vue({
	el:'#app',
	data:{
		menu: false,
		votar: 'listo',
		p_likes: '',
		p_dislikes: '',
		principal: [],
		secundarios: []
	},
	mounted(){
		this.getHeroes();
		this.getLocalStorage()
	},
	methods: {
		getHeroes(){ axios('assets/js/secundarios.json').then(r=>{ this.secundarios = r.data }) },
		getLocalStorage(){
			principal = localStorage.getItem("principal");
			principal == null || principal == [] ? (
				axios('assets/js/principal.json').then(r=>{ this.principal = r.data, this.calculaPorcentaje() })
			):( this.principal = JSON.parse(principal), this.calculaPorcentaje() )
		},
		setLocalStorage(){ localStorage.setItem("principal", JSON.stringify(this.principal)) },
		votarH(voto){
			voto == 'like' ? ( this.principal[0].likes++ ):( this.principal[0].dislikes++ )
			this.votar = voto;
			this.calculaPorcentaje()
		},
		calculaPorcentaje(){
			likes = this.principal[0].likes;
			dislikes = this.principal[0].dislikes;
			total = (parseInt(likes) + parseInt(dislikes));
			this.p_likes = (parseInt(likes) / total * 100).toFixed(1);
			this.p_dislikes = (parseInt(dislikes) / total * 100).toFixed(1);
			this.setLocalStorage()
		}
	}
})